# 🛒 E-commerce API with Microservices Architecture

This project is a full-featured **E-commerce backend** built using a **Microservices Architecture**. Each core feature of the system (user management, product catalog, orders, payments, etc.) is developed and deployed as an independent service. The architecture is scalable, maintainable, and designed for real-world applications.

---

## 📦 Services Overview

| Service       | Description                                 | Port  |
|---------------|---------------------------------------------|-------|
| `api-gateway` | Entry point for all client requests         | 5000  |
| `auth-service`| Handles user registration, login, auth      | 8080  |
| `product-service` | Manages product listings, search, etc | 8081  |
| `order-service` | Manages order creation, status, etc     | 8082  |
| `cart-service`  | Manages user shopping carts               | 8083  |
| `payment-service` | Handles payment processing             | 8084  |
| `inventory-service` | Manages stock & availability        | 8085  |
<!-- | `notification-service` | Sends emails, SMS, alerts        | 5006  | -->

---

## ⚙️ Tech Stack

- **Programming Languages:** Node.js / Express / Typescript
- **Database:** MongoDB / Mongoose
- **API Gateway:** Express Gateway / NGINX / Custom
- **Authentication:** JWT (JSON Web Tokens)
- **Service Communication:** REST / gRPC / RabbitMQ / Kafka
- **Containerization:** Docker, Docker Compose

---

## 📁 Project Structure

ecommerce-microservices/

├── api-gateway/
├── auth-service/
├── product-service/
├── order-service/
├── cart-service/
├── payment-service/
├── inventory-service/
<!-- ├── notification-service/ -->
└── docker-compose.yml


Each folder contains its own independent microservice, including:
- Source code
- Dockerfile
- Environment configs
- Unit tests

---

## 🚀 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/) 
- [Postman](https://www.postman.com/) 

### Clone the Repository

```bash
git clone https://github.com/your-username/ecommerce-microservices.git
cd ecommerce-microservices
docker-compose up --build



