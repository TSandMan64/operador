<?php
header('Content-Type: application/json');

// Obtener el ID enviado desde el cliente
$idEliminar = $_POST['id'];

// Leer el archivo JSON
$productos = json_decode(file_get_contents('productos.json'), true);

// Filtrar los productos y eliminar el que coincida con el ID
$productos = array_filter($productos, function($producto) use ($idEliminar) {
    return $producto['id'] != $idEliminar;
});

// Guardar el archivo actualizado
file_put_contents('productos.json', json_encode(array_values($productos), JSON_PRETTY_PRINT));

// Devolver respuesta al cliente
echo json_encode(["mensaje" => "Producto eliminado correctamente"]);
?>