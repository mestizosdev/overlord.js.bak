# Overlord.js
Create documentation for routes with swagger

## Add Swagger UI Express 
Adds middleware to your express app to serve the Swagger UI bound to your Swagger document. This acts as living documentation for your API hosted from within your app.
```
pnpm add -D swagger-ui-express
```
## Add swagger-autogen
This module performs the automatic construction of the Swagger documentation. The module can identify the endpoints and automatically capture methods such as to get, post, put, and so on. The module can also identify the paths, routes, middlewares, response status code, parameters in the path, header, query and body.
```
pnpm add -D swagger-autogen
```
