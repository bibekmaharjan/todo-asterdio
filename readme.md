# To-Do List Application

## Description
This is a full-stack To-Do List application built using React for the front-end and Node.js with Express.js for the back-end. The application allows users to create, read, update, and delete to-do items. It also features user authentication using JWT.

![App Screenshot](https://ibb.co/BtyW6Ys)

## Features
- User Signup/Signin
- Add, edit, delete to-do items
- Mark to-do items as completed

## Technologies Used
- React
- Node.js
- Express.js
- SQLite
- JWT for authentication

## Project Structure
The project is structured into two main parts: the front-end and the back-end.

### Front-End (Frontend)
- **components/**: Contains React components for various parts of the application.
  - **Auth/**: Contains components related to authentication (Signin and Signup).
  - **Todo/**: Contains components related to the to-do list functionality (TodoForm, TodoItem, and TodoList).
- **context/**: Contains the AuthContext.js file defining the authentication context for the application.
- **App.js**: The main component of the application, including routing and authentication.
- **index.js**: Entry point of the React application.
- **styles.css**: Stylesheet for the application.

### Back-End (Backend)
- **config/**: Contains the database configuration file (db.js).
- **controllers/**: Contains controllers for handling authentication (authController.js) and to-do operations (todoController.js).
- **middlewares/**: Contains middleware for authenticating requests (authMiddleware.js).
- **models/**: Contains the database models for User (User.js) and Todo (Todo.js).
- **routes/**: Contains routes for authentication (authRoutes.js) and to-do operations (todoRoutes.js).
- **index.js**: Entry point of the Node.js application.

## Setup Instructions

### Prerequisites
- Node.js installed
- npm installed

### Project Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>

2. Change the directory to the frontend or backend folder
   ```bash
   cd /frontend or /backend

3. Install required dependencies
   ```bash
   npm install

4. Go to the required part of the application and start them using following command:
    ```bash
    npm start or npm start dev

### Things I would do if I had more time

- Use Prettier
- Use Typescript 
- Use SASS styling
- Form Validations
- Modulize the styling
- Better Error Handling
- Add Debounce to the requests
- Breakind down commits and git push
- Use more strict linting and lint-staged
- Containerize the application using docker
- Use Icons instead of Texts for some buttons
- Modulize the components, services and hooks more
- Improve validation in backend for post requests as even empty string can be used for sign up or sign in