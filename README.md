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