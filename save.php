<?php
$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    $file = 'productos.json';
    $productos = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

    $productos[] = $data;

    file_put_contents($file, json_encode($productos, JSON_PRETTY_PRINT));
    
    echo json_encode(["message" => "Producto guardado correctamente"]);
} else {
    echo json_encode(["message" => "Error al procesar los datos"]);
}
?>