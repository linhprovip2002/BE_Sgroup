### S-Group Back End
- Manage employee in S-Group
- Using express, mysql,jwt,crypto,joi,swagger-ui-express,swagger-jsdoc,
## Module management user 
- 1: Config database connection với Knex.js
- 2: Update table Users với column CreatedAt và CreatedBy
- 3: Tạo API create User (sử dụng Middleware để lấy field CreateBy - sẽ được đào tạo kĩ hơn ở phần Authorization)
- 4: Tạo API update và delete
- 5: Tạo API get users với pagination và search
# Endpoint API
## 1. User
### 1.1. get all user with pagination
- Method: GET
- Endpoint: /api/v2/users?page=&page
### 1.2. get user by id
- Method: GET
- Endpoint: /api/v2/users/:id
### 1.3. update user by id
- Method: PUT
- Endpoint: /api/v2/users/:id
- Body: 
```
{
    "name": "string",
    "age": int,
    "gender": Boolean,
    "email": "string"
}
```
### 1.4. delete user by id
- Method: DELETE
- Endpoint: /api/v2/users/:id
## 2. Auth
### 2.1. login
- Method: POST
- Endpoint: /api/v2/auth/login
- Body: 
```
{
    "username": "string",
    "password": "string"
}
```
### 2.2. register
- Method: POST
- Endpoint: /api/v2/auth/register
- Body: 
```
{
    "username": "string",
    "password": "string"
}
```
### 2.3. forgot password
- Method: POST
- Endpoint: /api/v2/auth/forgot-password
- Body: 
```
{
    "email": "string",
}
```
### 2.4. reset password
- Method: POST
- Endpoint: /api/v2/auth/reset-password/:token
- Body: 
```
{
    "password": "string",
}
```


