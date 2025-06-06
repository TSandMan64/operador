$(document).ready(function() {
    $.getJSON('productos.json', function(data) {
        let tabla = $('#productosTabla').DataTable();
        data.forEach(producto => {
            tabla.row.add([
                producto.id,
                producto.nombre,
                producto.especie,
                producto.presentacion,
                producto.unidad,
                producto.vida,
            `<button class="eliminar-btn" data-id="${producto.id}">Eliminar</button>` // Botón de eliminar
            ]).draw();
        });

        // Evento de eliminación
        $('#productosTabla tbody').on('click', '.eliminar-btn', function() {
            let id = $(this).data('id');
            $.post('delete.php', { id: id }, function(response) {
                alert(response);
                location.reload(); // Recargar la página para actualizar la tabla
            });
        });
    });
});
