# Task Management API

A simple **RESTful API** built with **Node.js**, **Express**, and **MySQL** for creating, managing, and tracking tasks in a team or personal workflow.

## Features

- Create tasks with title, priority, assignee, and assigner
- View all tasks (with optional filters: assignedTo, status)
- Update task details (only by the person who assigned it)
- Update task status (only by the assignee)
- Unassign a task (only by assigner)
- Delete a task

## Tech Stack

- Node.js
- Express.js
- MySQL (database)

## Setup Instructions

Follow these steps to get the project running locally.

### 1. Clone the Repository

```bash
git clone https://github.com/iyobosa_bi/backend-gt-assessment.git
cd backend-gt-assessment/task-2-api-implementation
```

### 2.Install Dependencies
```bash
npm install
```

### 3.Environment Variables

Create a .env file in the root:

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=task_management_db
PORT=3000
```

### 4. Running the Project
```bash
 npm run dev
```

### 5. Running Api Endpoints
```bash
 https://localhost:3000/
```

### 6. JSON API Response
```bash
 {"success":true,"message":"Task Created Successfully":"data":""}
```


based on various responses and individual endpoints, craft a readme of sample requesta nd response

### 6. JSON API Response Endpoints
```bash
 1. Create Task

POST /tasks

Request Body:

{
  "title": "Complete assessment",
  "priority": "high",
  "assignedTo": 2,
  "assignedBy": 1
}

Success Response:

{
  "success": true,
  "message": "Task Created Successfully",
  "data": {
    "id": 1,
    "title": "Complete assessment",
    "priority": "high",
    "status": "pending",
    "assignedTo": 2,
    "assignedBy": 1,
    "createdAt": "2026-03-09T12:00:00Z"
  }
}

Error Response (e.g., missing field):

{
  "success": false,
  "error": "Title is required"
}
2. Get All Tasks

GET /tasks

Query Parameters (optional):

assignedTo → filter by assignee ID

status → filter by task status (pending, in-progress, completed)

Success Response:

{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Complete assessment",
      "priority": "high",
      "status": "pending",
      "assignedTo": 2,
      "assignedBy": 1,
      "createdAt": "2026-03-09T12:00:00Z"
    }
  ]
}
3. Update Task Details

PATCH /tasks/:id
Only the assigner can update title or priority.

Request Body:

{
  "title": "Updated assessment",
  "priority": "medium",
  "assignedBy": 1
}

Success Response:

{
  "success": true,
  "data": {
    "id": 1,
    "title": "Updated assessment",
    "priority": "medium",
    "status": "pending",
    "assignedTo": 2,
    "assignedBy": 1,
    "createdAt": "2026-03-09T12:00:00Z"
  }
}

Error Response (not assigner):

{
  "success": false,
  "error": "You are not allowed to update this task"
}
4. Update Task Status

PATCH /tasks/:id/status
Only the assignee can update status.

Request Body:

{
  "status": "in-progress",
  "userId": 2
}

Success Response:

{
  "success": true,
  "data": {
    "id": 1,
    "title": "Updated assessment",
    "priority": "medium",
    "status": "in-progress",
    "assignedTo": 2,
    "assignedBy": 1,
    "createdAt": "2026-03-09T12:00:00Z"
  }
}

Error Response (wrong user):

{
  "success": false,
  "error": "You are not allowed to update this task status"
}
5. Unassign Task

PATCH /tasks/:id/unassign
Only the assigner can unassign a task.

Request Body:

{
  "userId": 1
}

Success Response:

{
  "success": true,
  "message": "Task unassigned successfully"
}

Error Response (not assigner):

{
  "success": false,
  "error": "Only the assigner can unassign this task"
}
6. Delete Task

DELETE /tasks/:id
Only the assigner can delete a task.

Request Body:

{
  "userId": 1
}

Success Response:

{
  "success": true,
  "message": "Task deleted successfully"
}

Error Response (not assigner):

{
  "success": false,
  "error": "Only the assigner can delete this task"
}
```