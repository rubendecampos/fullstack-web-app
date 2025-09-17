# Fullstack Web App

A simple and complete full-stack web application. Users can create posts, react to other posts, comment, like, etc.  
Built with a separate **frontend** and **backend**, requiring a MySQL database (local or cloud).


## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Prerequisites](#prerequisites)  
- [Getting Started / Installation](#getting-started--installation)  
- [Configuration](#configuration)  
- [Running the App](#running-the-app)  
- [Contributing](#contributing)  


## Features

- Create / Read / Update / Delete posts  
- Commenting on posts  
- Liking / Reacting to posts  
- Authentication (login/signup)  
- Clean UI and responsive design  


## Tech Stack

| Layer        | Technology            |
|--------------|-----------------------|
| Frontend     | JavaScript, React     |
| Backend      | Node.js, Express      |
| Database     | MySQL                 |
| Others       | sequelize, axios      |


## Prerequisites

Before you begin, ensure you have:

- Node.js (version 20 or higher)  
- npm  
- MySQL installed locally (or access to a cloud MySQL instance)  
- Git

## Getting Started / Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/rubendecampos/fullstack-web-app.git
   cd fullstack-web-app

2. **Install dependencies**

- Backend:
  ```bash
  cd server
  npm install

- Frontend:
  ```bash
  cd ../client
  npm install

3. **Database setup**

- Create a MySQL database locally (for example: your_db_name)
- If you prefer a cloud MySQL instance, that works too — just update the configuration accordingly (see [Configuration](#configuration))


## Configuration

- If you are using a **cloud MySQL** instance, update the `config.json` file, in the `server/config/` directory, to specify the connection to your SQL server:

  ```json
  {
    "development": {
      "username": "your_db_username",
      "password": "your_db_password",
      "database": "your_db_name",
      "host": "your_host_address",
      "dialect": "mysql"
    }
  }


- Also check ports for frontend and backend, if any (e.g., backend may run on port 5000, frontend on port 3000 or so).

## Running the App

Open two terminals (or use tools like tmux / concurrently) — one for the server, one for the client.

- Start Backend
  
  ```bash
  cd server
  npm start   # run the server

- Start Frontend

  ```bash
  cd client
  npm start   # run the command react-scripts start

Once both are running:

- The frontend will be accessible in your browser (often http://localhost:3000)
- The backend API will be accessible on its port (e.g. http://localhost:3001)

## Contributing

Feel free to submit issues or pull requests. If you plan on adding features:

1. Fork the repo
2. Make your changes in a feature branch
3. Test thoroughly
4. Submit a Pull Request with detailed description of what you changed and why