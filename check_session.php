<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');
session_start();
if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
    $timeout = 1800; 
    
    if (isset($_SESSION['login_time'])) {
        $elapsed = time() - $_SESSION['login_time'];
        
        if ($elapsed > $timeout) {
            $_SESSION = [];
            session_destroy();
            exit;
        }
    }
    
    $_SESSION['login_time'] = time();
    

  
    
} 
?>