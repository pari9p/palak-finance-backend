# Finance Data Processing and Access Control Backend

This is a backend application for processing and managing financial data with role-based access control. It provides a RESTful API for user authentication, managing user data, and handling financial transactions.

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** SQLite
- **ORM:** Prisma
- **Language:** TypeScript
- **Authentication:** JSON Web Tokens (JWT)
- **Validation:** Zod

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd palak
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```
4.  Set up the environment variables by creating a `.env` file in the root of the project and adding the following:
    ```
    DATABASE_URL="file:./dev.db"
    JWT_SECRET="your-secret-key"
    ```
5.  Run the database migrations:
    ```bash
    npx prisma migrate dev
    ```

### Running the Application

To start the development server, run:

```bash
npm run dev
```

The server will start on `http://localhost:3000`.

## API Endpoints

The following are the main API endpoints:

-   `POST /api/auth/register`: Register a new user.
-   `POST /api/auth/login`: Log in an existing user.
-   `GET /api/users`: Get all users (Admin only).
-   `POST /api/users`: Create a new user (Admin only).
-   `GET /api/users/:id`: Get a user by ID (Admin only).
-   `PUT /api/users/:id`: Update a user by ID (Admin only).
-   `DELETE /api/users/:id`: Delete a user by ID (Admin only).
-   `POST /api/financial-records`: Create a new transaction.
-   `GET /api/financial-records`: Get all transactions for the logged-in user. Supports filtering by `type`, `category`, `startDate`, and `endDate`.
-   `GET /api/financial-records/all`: Get all transactions (Admin only).
-   `GET /api/financial-records/:id`: Get a transaction by ID.
-   `PUT /api/financial-records/:id`: Update a transaction by ID.
-   `DELETE /api/financial-records/:id`: Delete a transaction by ID.
-   `GET /api/dashboard/summary`: Get a summary of transactions for the logged-in user.
-   `GET /api/dashboard/summary/all`: Get a summary of all transactions (Admin only).
