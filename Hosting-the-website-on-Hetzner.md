Check system uptime and load: "uptime"<br/>
See memory usage: "free -h"<br/>
Check disk usage: "df -h"<br/>
Check running processes and CPU usage: "top"<br/>
See a real-time list of processes and resource usage: "htop"<br/>
Check network interfaces and IP: "ip a"<br/>
Check server hostname and info: "hostname" and "uname -a"<br/>
A quick summary of system info: "neofetch"<br/>
Update the server: "sudo apt update" and "sudo apt upgrade -y"<br/>
Install a web server: "sudo apt install nginx -y" (Nginx is a popular, lightweight, and easy to use)<br/>
Start and enable Nginx to run on boot: "sudo systemctl start nginx" and "sudo systemctl enable nginx"<br/>
We can check if it works by visiting our server’s IP address in a browser. We should see the default Nginx welcome page.<br/>
Now we can host our Next.js website on our Hetzner Ubuntu server:<br/>
"sudo apt update && sudo apt upgrade -y<br/>
sudo apt install curl git -y<br/>
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - (if it doesn't work: sudo apt install nodejs npm -y)<br/>
sudo apt install -y nodejs"<br/>
We clon our GitHub repo: git clone https://github.com/your-username/your-repo-name.git<br/>
Install dependencies and build your Next.js app:
"npm install
npm run build
npm start"<br/>
By default, Next.js runs on port 3000. We can test by visiting: "http://our-server-ip:3000"<br/>
We can check if our Next.js server is running and listening on port 3000: "ss -tuln | grep 3000"<br/>
Then we point our domain to our Hetzner Server
