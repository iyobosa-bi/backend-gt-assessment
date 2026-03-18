


## Explanations


###  1. How I approached the implementation

I first chose Node.js with Express since it is the language I am most familiar with.

Carefully read through the task requirements to identify all necessary endpoints and business rules.

Created a MySQL database with tables and columns that match the endpoint requirements (tasks table with id, title, priority, status, assignedTo, assignedBy, createdAt).

Implemented the backend using a Model → Service → Controller → Route structure to ensure clear separation of concerns and maintainable code.

Validated inputs, handled errors, and enforced business rules (e.g., only assigner can update or delete, assignee can update status).

### 2. Why I structured the code this way

Model: Handles all database interactions (queries, inserts, updates). Keeps database logic separate.

Service: Contains business logic, validation, and authorization rules. Models should not contain these rules.

Controller: Handles incoming requests, calls services, and formats HTTP responses. Also contains try/catch for error handling.

Routes: Maps HTTP endpoints to the correct controller methods. Keeps route definitions clean and separate from logic.

This structure improves readability, maintainability, and scalability, which is important for interview evaluation.

### 3. Assumptions I made

Users are identified by userId passed in the request body (no authentication system implemented for this exercise).

Task priorities are limited to low, medium, and high.

A task can be unassigned by setting assignedTo to NULL, assuming the column allows NULL values.

All dates (createdAt) are stored in UTC for consistency.

### 4. What I would improve if given more time

Implement a proper authentication and authorization system (e.g., JWT) instead of passing userId in the request body.

Implement pagination and filtering for GET /tasks to handle large datasets.

Add input validation middleware using a library like Joi or express-validator.

Include logging for errors and activity for better monitoring.

### 5. Tools or AI assistance used

Built mainly using Node.js, Express, and MySQL.

VS Code for development.

Used Postman for testing endpoints.

Consulted AI (ChatGPT) for guidance on structure, error handling, and endpoint implementation patterns.



