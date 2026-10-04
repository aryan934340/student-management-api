# Student Management REST API

Lab Assignment 2 – Web Dev III (Node.js & Express), Unit 2.

A REST API built with Express.js that performs CRUD operations on student records stored in an in-memory array (no database).

## Project Structure

```
student-management-api/
├── app.js                  # Server setup, middleware, error handling
├── routes/
│   └── studentRoutes.js    # Student CRUD routes (Express Router)
├── middleware/
│   └── logger.js           # Custom logger (method, URL, status, time)
├── data/
│   └── students.js         # In-memory student data
└── package.json
```

## Setup

```bash
npm install
npm start
```

Server runs at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint         | Description          | Success | Errors   |
|--------|------------------|----------------------|---------|----------|
| GET    | /students        | Get all students     | 200     | –        |
| GET    | /students/:id    | Get student by ID    | 200     | 400, 404 |
| POST   | /students        | Create a student     | 201     | 400      |
| PUT    | /students/:id    | Update a student     | 200     | 400, 404 |
| DELETE | /students/:id    | Delete a student     | 200     | 400, 404 |

### Sample request body (POST / PUT)

```json
{
  "name": "Kesham",
  "course": "BTech",
  "age": 20
}
```

`name` and `course` are required for POST. PUT accepts any subset of fields.

## Status Codes

- **200** – Success
- **201** – Student created
- **400** – Invalid input / invalid ID / malformed JSON
- **404** – Student or route not found
- **500** – Internal server error

## Testing

All endpoints were tested in Postman. Import `postman_collection.json` to run them.
