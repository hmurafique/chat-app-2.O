# Chat App 2.0 - Microservices Deployment
This is a **Chat Application** built using **microservices**.
It has multiple backend services, a frontend, and supports deployment with **Docker**, **Docker Compose**, and **Nginx (SSL)**.

---

## Project Structure
```bash
chat-app-2.0/
├── backend
│ ├── auth-service # User authentication (Node.js)
│ ├── chat-service # Real-time chat (Node.js)
│ ├── file-service # File uploads (Node.js)
│ └── notification-service # Notifications (Python)
├── frontend
│ └── frontend-service # React-based frontend
├── nginx
│ ├── host-nginx # Nginx config for host setup
│ └── container-nginx # Nginx config for container setup
├── certs # SSL certificates folder
└── docker-compose.yml
```

---

## Running Without Deployment (Local Development)
You can run each service manually for testing:
1. **Backend Services (Node.js)**
   ```bash
   cd backend/auth-service
   npm install
   npm start
   ```
Repeat for chat-service and file-service.

2. **Notification Service (Python)**
   ```bash
   cd backend/notification-service
   pip install -r requirements.txt
   python src/main.py
   ```

3. **Frontend (React)**
   ```bash
   cd frontend/frontend-service
   npm install
   npm start
   ```

---

## Running With Deployment (Docker & Docker Compose)
All services are containerized. You only need Docker & Docker Compose installed.
1. **Clone the repo**
   ```bash
   git clone https://github.com/your-repo/chat-app-2.0.git
   cd chat-app-2.0
   ```

2. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d --build
   ```

---

## Deployment Options
### Option 1: Host Nginx (with SSL)
- Nginx runs directly on your host machine.
- Certificates are stored in certs/:
- certs/example.com.crt
- certs/example.com.key
- Config file: nginx/host-nginx/conf.d/default.conf
- Use when you want full control of the host environment.
Steps:
- Install Nginx on your server.
- Copy nginx/host-nginx/conf.d/default.conf to /etc/nginx/conf.d/.
- Place SSL certs inside certs/.
Restart Nginx:
```bash
sudo systemctl restart nginx
```

---

### Option 2: Containerized Nginx (with SSL)
- Nginx runs inside a Docker container.
- Certificates are mounted from the certs/ folder.
- Config file: nginx/container-nginx/conf.d/default.conf
- Best for fully containerized setups.
Steps:
- Keep SSL certificates inside certs/.
- Run everything with Docker Compose:
```bash
docker-compose up -d --build
```
- Nginx container will load certificates and serve HTTPS traffic.

---


