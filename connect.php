<?php
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phonenumber = $_POST['phonenumber'];

    // Database connection here

    $host = 'localhost';
    $dbname = 'postgraduate';
    $username = 'root';
    $password = '';

    $conn = mysqli_connect($host, $username, $password, $dbname);

    if (mysqli_connect_error()) {
        die("Connection error: " . mysqli_connect_error());
    }

    // Use a prepared statement to prevent SQL injection
    $sql = "INSERT INTO contact (name, email, phonenumber)
            VALUES (?, ?, ?)";
     
    $stmt = mysqli_stmt_init($conn);

    if (mysqli_stmt_prepare($stmt, $sql)) {
        // Bind parameters
        mysqli_stmt_bind_param($stmt, "sss", $name, $email, $phonenumber);

        // Execute the statement
        if (mysqli_stmt_execute($stmt)) {
            echo "We will contact you soon!";
        } else {
            echo "Error executing statement: " . mysqli_stmt_error($stmt);
        }
    } else {
        echo "Error preparing statement: " . mysqli_error($conn);
    }

    // Close the statement and connection
    mysqli_stmt_close($stmt);
    mysqli_close($conn);
?>
