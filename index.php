<?php
header('Content-Type: text/html; charset=utf-8');
require __DIR__ . '/vendor/autoload.php';
mb_internal_encoding("UTF-8");
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class ChatServer implements MessageComponentInterface {
    protected $clients;
    protected $db;
    protected $clientChats = []; 

    public function __construct() {
        $this->clients = new \SplObjectStorage;
        $this->db = new mysqli("localhost", "root", "", "projekt");
        $this->db->set_charset("utf8");
}


public function onOpen(ConnectionInterface $conn){
    $this->clients->attach($conn);
    $username = 'Guest';
    $query = $conn->httpRequest->getUri()->getQuery();
    parse_str($query, $params);
    $sessionId = $params['PHPSESSID'] ?? null;

    if ($sessionId) {

        $sessionFile = session_save_path() . "/sess_$sessionId";

        if (file_exists($sessionFile)) {
            $data = file_get_contents($sessionFile);
            if (preg_match('/user_name\|s:\d+:"([^"]+)"/', $data, $matches)) {
                $username = $matches[1];
            }
        }
    }
    $conn->username = $username; 

    
    $load = $this->db->query("SELECT chat_id, username, message, created_at FROM chat_messages ORDER BY created_at ASC");
    $history = [];
    while ($row = $load->fetch_assoc()) {
        $history[] = $row;
    }

    $loadChats = $this->db->query("SELECT id, name, creator_username, preview_image, created_at FROM chats ORDER BY created_at DESC");
    $chats = [];
    while ($row = $loadChats->fetch_assoc()) {
        $chats[] = [
            "type" => "new_chat",
            "id" => $row['id'],
            "name" => $row['name'],
            "creator_username" => $row['creator_username'],
            "preview_image" => $row['preview_image'],
            "created_at" => $row['created_at']
        ];
    }

    $conn->send(json_encode([
        "type" => "init",
        "messages" => $history,
        "chats" => $chats
    ]));

    } 

    public function onMessage(ConnectionInterface $from, $msg) {
        $id = $from->resourceId;

        $data = json_decode($msg, true);
        if (!is_array($data)) {
            $from->send(json_encode(["type" => "error"]));
            return;
        }



        switch ($data['type']) {
            case 'create_chat':
   

                $stmt = $this->db->prepare("INSERT INTO chats (name, creator_username, preview_image) VALUES (?, ?, ?)");
                $preview = $data['preview_image'] ?? null;
                $stmt->bind_param("sss", $data['name'], $data['username'], $preview);
                $stmt->execute();
                $chatId = $this->db->insert_id;

                $newChat = [
                    "type" => "new_chat",
                    "id" => $chatId,
                    "name" => $data['name'],
                    "creator_username" => $data['username'],
                    "preview_image" => $preview,
                    "created_at" => date("Y-m-d H:i:s")
                ];

                foreach ($this->clients as $client) {
                    $client->send(json_encode($newChat));
                }
                break;

            case 'join_chat':
                $chatId = isset($data['chatId']) ? $data['chatId'] : null;
                $username = $data['username'] ?? null;

                $this->clientChats[$id] = $chatId;

                $stmt = $this->db->prepare("SELECT name FROM chats WHERE id = ?");
                $stmt->bind_param("i", $chatId);
                $stmt->execute();
                $chatResult = $stmt->get_result();
                $chatInfo = $chatResult->fetch_assoc();
                $chatName = $chatInfo ? $chatInfo['name'] : 'Unknown Chat';

                $stmt = $this->db->prepare("SELECT username, message, created_at FROM chat_messages WHERE chat_id = ? ORDER BY created_at ASC");
                $stmt->bind_param("i", $chatId);
                $stmt->execute();
                $result = $stmt->get_result();
                $messages = [];
                while ($row = $result->fetch_assoc()) {
                    $messages[] = [
                        'username' => $row['username'],
                        'message' => $row['message'],
                        'created_at' => $row['created_at']
                    ];
                }

                $from->send(json_encode(["type" => "chat_history", "chatId" => $chatId, "chatName" => $chatName, "messages" => $messages]));
                break;

                


            case 'chat_message':
                $chatId = isset($data['chatId']) ? $data['chatId'] : null;
                $username = $from->username ?? 'Guest';
                $messageText = isset($data['message']) ? $data['message'] : null;


                $stmt = $this->db->prepare("INSERT INTO chat_messages (chat_id, username, message) VALUES (?, ?, ?)");
                $stmt->bind_param("iss", $chatId, $username, $messageText);
                $stmt->execute();

                $newMessage = [
                    "type" => "chat_message",
                    "chatId" => $chatId,
                    "username" => $username,
                    "message" => $messageText,
                    "created_at" => date("Y-m-d H:i:s")
                ];


            foreach ($this->clients as $client) {
                    $clientId = $client->resourceId;
                    if (isset($this->clientChats[$clientId]) && 
                        $this->clientChats[$clientId] == $chatId) {
                        $client->send(json_encode($newMessage));
                    }
                }
                break;
        }
    }

    public function onClose(ConnectionInterface $conn) {

        $this->clients->detach($conn);



    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";
        $conn->close();
    }
  }
  
$server = \Ratchet\Server\IoServer::factory(
    new \Ratchet\Http\HttpServer(
        new \Ratchet\WebSocket\WsServer(
            new ChatServer()
        )
    ),
    8080 
);
$server->run();
?>