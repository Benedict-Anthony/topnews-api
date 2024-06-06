# User and Blog Management API

## Description

This API provides functionalities for managing users and blog posts. Users can be created, authenticated, and managed. Authenticated users can create, read, update, and delete blog posts. It is built with typscript and then compiled to regular javascript in production mode

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- TypeScript
- bcryptjs for password hashing

## Setup Process

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Benedict-Anthony/topnews-api.git
   cd topnews-api
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```sh
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=500
   ```

4. ## Scripts

- **Start the dev server**:

  ```sh
  npm run dev
  ```

  - **create a build folder**:

  ```sh
  npm run build

  ```

  - **Serve the build folder**:

  ```sh
  npm run start
  ```

## API Endpoints

### User Routes

- **POST /api/users/**: Create a new user
- **GET /api/users/**: Get user details (Requires authentication)
- **PUT /api/users/**: Update user information (Requires authentication)
- **DELETE /api/users/**: Delete a user (Requires authentication)
- **POST /api/users/login**: Authenticate a user and get a token

### Blog Routes

- **POST /api/blogs/**: Create a new blog post (Requires authentication)
- **GET /api/blogs/**: Get all blog posts
- **GET /api/blogs/:id**: Get a single blog post by ID
- **PUT /api/blogs/:id**: Update a blog post by ID (Requires authentication)
- **DELETE /api/blogs/:id**: Delete a blog post by ID (Requires authentication)

## Usage

### Creating a User

```sh
POST /users/
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

````

### Logging in a User

```sh
POST /users/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Getting User Details

```sh
GET /users/
Authorization: Bearer <your_token>
```

### Updating User Information

```sh
PUT /users/
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com"
}
```

### Deleting a User

```sh
DELETE /users/
Authorization: Bearer <your_token>
```

### Creating a Blog Post

```sh
POST /blogs/
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "title": "My First Blog",
  "content": "This is the content of my first blog post.",
  "author": "user_id"
}
```

### Getting All Blog Posts

```sh
GET /blogs/
```

### Getting a Blog Post by ID

```sh
GET /blogs/:id
```

### Updating a Blog Post by ID

```sh
PUT /blogs/:id
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "title": "Updated Blog Title",
  "content": "Updated content of the blog post."
}
```

### Deleting a Blog Post by ID

```sh
DELETE /blogs/:id
Authorization: Bearer <your_token>
```

## Project Structure

```sh
.
├── controllers
│   ├── userController.ts
│   └── blogController.ts
├── middleware
│   └── authMiddleware.ts
├── models
│   ├── userModel.ts
│   └── blogModel.ts
├── routes
│   ├── userRoutes.ts
│   └── blogRoutes.ts
├── types
│   ├── index.ts
├── .env
├── server.ts
├── package.json
└── README.md
```

### `models/user.ts`

Defines the User schema and includes password hashing middleware.

### `models/blog.ts`

Defines the Blog schema with references to the User model.

### `routes/userRoutes.ts`

Defines the routes for user-related endpoints and maps them to controller actions.

### `routes/blogRoutes.ts`

Defines the routes for blog-related endpoints and maps them to controller actions.

### `controllers/userController.ts`

Contains the logic for handling user-related requests such as creating, updating, retrieving, and deleting users, as well as user authentication.

### `controllers/blogController.ts`

Contains the logic for handling blog-related requests such as creating, updating, retrieving, and deleting blog posts.

### `middleware/authMiddleware.ts`

A middleware to protect routes that require authentication.
````
