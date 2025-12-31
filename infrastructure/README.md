# Infrastructure

This folder contains the Docker Compose configuration to run the entire stack.

## Services

- **backend**: .NET 8 Web API
- **frontend**: React + Nginx
- **mssql**: SQL Server 2022

## Setup

1.  Navigate to this folder: `cd infrastructure`
2.  Update `.env` if needed (change passwords!).
3.  Run:
    ```bash
    docker compose up -d
    ```

## Access Information

Once running, you can access the projects at the following URLs:

- **Frontend Application**: http://localhost:3000
- **Backend API (Swagger)**: http://localhost:8080/swagger
- **Database (Internal)**: mssql:1433 (Exposed locally on port 1433)

## Persistence

SQL Server data is stored in the `mssql_data` Docker volume. To reset data:
```bash
docker compose down -v
```
