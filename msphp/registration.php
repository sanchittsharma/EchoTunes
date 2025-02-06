<?php
$insert = false;
if (isset($_POST['name'])) {

    $server="localhost";
    $username="root";
    $password="";
 
    $con = mysqli_connect($server,$username,$password);

    if (!$con) {
        die("connection to this database is failed due to ".mysqli_connect_error());
    }
    // echo "success connecting to database";
    
    $name=$_POST['name'];
    $dob=$_POST['dob'];
    $phone=$_POST['phone'];
    $email=$_POST['email'];
    $password=$_POST['password'];
    $sql= "INSERT INTO `registration`.`registration` ( `name`, `dob`, `mob.no`, `email`, `password`, `date`) VALUES ( '$name', '$dob', '$phone', '$email', '$password', current_timestamp());";
    // echo $sql;

    if ($con->query($sql)==true) {              
        // echo "successfully inserted";
        $insert=true;
    }
    else {
        echo "error : $sql <br> $con->error ";
    }
    $con->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="registration.css">
    <title>login here</title>
</head>
<body>
    <div class="container">
        <h1>signup here</h1>
        <form action="registration.php" method="post">
        <input type="text" name="name" id="name" placeholder ="enter your name">
        <input type="date" name="dob" id="dob" placeholder="enter your DOB">
        <input type="text" name="phone" id="phone" placeholder="enter your mobile number">
        <input type="email" name="email" id="email" placeholder="enter your email">
        <input type="password" name="password" id="password" placeholder="enter your password">
        <button type="submit">signup</button>
        <a href="login.php">Already have an account?</a>
        <?php
        if ($insert==true) {
            echo "<p>account created successfully</p>";
        }

        ?>   
        </form>
</div>
    <script src="registration.js"></script>
   
</body>
</html>