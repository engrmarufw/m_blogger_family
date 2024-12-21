# M_Blogger_Family ✨

Welcome to **M_Blogger_Family**, a robust and secure blogging platform. This project enables users to write, update, and delete their blogs, with an admin panel for user and blog management. The platform emphasizes secure authentication, role-based access control, and a public API for blog discovery with advanced search, sort, and filter features.

---

## 🔗 Live Application

Access the live application here: [M_Blogger_Family](https://m-blogger-family.vercel.app/)

---

## 🔐 Admin Login Credentials

Use the following credentials to test the admin features:

- **Email**: `admin@gmail.com`
- **Password**: `87654321`

---

## 🔄 Project Features

### ✅ Authentication & Authorization

- **User Registration and Login**: Secure authentication with JWT tokens.
- **Role-Based Access Control**: Separate roles for Admin and User with distinct permissions.

### 🔒 User Features

- Register and log in to access the platform.
- Create, update, and delete their blogs.
- View blogs with public API support.

### 🔓 Admin Features

- Block or unblock users.
- Delete any blog.

### 🔍 Blog API

- Public access for viewing blogs with:
  - **Search**: Filter blogs by title or content.
  - **Sort**: Sort blogs by fields such as `createdAt` or `title`.
  - **Filter**: Filter blogs by specific authors.

### 🌟 Additional Features

- Detailed error handling for a better user experience.
- Validation of all input data using Zod schemas.

---

## 🛠️ Technologies Used

- **Programming Language**: TypeScript
- **Runtime Environment**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Hosting**: Vercel

---

## 🔧 Installation and Setup

Follow these steps to set up the project locally:

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or later)
- MongoDB (local or cloud instance)

### Steps

1. 🔄 Clone the Repository:

   ```bash
   git clone https://github.com/engrmarufw/m_blogger_family.git
   ```

2. 📍 Navigate to the Project Directory:

   ```bash
   cd m_blogger_family
   ```

3. 🔄 Install Dependencies:

   ```bash
   npm install
   ```

4. 🔐 Set Up Environment Variables:
   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=5000
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ```

5. 🌐 Start the Server:

   ```bash
   npm run start
   ```

6. 🎮 Access the Application:
   Open your browser and visit `http://localhost:5000`.

---

## 📊 API Endpoints

### 🔐 Authentication

- **Register User**: `POST /api/auth/register`
- **Login User**: `POST /api/auth/login`

### 📂 Blog Management

- **Create Blog**: `POST /api/blogs`
- **Update Blog**: `PATCH /api/blogs/:id`
- **Delete Blog**: `DELETE /api/blogs/:id`
- **Get Blogs**: `GET /api/blogs`

### 🔒 Admin Actions

- **Block User**: `PATCH /api/admin/users/:userId/block`
- **Unblock User**: `PATCH /api/admin/users/:userId/unblock`
- **Delete Blog**: `DELETE /api/admin/blogs/:id`

---

## 🔄 Demonstration

### 🎥 Video Walkthrough

Watch the project walkthrough here: [Project Demo](https://youtu.be/f3P5WdyArig)

### 🔗 GitHub Repository

Explore the source code: [GitHub Repository](https://github.com/engrmarufw/m_blogger_family)

---

## ⚠️ Error Handling

All API responses follow a structured format to ensure consistent and clear communication of errors:

```json
{
  "success": false,
  "message": "Error message describing the issue",
  "statusCode": 400,
  "error": { "details": "Additional error details, if applicable" },
  "stack": "error stack trace, if available"
}
```

---

## 📊 Contribution

Feel free to fork the repository and submit pull requests for any improvements or new features.

---
