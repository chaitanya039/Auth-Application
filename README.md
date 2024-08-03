

# User Authentication API

This is a Node.js and Express-based API for user authentication, profile management, and password management, utilizing MongoDB for data storage.

## Table of Contents

- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
  - [Register a New User](#register-a-new-user)
  - [Login a User](#login-a-user)
  - [Get User Profile](#get-user-profile)
  - [Update User Profile](#update-user-profile)
  - [Change User Password](#change-user-password)
  - [Delete User Profile](#delete-user-profile)
- [Error Handling](#error-handling)
- [Technologies Used](#technologies-used)

## Getting Started

### Postman Documentation

- [Documentation](https://documenter.getpostman.com/view/17192321/2sA3rwMu4R)
- [Live](https://auth-application-uy9m.onrender.com/)

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/chaitanya039/Auth-Application.git
    ```

2. Navigate into the project directory:

    ```bash
    cd your-repo-name
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file and add your environment variables:

    ```env
    MONGO_URI=<Your MongoDB connection string>
    JWT_SECRET=<Your JWT secret key>
    ```

5. Start the server:

    ```bash
    npm start
    ```

    The server will run on `http://localhost:3000`.

## API Endpoints

All API endpoints have a base URL of `https://auth-application-uy9m.onrender.com/api/v1/users`.

### Register a New User

- **Endpoint:** `POST /register`
- **Description:** Create a new user account.
- **Request:**
  - **Body Parameters:**
    - `firstName` (string, required)
    - `lastName` (string, required)
    - `email` (string, required)
    - `password` (string, required)
- **Response:**
  - **201 Created:** User registered successfully.
  - **400 Bad Request:** Validation error or user already exists.

### Login a User

- **Endpoint:** `POST /login`
- **Description:** Authenticate a user and return an HTTP-only cookie containing the JWT token.
- **Request:**
  - **Body Parameters:**
    - `email` (string, required)
    - `password` (string, required)
- **Response:**
  - **200 OK:** Returns a success message with an HTTP-only cookie.
  - **400 Bad Request:** Invalid email or password.

### Get User Profile

- **Endpoint:** `GET /profile`
- **Description:** Retrieve the profile of the authenticated user.
- **Request:** No additional parameters are required; authentication is handled via HTTP-only cookies.
- **Response:**
  - **200 OK:** Returns the user's profile information.
  - **401 Unauthorized:** User is not authenticated.

### Update User Profile

- **Endpoint:** `PATCH /profile`
- **Description:** Update the profile of the authenticated user.
- **Request:**
  - **Body Parameters:** (optional)
    - `firstName` (string)
    - `lastName` (string)
    - `email` (string)
    - `password` (string)
- **Response:**
  - **200 OK:** Returns the updated user's profile.
  - **400 Bad Request:** Validation error.

### Change User Password

- **Endpoint:** `POST /changepassword`
- **Description:** Change the password of the authenticated user.
- **Request:**
  - **Body Parameters:**
    - `oldPassword` (string, required)
    - `newPassword` (string, required)
- **Response:**
  - **200 OK:** Password changed successfully.
  - **400 Bad Request:** Current password is incorrect or validation error.

### Delete User Profile

- **Endpoint:** `DELETE /profile`
- **Description:** Delete the profile of the authenticated user.
- **Request:** No additional parameters are required; authentication is handled via HTTP-only cookies.
- **Response:**
  - **200 OK:** User profile deleted successfully.
  - **400 Bad Request:** Error during deletion.

## Error Handling

- **400 Bad Request:** Validation errors, missing fields, or invalid data.
- **401 Unauthorized:** Authentication errors or access issues.
- **404 Not Found:** Resource not found.

## Technologies Used

- Node.js
- Express
- MongoDB
- JSON Web Tokens (JWT) with HTTP-only cookies for secure session management
