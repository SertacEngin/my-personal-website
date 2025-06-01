# Website Monitoring with Prometheus, Grafana, and Alertmanager

## Overview
This project sets up a monitoring stack using **Prometheus**, **Grafana**, and **Alertmanager** on a Hetzner server to monitor a website’s performance and server health. The goal is to collect metrics, visualize them in dashboards, and send alerts for downtime, demonstrating DevOps practices like observability and automation.

## Why Prometheus and Grafana?
- **Prometheus**: A time-series monitoring tool that collects metrics from the website and server, enabling real-time insights into performance and reliability.
- **Grafana**: A visualization platform that creates dashboards to display Prometheus metrics, making it easier to analyze system and application health.
- **Alertmanager**: Handles alerts from Prometheus, sending notifications (e.g., via email) when issues like website downtime occur.
- These tools are industry standards in DevOps for monitoring datacenter and cloud environments, aligning with automated IT operations.

## Project Setup
The monitoring stack runs on a Linux server (Ubuntu) hosted on Hetzner, monitoring a website running on port 3000.

### Components
1. **Prometheus**:
   - Version: 2.54.1
   - Config: `/etc/prometheus/prometheus.yml`
   - Scrapes metrics from:
     - Prometheus itself (`localhost:9090`)
     - Node Exporter (`localhost:9100`) for server metrics (CPU, memory, disk)
     - Website `/metrics` endpoint (port 3000)
   - Runs as a systemd service (`prometheus.service`).
   - Data stored in `/var/lib/prometheus`.

2. **Node Exporter**:
   - Version: 1.8.2
   - Runs on port 9100 as a systemd service (`node_exporter.service`).
   - Provides server metrics like CPU, memory, and disk usage.

3. **Grafana**:
   - Configured to run on port 3001 (`/etc/grafana/grafana.ini`) to avoid conflict with the website on port 3000.
   - Connected to Prometheus as a data source (`http://localhost:9090`).
   - Displays dashboards for server and website metrics.
   - Accessible at `http://<server-ip>:3001`.

4. **Alertmanager**:
   - Version: 0.27.0
   - Config: `/etc/alertmanager/alertmanager.yml`
   - Runs on port 9093 as a systemd service (`alertmanager.service`).
   - Sends email notifications for alerts, configured via Gmail SMTP.
   - Alert rule: Notifies if the website is down for 5 minutes (`up{job="website"} == 0`).

### Key Configurations
- **Prometheus Config** (`/etc/prometheus/prometheus.yml`):
  ```yaml
  global:
    scrape_interval: 15s
  scrape_configs:
    - job_name: 'prometheus'
      static_configs:
        - targets: ['localhost:9090']
    - job_name: 'node'
      static_configs:
        - targets: ['localhost:9100']
    - job_name: 'website'
      static_configs:
        - targets: ['localhost:3000']
  alerting:
    alertmanagers:
      - static_configs:
          - targets: ['localhost:9093']
  rule_files:
    - /etc/prometheus/rules.yml
  ```
- **Alertmanager Config** (`/etc/alertmanager/alertmanager.yml`):
  ```yaml
  global:
    smtp_smarthost: 'smtp.gmail.com:587'
    smtp_from: 'your-email@gmail.com'
    smtp_auth_username: 'your-email@gmail.com'
    smtp_auth_password: 'your-app-password'
  route:
    receiver: 'email'
  receivers:
    - name: 'email'
      email_configs:
        - to: 'your-email@gmail.com'
  ```
- **Alert Rule** (`/etc/prometheus/rules.yml`):
  ```yaml
  groups:
  - name: website_alerts
    rules:
    - alert: WebsiteDown
      expr: up{job="website"} == 0
      for: 5m
      labels:
        severity: critical
      annotations:
        summary: "Website is down"
        description: "{{ $labels.instance }} is down."
  ```

### Challenges and Solutions
- **Port Conflict**: The website used port 3000, conflicting with Grafana’s default port. Resolved by configuring Grafana to use port 3001.
- **Systemd Issues**: Fixed errors in Prometheus and Alertmanager service files (e.g., missing `alertmanager.service`) by creating proper systemd configurations.
- **Alertmanager Setup**: Resolved “Unit file does not exist” error by creating `/etc/systemd/system/alertmanager.service`.

### Future Improvements
- Add custom website metrics (e.g., request latency, user actions).
- Set up a reverse proxy (Nginx) for secure access to Grafana (e.g., `https://yourdomain.com/grafana/`).
- Integrate Grafana Loki for log monitoring.
- Configure advanced alerts for error rates or server resource spikes.

### How to Run
1. Start services:
   ```bash
   sudo systemctl start prometheus
   sudo systemctl start node_exporter
   sudo systemctl start grafana-server
   sudo systemctl start alertmanager
   ```
2. Access:
   - Prometheus: `http://<server-ip>:9090`
   - Grafana: `http://<server-ip>:3001`
   - Alertmanager: `http://<server-ip>:9093`
3. Verify alerts by stopping the website and checking email notifications.

### Relevance to DevOps
This project demonstrates:
- **Linux Skills**: Configured services, managed permissions, and troubleshot systemd issues.
- **Monitoring and Observability**: Used Prometheus and Grafana to monitor website and server health.
- **Automation**: Set up automated alerts with Alertmanager for proactive issue detection.
- **DevOps Practices**: Applied industry-standard tools to improve reliability and performance.