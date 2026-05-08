# NotesApp - Backend

REST API backend for the NotesApp full stack project.

## Live API

[https://notesapp-backend-7t7r.onrender.com](https://notesapp-backend-7t7r.onrender.com)

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs
- Deployed on Render

## API Endpoints

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /signup | Register a new user |
| POST | /login | Login and get token |

### Notes (Protected — requires Bearer token)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /notes | Get all user notes |
| POST | /notes | Create a new note |
| GET | /notes/:id | Get a single note |
| PUT | /notes/:id | Update a note |
| DELETE | /notes/:id | Delete a note |

## Getting Started

```bash
git clone https://github.com/Kirushonthu/NotesApp-BackEnd.git
cd NotesApp-BackEnd
npm install
node NotesAppApi.js
```

MONGO_URI=your_mongodb_atlas_connection_string
PORT=3047

## Folder Structure

NotesApp-BackEnd/
├── controllers/
│   └── authcontroller.js
├── middleware/
│   └── auth.js
├── models/
│   ├── Note.js
│   └── user.js
├── routes/
│   └── authRoutes.js
├── .gitignore
├── NotesAppApi.js
├── package.json
└── README.md

## Frontend Repo

[https://github.com/Kirushonthu/NotesApp-FrontEnd](https://github.com/Kirushonthu/NotesApp-FrontEnd)

## Environment Variables

Create a `.env` file in the root:
