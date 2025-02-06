<?php
include 'db_connection.php';
if ($_SERVER["REQUEST_METHOD"]=="POST") {

if (isset($_POST['phone']) &&
isset($_POST['password'])){
    $phone = $_POST['phone'];
    $password = $_POST['password'];

    $query = "SELECT * FROM registration WHERE `mob.no`= '$phone' AND password = '$password'";
    $result = mysqli_query($conn,$query);
    
    if (mysqli_num_rows($result)>0) {
        echo "<p>login successfull</p>"; 
    }
    else {
        echo "<p>incorrect passwoed or phone number</p>";
    }
}
else {
    echo "<p>please enter details</p>";
}
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="login.css">
    <title>Document</title>
</head>
<body>
    <div class="container">
        <h1>login here</h1>
        <form action="login.php" method="post">
            <input type="text" name="phone" id="phone" placeholder="enter your mobile number" required>
            <input type="password" name="password" id="password" placeholder="enter your password" required>
            <button type="submit">login</button>
            <a href="registration.php">Dont have an account?</a>
        </form>
    </div>
</body>
</html>