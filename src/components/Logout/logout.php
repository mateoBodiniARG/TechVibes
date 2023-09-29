<?php
session_start();

// Cerrar la sesión
session_destroy();

// Puedes eliminar cualquier otra información de sesión si es necesario

// Devolver una respuesta JSON
echo json_encode(["message" => "Sesión cerrada correctamente"]);
?>
