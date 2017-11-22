<?
Session_start();
?>
<html>

<head>
</head>

<body>
  <?php
    ini_set('display_errors', 1);
    $servername = "localhost";
    $username = "wp2017_groupj";
    $password = "groupj";
    $dbname = "wp2017_groupj";
    echo("Hello");
    $conn = new mysqli($servername, $username, $password, $dbname);

    if($conn -> connect_error){
      die("Connection failed: " . $conn -> connect_error);
    }
                                                
    $sql = "SELECT * FROM user_info";
    $result = $conn->query($sql);
    $check = 0;
    $username = $_GET["Username"];
    $pass = $_GET["Password"];
    if($result->num_rows > 0){
      while($row = $result->fetch_assoc()) {
        if($pass == $row["pass"] && $username == $row["username"]) {
          $_SESSION["username"] = $username;
          $page = "login_success/index.html";
          #page_two($page);
          echo "this user exists";
          exit;
        }
        else{
          $page = "login_failed/index.html";
          #page_two($page);
          echo "not here";
        }
      }
    }
    echo "Username or Password incorrect!<br>";
    function page_two($page){
      header("Location: " . $page);
    }
  ?>
</body>
