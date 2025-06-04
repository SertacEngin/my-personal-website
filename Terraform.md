My Personal Website - DevOps Enhanced with Terraform
This repository hosts my personal website, a Node.js application deployed on a Hetzner server running Ubuntu. The project incorporates a robust DevOps setup, including CI/CD pipelines, Docker, Prometheus, Grafana, and now Terraform for Infrastructure as Code (IaC). This README details the steps taken to install Terraform, configure it to manage Hetzner infrastructure, and enhance the deployment with a firewall and load balancer, all integrated into the existing DevOps workflow.
Project Overview

Website: A Node.js-based personal website hosted on a Hetzner Cloud server.
Existing DevOps Tools:
CI/CD: GitHub Actions for automated builds and deployments.
Docker: Containerized application for consistent runtime environments.
Prometheus & Grafana: Monitoring and visualization of application metrics.

New Addition: Terraform for managing infrastructure (server, firewall, load balancer) as code.
Goal: Automate and secure infrastructure management, making it reproducible and scalable.

Terraform Integration: Step-by-Step Implementation
Below is a detailed account of how Terraform was integrated into this project to manage the Hetzner infrastructure, including installation, configuration, and enhancements.
Step 1: Installing Terraform on the Hetzner Server
To manage the Hetzner infrastructure programmatically, Terraform was installed on the Ubuntu-based Hetzner server hosting the website.

Connected to the Server:

Used SSH to access the server:ssh root@<server-ip>

Removed Outdated Terraform Version:

An older version of Terraform was present, which caused a version mismatch error.
Located and removed the old binary:which terraform
sudo rm /usr/local/bin/terraform

Verified removal:terraform --version

Installed Prerequisites:

Updated the package manager and installed unzip:sudo apt update && sudo apt install unzip -y

Downloaded Terraform 1.12.1:

Downloaded the latest version (1.12.1) for Linux 64-bit:wget https://releases.hashicorp.com/terraform/1.12.1/terraform_1.12.1_linux_amd64.zip

Installed Terraform:

Extracted the binary and moved it to /usr/local/bin:unzip terraform_1.12.1_linux_amd64.zip
sudo mv terraform /usr/local/bin/
sudo chmod +x /usr/local/bin/terraform

Cleaned up the zip file:rm terraform_1.12.1_linux_amd64.zip

Verified Installation:

Checked the version to confirm:terraform --version

Output: Terraform v1.12.1

Step 2: Setting Up Terraform Configuration
Terraform was configured to manage Hetzner Cloud resources using two files: main.tf and server.tf.

Created Terraform Directory:

Set up a directory for Terraform configurations:mkdir ~/terraform && cd ~/terraform

Configured main.tf:

Created main.tf to define the Hetzner Cloud provider and a variable for the API token:terraform {
required_providers {
hcloud = {
source = "hetznercloud/hcloud"
version = "~> 1.45"
}
}
}

provider "hcloud" {
token = var.hcloud_token
}

variable "hcloud_token" {}

Configured server.tf:

Created server.tf to define a test server (later modified for the actual website server):resource "hcloud_server" "test" {
name = "test-server"
image = "ubuntu-22.04"
server_type = "cx11"
location = "nbg1"
}

Set Hetzner API Token:

Obtained the API token from the Hetzner Cloud Console and set it as an environment variable:export TF_VAR_hcloud_token=<hetzner-api-token>

Initialized Terraform:

Ran the following to download the Hetzner provider:terraform init

Tested the Configuration:

Previewed the changes:terraform plan

This showed the plan to create a test server.
Optionally applied or destroyed the test server to avoid costs:terraform apply
terraform destroy

Modified for Website Server:

Updated server.tf to reflect the actual website server’s configuration:resource "hcloud_server" "website_server" {
name = "my-personal-website"
image = "ubuntu-22.04"
server_type = "cx21"
location = "nbg1"
ssh_keys = ["my-ssh-key"]
}

Step 3: Enhancing Infrastructure with Firewall and Load Balancer
To improve security and scalability, a firewall and load balancer were added using Terraform.

Updated server.tf for Firewall and Load Balancer:

Modified server.tf to include:
A firewall to restrict traffic to SSH (port 22), HTTP (port 80), and HTTPS (port 443).
A load balancer to distribute traffic to the website server.
Updated configuration:resource "hcloud_server" "website_server" {
name = "my-personal-website"
image = "ubuntu-22.04"
server_type = "cx21"
location = "nbg1"
ssh_keys = ["my-ssh-key"]
}

resource "hcloud_firewall" "website_firewall" {
name = "website-firewall"
rule {
direction = "in"
protocol = "tcp"
port = "22"
source_ips = ["0.0.0.0/0", "::/0"]
}
rule {
direction = "in"
protocol = "tcp"
port = "80"
source_ips = ["0.0.0.0/0", "::/0"]
}
rule {
direction = "in"
protocol = "tcp"
port = "443"
source_ips = ["0.0.0.0/0", "::/0"]
}
}

resource "hcloud_firewall_attachment" "website_firewall_attachment" {
firewall_id = hcloud_firewall.website_firewall.id
server_ids = [hcloud_server.website_server.id]
}

resource "hcloud_load_balancer" "website_lb" {
name = "website-lb"
load_balancer_type = "lb11"
location = "nbg1"
}

resource "hcloud_load_balancer_target" "website_lb_target" {
load_balancer_id = hcloud_load_balancer.website_lb.id
type = "server"
server_id = hcloud_server.website_server.id
}

resource "hcloud_load_balancer_service" "website_lb_service" {
load_balancer_id = hcloud_load_balancer.website_lb.id
protocol = "http"
listen_port = 80
destination_port = 80
health_check {
protocol = "http"
port = 80
path = "/"
interval = 10
timeout = 5
}
}

Reinitialized Terraform:

Ran terraform init to update dependencies.

Applied Changes:

Previewed and applied the configuration:terraform plan
terraform apply

This created the firewall and load balancer, with the website accessible via the load balancer’s IP.

Integrated with CI/CD:

Added a GitHub Actions workflow to automate Terraform deployments:name: Terraform Deploy
on:
push:
branches: - main
jobs:
terraform:
runs-on: ubuntu-latest
steps: - uses: actions/checkout@v3 - uses: hashicorp/setup-terraform@v2
with:
terraform_version: 1.12.1 - name: Terraform Init
run: terraform init
working-directory: ./terraform - name: Terraform Plan
run: terraform plan
working-directory: ./terraform
env:
TF_VAR_hcloud_token: ${{ secrets.HCLOUD_TOKEN }} - name: Terraform Apply
run: terraform apply -auto-approve
working-directory: ./terraform
env:
TF_VAR_hcloud_token: ${{ secrets.HCLOUD_TOKEN }}

Added the Hetzner API token to GitHub Secrets (HCLOUD_TOKEN).

Committed to Repository:

Copied the terraform/ directory to the repository and pushed:scp -r ~/terraform ./
git add .
git commit -m "Add Terraform configuration for Hetzner server, firewall, and load balancer"
git push origin main

Integration with Existing DevOps Setup

CI/CD: The GitHub Actions workflow automates infrastructure changes, complementing the existing CI/CD pipeline for the Node.js application.
Docker: The load balancer forwards traffic to the Dockerized Node.js app on port 80, ensuring compatibility.
Prometheus & Grafana: The firewall can be extended to allow access to Prometheus (port 9090) and Grafana (port 3000) for monitoring.

Future Enhancements

Remote State Management: Store Terraform state in Hetzner Object Storage for better collaboration.
Docker Management: Use the Terraform docker provider to manage containers.
DNS Automation: Manage domain DNS records with the hetznerdns provider.
Scaling: Add more servers to the load balancer for high availability.

How to Use This Setup

Clone the repository:git clone https://github.com/SertacEngin/my-personal-website.git

Set up the Hetzner API token in GitHub Secrets or as an environment variable.
Run Terraform locally or via GitHub Actions to manage infrastructure.
Access the website via the load balancer’s IP or configured domain.

Conclusion
This project demonstrates a robust DevOps setup, combining CI/CD, Docker, monitoring, and now Terraform for IaC. The Terraform integration automates Hetzner infrastructure management, enhances security with a firewall, and improves scalability with a load balancer, making the website deployment more reliable and maintainable.
