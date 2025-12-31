# Expense Tracker Backend

This is the backend API for the Expense Tracker application, built with .NET 8.

## Structure

- **ExpenseTracker.API**: The API layer (Controllers, Setup).
- **ExpenseTracker.Application**: Business logic, DTOs, Services.
- **ExpenseTracker.Domain**: Entities, Repository Interfaces.
- **ExpenseTracker.Infrastructure**: EF Core context, Repository implementations.

## Setup

1.  **Prerequisites**: .NET 8 SDK, SQL Server (or Docker).
2.  **Configuration**: Update `appsettings.json` or use Environment Variables for `ConnectionStrings:DefaultConnection`.

## Running Locally

```bash
dotnet restore
dotnet run --project ExpenseTracker.API
```

## Docker

Build the image:

```bash
docker build -t expense-tracker-backend .
```
