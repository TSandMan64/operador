let contadorT = 0;

let productos = [];

        // Cargar datos desde el JSON externo
        fetch("productos.json")
            .then(response => response.json())
            .then(data => productos = data)
            .catch(error => console.error("Error al cargar los productos:", error));

function idTar()
{
 contadorT ++;
 document.getElementById("HU").innerHTML = contadorT;
}

function insertar()
{
    let tabla = document.getElementById("detalle").getElementsByTagName("tbody")[0];
    let inputValor = document.getElementById("barcode").value;
    let sku = inputValor.substring(18, 23);
    let kg = inputValor.substring(0,7);
    let lote = inputValor.substring(8,18 );
    let nombre = productos.find(p => p.id == sku);

    if (inputValor.trim() == "")
    {
        alert ("Por favor ingrese una etiqueta");
        return;
    }

    let nuevaFila = tabla.insertRow();

    let celda1 = nuevaFila.insertCell (0);
    let celda2 = nuevaFila.insertCell (1);  
    let celda3 = nuevaFila.insertCell (2);
    let celda4 = nuevaFila.insertCell (3);
    let celda5 = nuevaFila.insertCell (4);
    let celda6 = nuevaFila.insertCell (5);
    let celda7 = nuevaFila.insertCell (6);
    let celda8 = nuevaFila.insertCell (7);
    let celda9 = nuevaFila.insertCell (8);
    let celda10 = nuevaFila.insertCell (9);

    celda10.innerHTML = inputValor;
    celda9.innerHTML = "00/00/0000";
    celda8.innerHTML = "00/00/0000";
    celda7.innerHTML = "00/00/0000";
    celda6.innerHTML = "1";
    celda5.innerHTML = kg;
    celda4.innerHTML = nombre ? nombre.nombre:"id no encontrado";
    celda3.innerHTML = sku;
    celda2.innerHTML = lote;
    celda1.innerHTML = contadorT;

    document.getElementById("barcode").value = "";

    document.getElementById("barcode").focus();
}
function comprobarDato()
{
    let idDato = document.getElementById("barcode").value;
    let tabla = document.getElementById("detalle");
    let existe = false;

    for (let i = 0; i< tabla.rows.length; i++)
    {
        if (tabla.rows[i].cells[9].innerText === idDato) {
            existe = true;
            break;
        }
    }
    if (existe) 
    {
        document.getElementById("barcode").value = "";
        alert("El codigo de barras ya fué leido");
    }
    else 
    {
        insertar();
    }
}
function generarPDF() {
        let titulo = document.getElementById("Title").innerText;
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.autoTable({ html: '#detalle' });
        doc.save(titulo + "tabla.pdf");
}
function exportarExcel()
{
    let titulo = document.getElementById("Title").innerText;
    let tabla = document.getElementById("detalle");
    let hoja = XLSX.utils.table_to_sheet(tabla);
    let libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Tabla");

    XLSX.writeFile(libro, titulo + ".xlsx");
}
document.getElementById("barcode").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        comprobarDato(); // Llama a la función solo si se presiona Enter
    }
});
