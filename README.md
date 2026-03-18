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
DB_PASSWORD=password
DB_NAME=taskdb
PORT=3000
```


### 4. Running the Project
```bash
 npm run dev
```


