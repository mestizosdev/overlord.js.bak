# Overlord.js
Administrator for Users, modules and access

## Software
* Node 18
* PostgreSQL 14 or above

## PnpM
Fast, disk space efficient package manager
```
curl -fsSL https://get.pnpm.io/install.sh | sh -
```
## Create project
```
npm init
```
## Express
Fast, unopinionated, minimalist web framework for Node.js.
```
pnpm add express 
```
## Dotenv 
Loads environment variables from .env for nodejs projects. 
```
pnpm add dotenv
```
## Nodemon 
Monitor for any changes in your node.js application and automatically restart the server
```
pnpm add -D nodemon
```
## Morgan 
HTTP request logger middleware for node.js 
```
pnpm add -D morgan
```
## Run
```
pnpm start
```
## Test with httpie
https://httpie.io/
```
http localhost:5000
```
## PostgreSQL
```
sudo su - postgres
```
```
psql
```
## Create database
```
create database overlord_js;
```
## Create user database
```
create user overlord_js with encrypted password 'o';
```
## Grant privileges
```
grant all privileges on database overlord_js to overlord_js;
```
## Show path of the pg_hba.conf file
```
show hba_file;
```
## Add the next line in pg_hba.conf file
```
local   all             overlord_js                             trust
```
## Restart postgresql service
```
sudo systemctl restart postgresql
```
## Access to overlord_js database with overlord_js user from psql 
```
psql -d overlord_js -U overlord_js -W
```

## Install all dependencies of the project
```
pnpm i
```

