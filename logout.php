<?php

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}
session_start();


if (isset($_SESSION['logged_in'])) {
    $user_name = $_SESSION['user_name'] ?? 'Пользователь';
    
    $_SESSION = array();
    
    if (isset($_COOKIE[session_name()])) {
        setcookie(session_name(), '', time() - 3600, '/');
    }
    
    session_destroy();
    
    echo json_encode([
        'success' => true,
        'message' => "До свидания, {$user_name}!"
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Вы не были авторизованы.'
    ]);
}
?>