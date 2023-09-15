<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST"); // Puedes especificar otros métodos si son necesarios
header("Access-Control-Allow-Headers: Content-Type"); // Puedes permitir otros encabezados según tus necesidades


// Conectar a la base de datos (reemplaza con tus propios datos de conexión)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "techvibes_db";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Recibir datos del formulario de registro
$nombre = $_POST['nombre'];
$email = $_POST['email'];
$password = $_POST['password'];

// Preparar la consulta SQL (asegúrate de tener una tabla llamada "usuarios" con columnas correspondientes)
$sql = "INSERT INTO user_tech (nombre, email, password) VALUES ('$nombre', '$email', '$password')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "Registro exitoso"]);
} else {
    if ($conn->errno == 1062) { // El código de error 1062 se refiere a una clave duplicada
        echo json_encode(["message" => "El usuario ya está registrado"]);
    } else {
        echo json_encode(["message" => "Error al procesar el registro: " . $conn->error]);
    }
}



// Cerrar la conexión
$conn->close();
?>
