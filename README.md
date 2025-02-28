# Movie App - Setup Guide
This is a basic application where I showcase how I usually work. The entire application runs with a single command:
```sh
make app
```
as long as you follow the instructions below.

## Prerequisites
Before running the application, ensure you have the following installed:
- **Docker** (for containerized deployment)
- **Make** (to simplify command execution)

## Environment Variables
The application requires environment variables for both the **backend** and **frontend** to work properly.

### 1️⃣ Backend
Create a `.env` file inside the backend directory (`movies-nest-11/`) and provide the necessary environment variables, including your API key for external services.

### 2️⃣ Frontend
Create a `.env` file inside the frontend directory (`movies-ionic-angular-19/`). Additionally, go to `src/environments/` and create an `environment.ts` file to configure the frontend settings.

#### Example `environment.ts` file:
```typescript
export const environment = {
  production: false,
  VITE_BACKEND_URL: "http://localhost:3000", // Adjust if running in Docker
};
```

### 🔴 Important:
Without a valid API key, the application **will not function correctly** when trying to fetch external movie data.

## Running the Application
Once the environment variables are set up, navigate to the project root and run:

```sh
make app
```

This command will:
1. Create the required Docker network.
2. Build and start the backend.
3. Start the frontend container.

If you encounter any issues, try:
```sh
make clean  # Stops and removes containers (preserves data)
make superclean  # Completely removes all containers, volumes, and networks
```
Then, restart the application with:
```sh
make app
```

## Additional Notes
- **Make sure Docker is running** before executing the commands.
- If you're using a different backend host (e.g., cloud service), update `VITE_BACKEND_URL` in `environment.ts`.
- In the Makefile, you have additional commands to manage the backend and frontend services. The backend does not depend on the frontend, but the frontend depends on the backend. Therefore, you will always need the backend running if you want to use the frontend. However, you do not need to start the frontend if you only want to use the backend.
