# estimation

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

## Fake backend server setup

### Install JSON Server

```
npm install -g json-server
```

### Start JSON Server

By default port 3001 is used. 
You can change this setting in /src/appConfig.js

```
json-server -p 3001 -w db.json
```

## Roles

There several user roles within a system: 

- architect: can create change-requests
- manager: can manage tasks and subtasks, assign estimators
- estimator: can estimate subtasks
- admin: can do anything
- user: default role

## Predefined user accounts

You can use following predefined user accounts

### Architect

Login: architect
Password: architect

### Manager

Login: 
Password: 

### Admin

Login: aleksey
Password: aleksey

### Estimators

Login: estimator
Password: estimator

Login: estimator2 
Password: estimator2
