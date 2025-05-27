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
<br>

Now we can host our Next.js website on our Hetzner Ubuntu server:
"sudo apt update && sudo apt upgrade -y
sudo apt install curl git -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - (if it doesn't work: sudo apt install nodejs npm -y)
sudo apt install -y nodejs"

We clon our GitHub repo: git clone https://github.com/your-username/your-repo-name.git

Install dependencies and build your Next.js app:
"npm install
npm run build
npm start"

By default, Next.js runs on port 3000. We can test by visiting: "http://our-server-ip:3000"

We can check if our Next.js server is running and listening on port 3000: "ss -tuln | grep 3000"

Then we point our domain to our Hetzner Server
