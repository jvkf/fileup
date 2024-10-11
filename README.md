# FileUp

FileUp is a back-end web application designed to help users manage their files efficiently. FileUp offers secure authentication, file uploads and folder management to enhance your file organization experience.

## 📋 Table of Contents

- [Features](#-features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [What I Learned](#what-i-learned)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **User Authentication**

  - Sign up with email and password
  - Secure login and logout
  - Edit account details (name and password)
  - Delete user account

- **Folder Management**

  - Create, view, edit, and delete folders
  - Organize files within folders

- **File Management**

  - Upload files with size restrictions (maximum 5MB)
  - Store files on Cloudinary for reliable hosting
  - Download files directly from the browser

- **Responsive UI**

  - Clean and modern design using PicoCSS
  - Intuitive navigation with EJS templates

- **Security**
  - Implemented Helmet for setting secure HTTP headers
  - Managed sessions securely with Prisma Session Store

## 🛠️ Technologies Used

- [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/) - Server-side framework
- [TypeScript](https://www.typescriptlang.org/) - For type-safe code
- [Passport.js](http://www.passportjs.org/) - Authentication middleware
- [Prisma](https://www.prisma.io/) - ORM for database interactions
- [PostgreSQL](https://www.postgresql.org/) - Relational database
- [Multer](https://github.com/expressjs/multer) - Middleware for handling file uploads
- [Cloudinary](https://cloudinary.com/) - Cloud-based image and file management
- [Helmet](https://helmetjs.github.io/) - Security middleware for Express
- [Zod](https://zod.dev/) - Type-first schema validation
- [EJS](https://ejs.co/) - Templating engine for dynamic HTML
- [PicoCSS](https://picocss.com/) - Minimal CSS framework for styling
- Vanilla JavaScript - For client-side interactions and form handling

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/p1padev/fileup.git
   cd fileup
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add the following:

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/fileup
   SESSION_SECRET=your_session_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Run database migrations**

   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**

   ```bash
   npm run dev
   # or using pnpm
   pnpm run dev
   ```

6. **Access the application**

   Open your browser and navigate to `http://localhost:3000`.

## 💻 Usage

- **Sign Up**

  - Navigate to the sign-up page and create a new account using your email and a secure password.

- **Login**

  - Use your credentials to log in to the application.

- **Manage Folders**

  - Create new folders to organize your files.
  - Edit or delete existing folders as needed.

- **Upload Files**

  - Open a folder and upload files (up to 5MB) directly.
  - Download files whenever necessary.

- **Edit Account**
  - Update your name or change your password from the account settings page.
  - Delete your account if you no longer wish to use the application.

## 📂 Project Structure

```
fileup/
├── src/
│   ├── controllers/
│   ├── config/
│   ├── middleware/
│   ├── routes/
│   ├── views/
│   ├── utils/
│   ├── app.ts
│   └── server.ts
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── public/
│   └── styles.css
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

- **controllers/**: Handles the logic for different routes.
- **config/**: Configuration files for Passport, Prisma, Cloudinary, and session management.
- **middleware/**: Custom middleware for error handling, authentication, and user storage.
- **routes/**: Defines application routes.
- **views/**: EJS templates for rendering HTML pages.
- **utils/**: Utility functions for error handling and other common tasks.
- **prisma/**: Contains the Prisma schema and migration files.
- **public/**: Static assets like CSS and images.

## 📚 What I Learned

Working on FileUp provided me with extensive experience and knowledge in several key areas:

- **Full-Stack Development with TypeScript and Express.js**

  - Leveraged TypeScript's type safety to build robust backend services.
  - Structured an Express.js application with clear separation of concerns.

- **Authentication with Passport.js**

  - Implemented secure user authentication using the Passport.js library.
  - Managed user sessions effectively with `express-session` and Prisma Session Store.

- **Database Management with Prisma and PostgreSQL**

  - Designed relational database schemas and managed migrations with Prisma.
  - Performed complex database operations using Prisma's ORM capabilities.

- **File Handling and Cloud Integration**

  - Handled file uploads securely with Multer.
  - Integrated with Cloudinary for cloud-based file storage and management.

- **Form Validation with Zod**

  - Ensured data integrity and security by validating user inputs using Zod schemas.

- **Security Best Practices**

  - Enhanced application security by setting appropriate HTTP headers with Helmet.
  - Managed sensitive data and protected against common web vulnerabilities.

- **Frontend Development with EJS and PicoCSS**

  - Created dynamic and responsive user interfaces using EJS templates.
  - Styled the application with PicoCSS to achieve a clean and modern look.

- **Error Handling and User Feedback**
  - Developed comprehensive error handling mechanisms for both API and rendered responses.
  - Provided meaningful feedback to users through client-side and server-side validations.

---

Happy file organizing with **FileUp**! 🚀
