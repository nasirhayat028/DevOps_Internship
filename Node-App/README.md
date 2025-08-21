# Notes App v1

A simple notes application built with Node.js and Express.

## Features

- 📝 Add notes with title and description
- 📋 View all saved notes
- 💾 In-memory storage (notes are lost when server restarts)
- 🎨 Simple, clean HTML interface

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the App

### Development mode (with auto-restart):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

### Using Docker:

#### Build and run with Docker:
```bash
# Build the Docker image
docker build -t notes-app-v1 .

# Run the container
docker run -p 3000:3000 notes-app-v1
```

#### Using Docker Compose (recommended):
```bash
# Build and start the app
docker-compose up -d

# Stop the app
docker-compose down

# View logs
docker-compose logs -f
```

The app will be available at: http://localhost:3000

## Usage

1. **Homepage** (`/`): Add new notes with title and description
2. **View Notes** (`/notes`): See all saved notes
3. **Navigation**: Use the links to move between pages

## Routes

- `GET /` - Homepage with note creation form
- `POST /add-note` - Add a new note
- `GET /notes` - View all notes

## Note Structure

Each note contains:
- **ID**: Unique identifier (timestamp)
- **Title**: Note title
- **Description**: Note content
- **Created At**: Timestamp when note was created

## Technologies Used

- Node.js
- Express.js
- HTML/CSS (inline styles)
- JavaScript (ES6+)
