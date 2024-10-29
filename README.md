## Description

[Code](https://github.com/nestjs/nest) prueba tecnica tttNetworking

## Project setup

```bash
$ npm install

# start database tables
$ npm run typeorm migration:run
```


## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## ENVIROMENT VARIABLES

the file .env.example is a mock file with the variables that should have the .env file so the project can run, there will be the DB credentials and the desired port for the app

## API DOCUMENTATION

you can see the swagger page of the project, if run in local the url most probably is [http://localhost:3000/api/](http://localhost:3000/api/), the port can vary depending in the configuration of the .env file