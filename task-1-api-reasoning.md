# Task 1 

## 1. VALIDATION FOR ORDER CREATION

This is classified into 2: Data Validations and Business Logic Validations

### Data Validations

- All fields/parameters must be present in the POST request body
- userId parameter must be a positive integer
- items parameter must be an array
- items cannot be empty → items.length > 0
- The productId parameter inside the items Array must be of an integer data type
- The productId must be validated against the product collection to confirm that the productId passed is valid and exist
- The quantity parameter must of integer data type
- The quantity parameter must be greater than 0, else the creation of order will fail

### Business Logic Validation

- The user must be authenticated and logged in to created the order.
- The user status must be active
- The business can decide on specific roles and permissions to be assigned to users who can create the order
- The productId passed should be checked for availability and out of stock or have a certain restriction placed by the admin

## 2. POSSIBLE ERRORS

- Not a valid user or user not authenticated
- Unavailable product
- Invalid quantity passed such as 0 or a negative number
- Incorrect data types or data validation error
- Internal server error - Order creation service timeout
- Bad Request.

## 3. HTTP RESPONSES

- **Successful Order Creation** → **201**  
  It is 201 because by standardization 201 is allocated to a new created resource from a post request.

- **Invalid Request Body** → **400**  
  This is for a bad request. There might be missing fields in the post request json body and will not conform to what with the expected format

- **Product not found** → **404**  
  This is the standard code for a resource not found or does not exist.

- **Server error** → **500**  
  This is used for unexpected error due to network downtime, system upgrade, database restore operations or crash.
