<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');
mb_internal_encoding("UTF-8");

$host = 'localhost';
$dbname = 'projekt';
$username = 'root';
$password = '';

$mysqli = new mysqli($host, $username, $password, $dbname);
$mysqli->set_charset("utf8");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $email = trim($data['email'] ?? '');
    $password = trim($data['password'] ?? '');
    $name = trim($data['name'] ?? '');

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);


    $stmt = $mysqli->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $hashedPassword);
    
    if ($stmt->execute()) {
        echo json_encode([
            'user_id' => $stmt->insert_id
        ]);
    } else {
        echo json_encode([
            'error' => $stmt->error
        ]);
    }
    
    $stmt->close();;
} 

$mysqli->close();
?>
