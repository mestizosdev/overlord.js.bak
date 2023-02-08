# User
## GET version
```
http localhost:5000/overlord/v1/version
```
## GET user by id
```
http localhost:5000/overlord/v1/user/1
```
## POST user
Create with password
```
http POST http://localhost:5000/overlord/v1/user <<< '{ "username": "Jorge", "password": "12345678Jl", "email": "jl@g.com" }'
```
Create without password, the password is auto generate
```
http POST http://localhost:5000/overlord/v1/user <<< '{ "username": "Jorge", "email": "jl@g.com" }'
```
## PUT user
```
http PUT http://localhost:5000/overlord/v1/user/2 <<< '
{
	"username": "JORGELUIS",
	"password": "o0",
	"email": "j@g.com",
	"status": true
}'
```
## Delete user
```
http DELETE http://localhost:5000/overlord/v1/user/4
```
