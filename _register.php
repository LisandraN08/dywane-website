<?php
require '_koneksi.php';
$username = $_POST["username"];
$email = $_POST["email"];
$password = $_POST["password"];

$query_sql = "INSERT INTO user (username, email, password) 
            VALUES ('$username', '$email', '$password')";

if (mysqli_query($koneksi, $query_sql)) {
    header("Location: index.html");
} else {
    echo "Pendaftaran Gagal : " . mysqli_error($koneksi);
}
