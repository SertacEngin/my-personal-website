# Setting Up MySQL and PHP on an Ubuntu Hetzner Server

This guide outlines the process of setting up a MySQL database and PHP on an Ubuntu server hosted on Hetzner, enabling you to practice SQL and build dynamic web applications.

## What is MySQL?

MySQL is an open-source relational database management system (RDBMS) that uses Structured Query Language (SQL) to manage and manipulate data. It is widely used for web applications due to its reliability, ease of use, and performance. MySQL stores data in tables with defined relationships, making it ideal for applications like blogs, e-commerce platforms, and content management systems.

## What is PHP?

PHP (Hypertext Preprocessor) is a server-side scripting language designed for web development. It is embedded within HTML and commonly used to interact with databases like MySQL to create dynamic, data-driven websites. PHP is beginner-friendly, widely supported, and integrates seamlessly with web servers like Apache or Nginx.

## Why Are Databases Important for DevOps Engineers?

Databases are critical for DevOps engineers for several reasons:

- **Data Management**: DevOps engineers often manage applications that rely on databases to store user data, configuration settings, or application state. Understanding database setup and maintenance ensures efficient data handling.
- **Automation**: DevOps involves automating infrastructure and deployments. Databases must be provisioned, configured, and backed up using tools like Ansible, Terraform, or CI/CD pipelines, requiring familiarity with database systems.
- **Performance Optimization**: Engineers monitor and optimize database performance (e.g., indexing, query tuning) to ensure applications scale and remain responsive.
- **Collaboration**: DevOps teams work with developers and data engineers, necessitating knowledge of database technologies like MySQL to bridge development and operations.
- **Security**: Managing database access, securing credentials, and implementing backups are key DevOps responsibilities to protect sensitive data and ensure system reliability.

## Prerequisites

- A Hetzner server running Ubuntu (e.g., Ubuntu 20.04 or later).
- SSH access to the server with a user having `sudo` privileges.
- Basic familiarity with Linux commands and web development concepts.

## Step-by-Step Setup Instructions

### 1. Update the Server

Ensure your server is up-to-date to avoid compatibility issues.

```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Install MySQL

Install the MySQL server package to manage your database.

```bash
sudo apt install mysql-server -y
```

Start MySQL and enable it to run on boot:

```bash
sudo systemctl start mysql
sudo systemctl enable mysql
```

Run the security script to set a root password and secure the installation:

```bash
sudo mysql_secure_installation
```

- Set a strong root password.
- Answer `Y` (yes) to remove anonymous users, disallow remote root login, remove the test database, and reload privilege tables.

### 3. Log into MySQL and Create a Database and User

Access MySQL as the root user to set up a database and a dedicated user for your website.

```bash
sudo mysql -u root -p
```

Enter the root password when prompted. At the `mysql>` prompt, execute:

```sql
CREATE DATABASE my_website_db;
CREATE USER 'website_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON my_website_db.* TO 'website_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

- `my_website_db`: The database name (customize as needed).
- `website_user`: The username for your website’s database access.
- `secure_password`: A strong password (e.g., `X7$k9mPqW#2`).

### 4. Install Apache and PHP

Install Apache as the web server and PHP with MySQL support to enable dynamic web content.

```bash
sudo apt install apache2 php php-mysql libapache2-mod-php -y
```

Restart Apache to apply changes:

```bash
sudo systemctl restart apache2
```

### 5. Test the Database Connection

Create a PHP script to verify that PHP can connect to MySQL. Create a file named `test_db.php` in the web root:

```bash
sudo nano /var/www/html/test_db.php
```

Add the following code:

```php
<?php
$host = 'localhost';
$dbname = 'my_website_db';
$username = 'website_user';
$password = 'secure_password';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected to database successfully!";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
```

Save and exit (`Ctrl+O`, `Enter`, `Ctrl+X` in nano). Access the script in your browser at `http://your_server_ip/test_db.php`. If you see “Connected to database successfully!”, the setup is working.

### 6. Practice with SQL

Log into MySQL as the new user to create tables and practice SQL:

```bash
mysql -u website_user -p
```

Enter the user’s password. At the `mysql>` prompt, create a sample table:

```sql
USE my_website_db;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL
);
INSERT INTO users (username, email) VALUES ('test_user', 'test@example.com');
SELECT * FROM users;
EXIT;
```

### 7. Secure the Setup

Enhance security to protect your server and database:

- **Firewall**: Allow only necessary ports (HTTP, HTTPS, SSH):

```bash
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 22
sudo ufw enable
```

- **SSL/TLS**: Secure your website with a free Let’s Encrypt certificate:

```bash
sudo apt install certbot python3-certbot-apache -y
sudo certbot --apache
```

Follow prompts to configure HTTPS.

- **Database Backups**: Back up your database regularly:

```bash
mysqldump -u website_user -p my_website_db > backup.sql
```

### 8. Optional: Install phpMyAdmin

For a web-based database management interface, install phpMyAdmin:

```bash
sudo apt install phpmyadmin -y
```

- During installation, select Apache and configure the database for phpMyAdmin.
- Access it at `http://your_server_ip/phpmyadmin` and log in with `website_user` and the password.

## Example Web Application

To practice further, create a simple PHP page to display users from the database. Create `/var/www/html/users.php`:

```bash
sudo nano /var/www/html/users.php
```

Add:

```php
<?php
$pdo = new PDO("mysql:host=localhost;dbname=my_website_db", "website_user", "secure_password");
$stmt = $pdo->query("SELECT * FROM users");
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($users as $user) {
    echo "ID: {$user['id']}, Username: {$user['username']}, Email: {$user['email']}<br>";
}
?>
```

Access it at `http://your_server_ip/users.php` to see the users listed.

## Troubleshooting

- **MySQL login fails**: Verify the root or user password. Reset the user if needed:

```sql
DROP USER 'website_user'@'localhost';
CREATE USER 'website_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON my_website_db.* TO 'website_user'@'localhost';
FLUSH PRIVILEGES;
```

- **PHP connection error**: Check the database name, username, and password in your PHP script. Ensure MySQL is running:

```bash
sudo systemctl status mysql
```

- **Apache issues**: Restart Apache if pages don’t load:

```bash
sudo systemctl restart apache2
```

## Next Steps

- Learn SQL with resources like [W3Schools](https://www.w3schools.com/sql/) or [SQLZoo](https://sqlzoo.net/).
- Explore PHP frameworks like Laravel for advanced web development.
- Automate server setup using tools like Ansible or Docker for DevOps practice.
- Use Hetzner’s snapshot feature for server backups.
