# check-web-service

## What is this ?

Back-end for the check project, which is in charge of business logic and database access.

This project is developed using nodeJS with express and postgreSQL database with TypeORM. In addition to implementing the typescript functionalities.

All the configurations of the different tools used are inside the .env file. Take as reference the .env.example file to verify all the configurations.

## Development information

### Scripts

```
- dev = run server.
- build = generate dist folder with older js syntax.
- start = run the service in production.
```

'In case of testing on window systems, the start script must be prefixed with the SET value. Example: SET NODE_ENV={VALUE}'

### Environment Variable

The .env.example file contains the model of the environment variables used in this project.

## API documentation

The documentation can be found by clicking on the swagger link. In addition, inside the docs folder are the endpoints used in development.

```
 swagger: https://portfolio-web-service.herokuapp.com/api/doc
 postman: src/docs/postman/
```

## URL api server

```
https://jtg-portfolio-web-service.herokuapp.com/api
```

## Tools implements

```
- NodeJS
- Express
- Typescript
- TypeORM
- Swagger
- PostgreSQL
```
