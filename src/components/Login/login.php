<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type: application/json");

// Conexion a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "techvibes_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if (!empty($_POST['email']) && !empty($_POST['password'])) {
    $userEmail = $_POST['email'];
    $userPass = $_POST['password'];

    // Escapa las variables para evitar inyecciones SQL
    $userEmail = mysqli_real_escape_string($conn, $userEmail);
    $userPass = mysqli_real_escape_string($conn, $userPass);

    // Verificar si las credenciales coinciden con las de un administrador
    $query = "SELECT COUNT(*) as count FROM admin_tech WHERE EMAIL = '$userEmail' AND PASSWORD = '$userPass'";
    $result = $conn->query($query);

    if ($result) {
        $row = $result->fetch_assoc();
        $count = $row['count'];
        if ($count > 0) {
            $_SESSION['user_type'] = 'admin';
            echo json_encode(["messageAdmin" => "Inicio de sesión exitoso como admin"]);
        } else {
            // Las credenciales no coinciden con las de un administrador, verifica si es un usuario normal
            $queryUser = "SELECT COUNT(*) as count FROM user_tech WHERE EMAIL = '$userEmail' AND PASSWORD = '$userPass'";
            $resultUser = $conn->query($queryUser);

            if ($resultUser) {
                $rowUser = $resultUser->fetch_assoc();
                $countUser = $rowUser['count'];
                if ($countUser > 0) {
                    $_SESSION['user_type'] = 'user';
                    echo json_encode(["message" => "Inicio de sesión exitoso como usuario"]);
                } else {
                    echo json_encode(["messageError" => "El usuario o la contraseña no son válidos"]);
                }
            } else {
                echo json_encode(["message" => "Error en la consulta SQL para usuario"]);
            }
        }
    } else {
        echo json_encode(["message" => "Error en la consulta SQL para administrador"]);
    }
} else {
    echo json_encode(["message" => "Falta el correo electrónico o la contraseña"]);
}

$conn->close();
?>