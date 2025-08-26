# User Management API

A simple Node.js Express application that allows users to save and retrieve user information (name and phone) via REST API endpoints.

## Features

- **POST /users** - Add a new user with name and phone
- **GET /users** - Retrieve all saved users
- Data persistence using JSON file storage
- Input validation
- Error handling

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

The server will start on port 3000 (or the port specified in the PORT environment variable).

## API Endpoints

### GET /
Returns API documentation and available endpoints.

### POST /users
Add a new user to the system.

**Request Body:**
```json
{
  "name": "John Doe",
  "phone": "123-456-7890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User added successfully",
  "data": {
    "id": "1703123456789",
    "name": "John Doe",
    "phone": "123-456-7890",
    "createdAt": "2023-12-21T10:30:45.123Z"
  }
}
```

### GET /users
Retrieve all saved users.

**Response:**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": "1703123456789",
      "name": "John Doe",
      "phone": "123-456-7890",
      "createdAt": "2023-12-21T10:30:45.123Z"
    }
  ]
}
```

## Data Storage

User data is stored in a `data.json` file in the project root. The file structure is:

```json
{
  "users": [
    {
      "id": "1703123456789",
      "name": "John Doe",
      "phone": "123-456-7890",
      "createdAt": "2023-12-21T10:30:45.123Z"
    }
  ]
}
```

## Testing the API

You can test the API using curl, Postman, or any HTTP client:

### Add a user:
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "phone": "123-456-7890"}'
```

### Get all users:
```bash
curl http://localhost:3000/users
```

## Error Handling

The API includes comprehensive error handling for:
- Missing required fields
- File system errors
- JSON parsing errors
- General server errors

All errors return appropriate HTTP status codes and error messages.
