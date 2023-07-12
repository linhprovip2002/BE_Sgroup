### S-Group Back End
- Fun fact: I'm lazy to refactor
- Manage employee in S-Group
- Using express, mysql,jwt,crypto,joi,swagger-ui-express,swagger-jsdoc,redis,mailService
## Module management user 
- 1: Config database connection với Knex.js
- 2: Update table Users với column CreatedAt và CreatedBy
- 3: Tạo API create User (sử dụng Middleware để lấy field CreateBy - sẽ được đào tạo kĩ hơn ở phần Authorization)
- 4: Tạo API update và delete
- 5: Tạo API get users với pagination và search
## Module authentication
- 1: JWT to authentication
- 2: Forgot password(User mail Service)
## Module vote feature 
- 1: Create,Read,Update,Delete Vote
- 2: Vote the options or delete
## Module authorization 
- 1: RBAC
## Performance
- 1: Redis
# How to start project
 import file S-group.postman_collection.json in postman
 config file env, refer to the .envexample
 