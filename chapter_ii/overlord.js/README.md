# Overlord.js
Administrator for Users, modules and access

## Create folder controllers and create file
```
mkdir src/controllers
```
```
touch src/controllers/version.js
```
## Create folder routes and create file
```
mkdir src/routes
```
```
touch src/routes/version.js
```
## Create model user
```
sequelize model:generate --name User --attributes \
username:string,\
password:string,\
email:string,\
status:boolean \
--underscored
```
## Migrate
```
sequelize db:migrate
```
```
sequelize db:migrate:undo
```
## Create seeder
```
sequelize migration:create --name users
```
## Seed
```
sequelize db:seed:all
```
```
sequelize db:seed:undo:all
```
## Create folder utils
```
mkdir src/utils
```
## Create file password.js
```
touch src/utils/password.js
```
## bcrypt
A library to help you hash passwords.
```
pnpm add bcrypt
```

