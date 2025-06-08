## What is Ansible and Why Do We Use It?

**Ansible** is an open-source automation platform that simplifies configuration management, application deployment, and task orchestration. It uses a declarative language (YAML) to define infrastructure as code, enabling repeatable and consistent server setups. Ansible is agentless, relying on SSH for communication, which reduces complexity and overhead.

### Why Ansible is Essential for DevOps Engineers

As DevOps engineers, we strive to automate repetitive tasks, ensure scalability, and maintain reliable infrastructure. Ansible excels in these areas because:

- **Simplicity**: Its human-readable YAML playbooks make automation accessible, even for complex tasks.
- **Idempotency**: Ansible ensures tasks are applied only when needed, preventing unintended changes.
- **Agentless Architecture**: No software installation is required on managed nodes, reducing maintenance.
- **Scalability**: Ansible can manage one server or thousands, ideal for growing infrastructures.
- **Community and Ecosystem**: A vast library of modules and Galaxy roles supports diverse use cases, from web servers to cloud orchestration.
- **Infrastructure as Code**: Playbooks versioned in Git enable collaboration, auditing, and CI/CD integration.

I used Ansible to automate the setup of a web hosting environment on my Hetzner server, demonstrating server management, and DevOps best practices.

## Project Overview

This project configures a Hetzner server (Ubuntu) to host a website using Ansible. The server acts as both the control node (running Ansible) and the managed node. I access the server from a Windows machine via SSH, using a private key for authentication. The Ansible playbook installs and configures:

- **Nginx**: A high-performance web server.
- **Node.js**: A runtime for modern web applications.
- **MariaDB**: A robust database server.
- **Certbot**: For securing the website with Let’s Encrypt SSL.
- A sample website deployed to `/var/www/html`.

## Prerequisites

- **Hetzner Server**: Running Ubuntu (e.g., 22.04 or 24.04), accessible via SSH.
- **SSH Key Pair**: Private key on the Windows machine, public key in `/root/.ssh/authorized_keys` on the server.
- **Windows Machine**: For SSH access using PowerShell or PuTTY.
- **GitHub Repository**: To version control the Ansible project.

## Setup Steps

Below are the steps I followed to set up Ansible on my Hetzner server, overcoming challenges like the `externally-managed-environment` error and configuring a robust web hosting environment.

### Step 1: Install Ansible on the Hetzner Server

Ubuntu’s system Python is externally managed (PEP 668), preventing global `pip` installations. I used a virtual environment to install Ansible safely.

1. **Install Dependencies**:

   ```bash
   apt update
   apt install python3 python3-venv python3-pip -y
   ```

2. **Create Ansible Directory and Virtual Environment**:

   ```bash
   mkdir ~/ansible && cd ~/ansible
   python3 -m venv venv
   ```

3. **Activate Virtual Environment and Install Ansible**:

   ```bash
   source venv/bin/activate
   pip install ansible
   ansible --version
   ```

   This installed Ansible (e.g., core 2.16.x) in an isolated environment.

4. **Deactivate (Optional)**:
   ```bash
   deactivate
   ```

### Step 2: Configure SSH for Local Management

Since the server manages itself, I configured SSH to allow local connections as the `root` user.

1. **Verify SSH Keys**:

   ```bash
   ls /root/.ssh
   ```

   Confirmed `id_rsa` and `id_rsa.pub` exist.

2. **Add Public Key to Authorized Keys**:

   ```bash
   cat /root/.ssh/id_rsa.pub >> /root/.ssh/authorized_keys
   chmod 600 /root/.ssh/authorized_keys
   chmod 700 /root/.ssh
   ```

3. **Create SSH Config**:

   ```bash
   nano /root/.ssh/config
   ```

   Added:

   ```
   Host hetzner
       HostName localhost
       User root
       IdentityFile /root/.ssh/id_rsa
   ```

   Set permissions:

   ```bash
   chmod 600 /root/.ssh/config
   ```

4. **Test SSH**:
   ```bash
   ssh hetzner
   ```
   Confirmed passwordless local SSH.

### Step 3: Set Up Ansible Inventory

I created an inventory file to define the server as a managed node.

1. **Create Inventory**:

   ```bash
   cd ~/ansible
   source venv/bin/activate
   nano hosts
   ```

   Added:

   ```
   [webservers]
   hetzner ansible_host=localhost ansible_user=root ansible_ssh_private_key_file=/root/.ssh/id_rsa ansible_connection=ssh
   ```

2. **Test Connectivity**:
   ```bash
   ansible webservers -i hosts -m ping
   ```
   Output confirmed connectivity:
   ```
   hetzner | SUCCESS => {
       "changed": false,
       "ping": "pong"
   }
   ```

### Step 4: Create and Run an Enhanced Ansible Playbook

I developed a playbook to automate the setup of a web hosting environment, installing Nginx, Node.js, MariaDB, Certbot, and deploying a sample website.

1. **Create Directory Structure**:

   ```bash
   mkdir -p files group_vars roles
   mv hosts inventory
   ```

2. **Create Sample Website**:

   ```bash
   mkdir files
   nano files/index.html
   ```

   Added:

   ```html
   <!DOCTYPE html>
   <html>
     <head>
       <title>Welcome to My Website</title>
     </head>
     <body>
       <h1>Hello, DevOps World!</h1>
       <p>This website is deployed using Ansible.</p>
     </body>
   </html>
   ```

3. **Create Playbook**:

   ```bash
   nano webserver.yml
   ```

   Added:

   ```yaml
   ---
   - name: Configure web hosting environment
     hosts: webservers
     become: yes
     vars:
       domain_name: example.com
       db_root_password: securepassword123
     tasks:
       - name: Update apt cache
         apt:
           update_cache: yes
           cache_valid_time: 3600

       - name: Install Nginx
         apt:
           name: nginx
           state: present
         notify: Start Nginx

       - name: Install Node.js and npm
         apt:
           name: ["nodejs", "npm"]
           state: present
         environment:
           DEBIAN_FRONTEND: noninteractive
         retries: 3
         delay: 5

       - name: Install MariaDB server
         apt:
           name: mariadb-server
           state: present

       - name: Ensure MariaDB is running
         service:
           name: mariadb
           state: started
           enabled: yes

       - name: Set MariaDB root password
         mysql_user:
           name: root
           password: "{{ db_root_password }}"
           login_unix_socket: /var/run/mysqld/mysqld.sock
           state: present
         no_log: true

       - name: Install Certbot and Nginx plugin
         apt:
           name: ["certbot", "python3-certbot-nginx"]
           state: present

       - name: Deploy website files
         copy:
           src: files/index.html
           dest: /var/www/html/index.html
           owner: www-data
           group: www-data
           mode: "0644"
         notify: Reload Nginx

     handlers:
       - name: Start Nginx
         service:
           name: nginx
           state: started
           enabled: yes

       - name: Reload Nginx
         service:
           name: nginx
           state: reloaded
   ```

   **Notes**:

   - Installs Nginx, Node.js, MariaDB, and Certbot.
   - Deploys a sample `index.html`.
   - Sets a MariaDB root password (replace `securepassword123` with a strong password).
   - Uses handlers for Nginx start/reload.
   - Replace `example.com` with your domain for Certbot (Certbot task requires manual execution; see below).

4. **Install MariaDB Client for Ansible**:
   The `mysql_user` module requires `python3-mysqldb`:

   ```bash
   apt install python3-mysqldb -y
   ```

5. **Run Playbook**:

   ```bash
   source venv/bin/activate
   ansible-playbook -i inventory webserver.yml
   ```

6. **Verify Setup**:
   - **Nginx**: Visit `http://<hetzner_server_ip>` to see the sample website.
   - **Node.js**: Check version:
     ```bash
     node --version
     ```
   - **MariaDB**: Log in:
     ```bash
     mysql -u root -p
     ```
   - **Certbot**: Manually run for SSL (requires a domain):
     ```bash
     certbot --nginx -d example.com
     ```

### Step 5: Manage from Windows

I access the server from my Windows machine to run Ansible commands and edit files.

1. **SSH Access**:

   ```powershell
   ssh -i C:\path\to\id_rsa root@<hetzner_server_ip>
   cd ~/ansible
   source venv/bin/activate
   ansible-playbook -i inventory webserver.yml
   ```

2. **File Editing**:
   Used WinSCP to transfer and edit files like `webserver.yml` and `index.html` locally, ensuring seamless workflow.

## Project Structure

```
ansible/
├── files/
│   └── index.html        # Sample website file
├── group_vars/
│   └── webservers.yml    # Group variables (optional)
├── inventory             # Server inventory
├── roles/                # Reusable roles (optional)
├── venv/                 # Python virtual environment
└── webserver.yml         # Main playbook
```

## Next Steps

This project is a foundation for advanced DevOps tasks:

- **Roles**: Refactor tasks into reusable Ansible roles.
- **CI/CD**: Integrate with GitHub Actions for automated playbook runs.
- **Monitoring**: Add tasks to install monitoring tools like Prometheus.
- **Backups**: Automate website and database backups.
- **Multi-Server**: Extend the inventory to manage additional servers.

---
