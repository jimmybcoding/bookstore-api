# SpiceShelf
SpiceShelf is a modern fullstack bookstore application featuring a fully documented RESTful API built with Swagger.  
It’s containerized with Docker for seamless setup and deployment. 

## Stack
### Backend
- Node.js
- Express
- Prisma
- PostgreSQL

### Frontend
- React
- TailwindCSS
- Vite

## Setup Instructions
### Requirements
Docker Desktop must be installed: (https://www.docker.com/products/docker-desktop/)

### 1. Clone the repository
```bash
git clone https://github.com/jimmybcoding/bookstore-api.git
cd bookstore-api
```

### 2. Build the Docker container
```bash
docker-compose up --build
```

### 3. Visit frontend website
```
localhost:5173
```

### 4. View the Swagger docs
```
localhost:3000/api-docs
```

### To shut down the Docker container
```bash
docker-compose down
```





    