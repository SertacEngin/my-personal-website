Check system uptime and load: "uptime"
See memory usage: "free -h"
Check disk usage: "df -h"
Check running processes and CPU usage: "top"
See a real-time list of processes and resource usage: "htop"
Check network interfaces and IP: "ip a"
Check server hostname and info: "hostname" and "uname -a"
A quick summary of system info: "neofetch"
Update the server: "sudo apt update" and "sudo apt upgrade -y"
Install a web server: "sudo apt install nginx -y" (Nginx is a popular, lightweight, and easy to use)
Start and enable Nginx to run on boot: "sudo systemctl start nginx" and "sudo systemctl enable nginx"
We can check if it works by visiting our server’s IP address in a browser. We should see the default Nginx welcome page.
