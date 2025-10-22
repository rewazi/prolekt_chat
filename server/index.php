<?php

  $servername = "localhost";
  $username = "root";
  $password = "";
  $databasename = "projekt";

  // CREATE CONNECTION
  $conn = new mysqli($servername,
    $username, $password, $databasename);

  // GET CONNECTION ERRORS
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }

  // SQL QUERY
  $query = "SELECT * FROM `chat_test`;";

  // FETCHING DATA FROM DATABASE
  $result = $conn->query($query);

   if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "ID: " . $row["id"] . " | " .
             "Username: " . $row["username"] . " | " .
             "Message: " . $row["message"] . " | " .
             "Created At: " . $row["created_at"] . "<br>";
    }
} else {
    echo "0 results";
}


   $conn->close();

?>