<?php

    $servername ="localhost";
    $username ='root';
    $password = "";
    $database = "registration";

    $conn = mysqli_connect($servername,$username,$password,$database);

    if (!$conn){
        die("connection failed : " . mysqli_connect_error());
    }
    if (!mysqli_select_db($conn,$database)) {
        die("database fail".mysqli_error($conn));
    }    
?> 