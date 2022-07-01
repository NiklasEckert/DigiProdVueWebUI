# digiprodvuewebui

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

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Start frontend, backend and test database with docker:
The following folder structure is needed:
```
    BaseFolder/
        -> DigiprodVuewWebUI/
        -> DigiProd/
        -> docker-compose.yml
        -> startBackendDatabaseAndFrontend.sh
```
To archive this you need to copy the files ```docker-compole.yml``` and ```startBackendDatabaseAndFrontend.sh``` from the folder **DigiprodVuewWebUI** into the **BaseFolder**
Make sure docker is running. 

#### macOS/Unix:
run from Basefolder with command: ```sh startBackendDatabaseAndFrontend.sh```