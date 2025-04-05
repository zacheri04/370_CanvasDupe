<?php
// Need to fill out after we figure out how to connect to the DB
$hostname = "";
$username = "";
$password = "";
$database = "";

$con = mysqli_connect($hostname, $username, $password, $database);

if (mysqli_connect_errno()) {
	printf("", mysqli_connect_error());
	exit(1);
}
?>

<html>
    <head>
        <title>CS370 Canvas Dupe</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <p>test</p>
    </body>
</html>