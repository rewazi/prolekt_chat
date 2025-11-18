<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');




session_start();


$host = 'localhost';
$dbname = 'projekt';
$username = 'root';
$password = '';

$mysqli = new mysqli($host, $username, $password, $dbname);
$mysqli->set_charset("utf8");



if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $data = json_decode(file_get_contents('php://input'), true);
    
    $name = $data['name'] ?? '';
    $password = $data['password'] ?? '';
    

    

    $stmt = $mysqli->prepare("SELECT id, name, email, password FROM users WHERE name = ?");
    $stmt->bind_param("s", $name);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    
    
    if (password_verify($password, $user['password'])) {
        session_regenerate_id(true);
        
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['name'];
        $_SESSION['user_email'] = $user['email'];
        $_SESSION['logged_in'] = true;
        $_SESSION['login_time'] = time();
        
      
        echo json_encode([
            'success' => true,
            'message' => 'Вход выполнен успешно!',
            'session_id' => session_id(), 
            'user' => [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email']
            ]
        ]);
        
    }  else {
        echo json_encode(['success' => false, 'message' => 'Неверные данные']);
        exit;
    }
    
} 
?>