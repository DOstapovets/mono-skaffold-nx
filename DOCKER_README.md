# Docker Setup for the Application

This project has been containerized using Docker. Below are instructions on how to run the application in both development and production environments.

## Prerequisites

- Docker and Docker Compose installed on your machine
- Git (to clone the repository)

## Development Environment

The development environment uses hot-reloading and other development features to make the development process easier.

### Starting the Development Environment

```bash
docker-compose -f docker-compose.dev.yml up
```

This will start both the client and server in development mode with the following features:
- Hot reloading for both client and server
- Volume mounting for real-time code changes
- Development-specific configurations

The client will be available at http://localhost:5173 and the server at http://localhost:3000.

### Stopping the Development Environment

```bash
docker-compose -f docker-compose.dev.yml down
```

## Production Environment

The production environment is optimized for performance and security.

### Starting the Production Environment

```bash
docker-compose -f docker-compose.prod.yml up -d
```

This will start both the client and server in production mode with the following features:
- Optimized builds for performance
- Nginx serving the client static files
- Production-specific configurations

The application will be available at http://localhost:80 (or just http://localhost).

### Stopping the Production Environment

```bash
docker-compose -f docker-compose.prod.yml down
```

## Building the Images

If you want to build the Docker images without starting the containers:

```bash
# For development
docker-compose -f docker-compose.dev.yml build

# For production
docker-compose -f docker-compose.prod.yml build
```

## Troubleshooting

### Viewing Logs

```bash
# For development
docker-compose -f docker-compose.dev.yml logs -f

# For production
docker-compose -f docker-compose.prod.yml logs -f
```

### Accessing a Container Shell

```bash
# For client container
docker-compose -f docker-compose.dev.yml exec client sh

# For server container
docker-compose -f docker-compose.dev.yml exec server sh
```

## Notes

- The client container in production uses Nginx to serve the static files and proxy API requests to the server.
- Environment variables are set in the Docker Compose files. For additional environment variables, you can create a `.env` file in the project root.
