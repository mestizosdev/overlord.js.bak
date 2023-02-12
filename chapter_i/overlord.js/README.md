# Overlord.js
Create project, install basic dependencies and connect with postgresql.

## Create project
```
npm init
```
## PnpM
Fast, disk space efficient package manager
https://pnpm.io/
```
curl -fsSL https://get.pnpm.io/install.sh | sh -
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
A simple yet powerful command-line HTTP and API testing client for the API era.
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
## Sequelize
Feature-rich ORM for modern Node.js and TypeScript.
```
pnpm add sequelize
```
## pg and pg-hstore
PostgreSQL client for node.js and a node package for serializing and deserializing JSON data to hstore format.
```
pnpm add pg pg-hstore
```
## sequelize-cli
The Sequelize CLI 
```
pnpm add -g sequelize-cli
```
## Create configuration file
This is a special configuration file. It lets you specify the following options that you would usually pass as arguments to CLI:
* env: The environment to run the command in
* config: The path to the config file
* migrations-path: The path to the migrations folder
* seeders-path: The path to the seeders folder
* models-path: The path to the models folder
```
touch .sequelizerc
```
## sequelize init
Get into src folder and run 
```
sequelize init
```
## standard
JavaScript Style Guide, with linter & automatic code fixer.
```
pnpm add -g standard
```


## Install all dependencies of the project
```
pnpm i
```

