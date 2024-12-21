# Blogging Platform Backend

A robust backend for a blogging platform where users can create, update, and delete blogs while managing access with role-based authentication. The system includes a public API for blog viewing with advanced filtering, sorting, and search functionalities.

## Technologies Used

- **Programming Language:** TypeScript
- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JSON Web Tokens (JWT)
- **Validation:** Zod

## Features

### User Roles
- **Admin:**
  - Manually created in the database.
  - Can delete any blog.
  - Can block users.
  - Cannot update blogs.
- **User:**
  - Can register and log in.
  - Can create, update, and delete their own blogs.

### Authentication & Authorization
- **Authentication:** Secure user login with JWT tokens.
- **Authorization:** Role-based access control for Admin and User.

### Blog Management
- **Public API for blogs:** Search, sort, and filter blogs.
- **CRUD Operations:** Users can manage their own blogs.

### Error Handling
Consistent error responses for validation, authentication, and internal server errors.

## API Endpoints

### 1. Authentication
#### 1.1 Register User
- **Endpoint:** `POST /api/auth/register`
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response:** Success: `201`, Failure: `400`

#### 1.2 Login User
- **Endpoint:** `POST /api/auth/login`
- **Description:** Logs in a user and returns a JWT token.
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```
- **Response:** Success: `200`, Failure: `401`

### 2. Blog Management
#### 2.1 Create Blog
- **Endpoint:** `POST /api/blogs`
- **Description:** Creates a blog for a logged-in user.
- **Request Header:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "title": "My First Blog",
    "content": "This is the content of my blog."
  }
  ```
- **Response:** Success: `201`

#### 2.2 Update Blog
- **Endpoint:** `PATCH /api/blogs/:id`
- **Description:** Updates a user-owned blog.
- **Request Header:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "title": "Updated Title",
    "content": "Updated content."
  }
  ```
- **Response:** Success: `200`

#### 2.3 Delete Blog
- **Endpoint:** `DELETE /api/blogs/:id`
- **Description:** Deletes a user-owned blog.
- **Request Header:** `Authorization: Bearer <token>`
- **Response:** Success: `200`

#### 2.4 Get All Blogs (Public)
- **Endpoint:** `GET /api/blogs`
- **Description:** Fetches blogs with search, sort, and filter capabilities.
- **Query Parameters:**
  - `search`: Filters by title or content.
  - `sortBy`: Sorts by a field (e.g., `createdAt`).
  - `sortOrder`: Sorting order (`asc` or `desc`).
  - `filter`: Filters by author ID.
- **Response:** Success: `200`

### 3. Admin Actions
#### 3.1 Block User
- **Endpoint:** `PATCH /api/admin/users/:userId/block`
- **Description:** Blocks a user by setting `isBlocked` to `true`.
- **Request Header:** `Authorization: Bearer <admin_token>`
- **Response:** Success: `200`

#### 3.2 Delete Blog
- **Endpoint:** `DELETE /api/admin/blogs/:id`
- **Description:** Deletes any blog by its ID.
- **Request Header:** `Authorization: Bearer <admin_token>`
- **Response:** Success: `200`

## How to Run the Project Locally

### Prerequisites
- Node.js and npm installed.
- MongoDB running locally or on a cloud service.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/imadnanhassan/blog-backend
   cd blogging-platform-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/blogging-platform
   JWT_SECRET=your_jwt_secret
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Access the API at `http://localhost:5000`.

### Available Scripts
- `npm run dev`: Runs the server in development mode with hot reloading.
- `npm start`: Runs the server in production mode.

## Future Enhancements
- Add pagination to the blog listing API.
- Implement rate limiting for better security.
- Add support for file uploads in blogs.

---