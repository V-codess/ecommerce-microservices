🛒 E-Commerce Microservices Backend

Microservices e-commerce backend built using Node.js, Express, MongoDB, PostgreSQL, Docker, RabbitMQ, and Nginx.
This project demonstrates scalable architecture, JWT authentication, role-based access control, and asynchronous event communication between services.

| Layer             | Technology                                                 |
| ----------------- | ---------------------------------------------------------- |
| API Gateway       | **Nginx**                                                  |
| Backend Framework | **Node.js / Express**                                      |
| Databases         | **MongoDB (Auth, Product, Cart)**, **PostgreSQL (Orders)** |
| Messaging Queue   | **RabbitMQ**                                               |
| Authentication    | **JWT + Refresh Tokens**                                   |
| Containerization  | **Docker / Docker Compose**                                |
| Language          | **TypeScript**                                             |
| CI/CD             | **GitHub Actions**                                         |

                    ┌────────────────┐
                    │   API Gateway  │  ← Nginx routes requests
                    └───────┬────────┘
                            │
     ┌──────────────────────┼──────────────────────────┐
     │                      │                          │
┌────▼───────┐       ┌──────▼────────┐          ┌──────▼────────┐
│ Auth Svc   │       │ Product Svc   │          │ Order Svc     │
│ MongoDB     │       │ MongoDB       │          │ PostgreSQL     │
│ JWT / RBAC  │       │ Product CRUD  │          │ Create Orders  │
└─────────────┘       └───────────────┘          └───────────────┘
                            │
                            │ RabbitMQ Events
                            ▼
                     ┌────────────┐
                     │ Cart Svc   │
                     │ MongoDB    │
                     └────────────┘

1. Clone the Repository
git clone https://github.com/V-codess/ecommerce-microservices.git
cd ecommerce-microservices
2. Create .env Files for Each Service
PORT=4001
MONGO_URI=mongodb://mongo:27017/authdb
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
## Postgres
PORT=4003
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=orders
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
JWT_SECRET=your_jwt_secret
3. Run with Docker Compose
docker-compose up --build

