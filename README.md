# Project Setup and Execution Guide

### Prerequisites

Before running the project, ensure you have the following installed on your machine:

- **Node.js** (Version 18.14.0 or later) - Required for running the backend and frontend locally.
- **Yarn** (Package Manager) - Used for managing dependencies.
- **Docker & Docker Compose** - Required if you choose to run the project inside Docker containers.
- **Git** - Needed to clone the repository.

---

## Running the Project with Docker (Recommended)

Using Docker ensures a consistent and reproducible environment, eliminating local setup issues.

### 1. Clone the Repository

Open a terminal and run the following commands:

```sh
git clone <repository-url>
cd <repository-folder>
```

This will download the project to your machine and navigate into the project directory.

### 2. Configure Environment Variables

Check if the backend and frontend services require environment variables. If so:

- Navigate to the backend directory and create a `.env` file with the required configurations.
- Navigate to the frontend directory and create a `.env` file if necessary.
- Ensure that sensitive credentials (e.g., API keys, database URLs) are correctly set in these files.

### 3. Build and Start Containers

Run the following command to build and start the containers:

```sh
docker-compose up --build
```

This command will:

- Build the backend and frontend images.
- Start both services inside their respective containers.
- Map the necessary ports from the containers to your local machine.

### 4. Access the Services

Once the containers are running, access the application through the following URLs:

- Frontend: Open http://localhost:3000 in your web browser.
- Backend: API is accessible at http://localhost:3001.

### 5. Stopping the Containers

When you're done, stop the running containers using:

```sh
docker-compose down
```

This will shut down and remove the containers without deleting the built images.

## Running the Project Without Docker

If you prefer running the project manually, follow these steps:

### 1. Clone the Repository

Run the following commands to download the project:

```sh
git clone <repository-url>
cd <repository-folder>
```

### 2. Backend Setup

#### a) Navigate to the Backend Directory

```sh
cd backend
```

#### b) Install Dependencies

```sh
yarn install
```

This installs all necessary Node.js dependencies for the backend.

#### c) Set Up Environment Variables

If the backend requires environment variables, create a `.env` file inside the backend folder and configure the required values.

#### d) Start the Backend Server

```sh
yarn start:dev
```

This starts the backend server in development mode. The API will be available at http://localhost:3001.

### 3. Frontend Setup

#### a) Navigate to the Frontend Directory

```sh
cd frontend
```

#### b) Install Dependencies

```sh
yarn install
```

This installs all necessary dependencies for the frontend.

#### c) Set Up Environment Variables

If the frontend requires environment variables, create a `.env` file inside the frontend folder and configure them accordingly.

#### d) Start the Frontend Server

```sh
yarn dev
```

This will start the frontend development server, which will be available at http://localhost:3000.

## Troubleshooting

If you encounter issues, consider the following:

### Port Conflicts

If ports 3000 or 3001 are already in use, change them in:

- The docker-compose.yml file (for Docker users).
- The .env files or the startup scripts (for manual execution).

### Missing Dependencies

If you encounter dependency-related errors:

```sh
yarn install
```

Run this command in the respective directories (backend or frontend).

### Docker Issues

If the containers are failing to build or start, try:

```sh
docker system prune -a
```

This removes unused images and containers. Then, rebuild the project with:

```sh
docker-compose up --build
```

### Checking Logs

To view logs and debug issues in Docker:

```bash
docker-compose logs -f
```

For additional assistance, refer to the official documentation of Node.js, Yarn, and Docker.

Enjoy developing! 🚀
