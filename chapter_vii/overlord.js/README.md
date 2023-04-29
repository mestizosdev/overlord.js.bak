# Overlord.js
Add additional models for application

## Create Role model
```
sequelize model:generate --name Role --attributes \  
role:string,\
observation:string,\
status:boolean \
--underscored
```
## Create UserRole model
```
sequelize model:generate --name UserRole --attributes \
role:string,\
userId:integer \
--underscored
```
## Create Module model
```
sequelize model:generate --name Module --attributes \  
name:string,\
role:string,\
icon:string,\
link:string,\
observation:string,\
status:boolean,\
moduleId:integer \
--underscored   
```
## Create Access model
```
sequelize model:generate --name Access --attributes \
read:boolean,\
create:boolean,\
modify:boolean,\
delete:boolean,\
status:boolean,\
userId:integer,\
moduleId:integer \
--underscored
```
## Create module seeder
```
sequelize-cli seed:generate --name modules
```
## Create security module seeder
```
sequelize-cli seed:generate --name security
```

