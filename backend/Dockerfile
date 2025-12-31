# Use the official .NET SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy the solution file and project files
COPY *.sln .
COPY ExpenseTracker.API/*.csproj ./ExpenseTracker.API/
COPY ExpenseTracker.Application/*.csproj ./ExpenseTracker.Application/
COPY ExpenseTracker.Domain/*.csproj ./ExpenseTracker.Domain/
COPY ExpenseTracker.Infrastructure/*.csproj ./ExpenseTracker.Infrastructure/

# Restore dependencies
RUN dotnet restore

# Copy the rest of the code
COPY . .

# Build the application
WORKDIR /app/ExpenseTracker.API
RUN dotnet publish -c Release -o /app/out

# Use the official .NET runtime image for the final image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

# Expose port
EXPOSE 8080

# Set entry point
ENTRYPOINT ["dotnet", "ExpenseTracker.API.dll"]
