<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST"); 
header("Access-Control-Allow-Headers: Content-Type:application/json"); 


// Conexion a la base de datos base de datos 
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "techvibes_db";

$conn = new mysqli($servername, $username, $password, $dbname);

// Aca verifico la conexion
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}




// Recibo datos del formulario de registro
$nombre = isset($_POST['nombre']) ? $_POST['nombre'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';

// Consulta para saber cuántos registros tienen el mismo correo electrónico
$checkEmail = "SELECT COUNT(*) as count FROM user_tech WHERE email = '$email'";

// Ejecutar la consulta en la base de datos
$result = $conn->query($checkEmail);

// Verificar si la consulta se ejecutó correctamente y si hay al menos una fila en los resultados
if ($result && $result->num_rows > 0) {
    // Obtener la primera fila de resultados como un array asociativo
    $row = $result->fetch_assoc();

    // Acceder al dato por clave Verificar si el valor de la columna 'count' es mayor que 0
    if ($row['count'] > 0) {
        // Si el correo electrónico ya está registrado, mostrar un mensaje de error
        echo json_encode(["messageError" => "El correo ingresado esta en uso"]);
        exit;
    }
    
}



// Preparar la consulta SQL
$sql = "INSERT INTO user_tech (nombre, email, password) VALUES ('$nombre', '$email', '$password')";

 if ($conn->query($sql) === TRUE) {
     echo json_encode(["message" => "Registro exitoso!"]);
 } else {
     
         echo json_encode(["message" => "Error al procesar el registro: " . $conn->error]);
        }



// Cerrar la conexión
$conn->close();
?>
