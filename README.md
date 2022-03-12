# React-Redux-Hooks-NodeJs-Jwt-Auth-MongoDb

  backend => npm install 
  - node server.js  or  nodemon server.js or npm start

  frontend => npm install
  - npm start


## Structure

   - There are three user roles by default, User, Moderator and Admin
   
   - If role=["ROLE_USER"] => Only user content can be accessed
   - If role=["ROLE_MODERATOR"] => Only moderator content can be accessed
   - If role=["ROLE_ADMIN"] => Only admin content can be accessed
   - If role=["ROLE_USER","ROLE_MODERATOR"] => Content of both user and moderator can be accessed
   - If role=["ROLE_USER","ROLE_ADMIN"] => Content of both user and admin can be accessed
