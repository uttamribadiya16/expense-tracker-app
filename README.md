# Expense Tracker App

A full-stack expense tracking application built with React, .NET 8, and SQL Server, fully containerized with Docker.

## Architecture

```
[ Frontend (React + Nginx) ] <--> [ Backend (.NET 8 API) ] <--> [ SQL Server (Docker) ]
```

## Quick Start (Docker)

1.  Prerequisites: Docker & Docker Compose.
2.  Navigate to `infrastructure`:
    ```bash
    cd infrastructure
    ```
3.  Start the application:
    ```bash
    docker compose up -d
    ```
4.  Access the app:
    - Frontend: http://localhost:3000
    - Backend Swagger: http://localhost:8080/swagger
    - Database: localhost:1433

## Development

- **Backend**: `cd backend` -> `dotnet run --project ExpenseTracker.API`
- **Frontend**: `cd frontend` -> `npm run dev`

## Deployment

The GitHub Actions pipeline automatically builds and pushes Docker images to Docker Hub on push to `main`.
Set `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` in GitHub Secrets.
