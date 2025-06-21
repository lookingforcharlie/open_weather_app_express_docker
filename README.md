# Open Weather App Backend: Express/TypeScript

- Express: Backend JSON Restful API with CRUD endpoints
- Turso/Sqlite: Backend connects Turso to save user searching history
- MVC pattern: Routes → Controllers → Database

## Endpoints

[Base Url]()

| Path                            | Description                    |
| ------------------------------- | ------------------------------ |
| GET /                           | API Info                       |
| GET /api/search-history         | List all search history        |
| POST /api/search-history        | Add a new search history entry |
| DELETE /api/search-history/{id} | Delete search history by id    |

Test Endpoints using curl

```
curl http://localhost:4750/
```

```
curl -X POST http://localhost:4750/api/search-history -H "Content-Type: application/json" -d '{"cityName": "Shanghai"}'
```

```
curl http://localhost:4750/api/search-history
```

```
curl -X DELETE http://localhost:4750/api/search-history/1
```

## Project Stack

### Core Technologies

- **Express.js 5.1.0**: Web framework for Node.js
- **TypeScript 5.8.3**: Type-safe JavaScript
- **Turso (@libsql/client 0.15.8)**: SQLite database for search history storage
- **Drizzle ORM 0.44.2**: TypeScript ORM for database operations

### API & Data Management

- **Drizzle Kit 0.31.1**: Database migration and schema management
- **Zod 3.25.53**: Runtime type checking and validation
- **Drizzle Zod 0.8.2**: Integration between Drizzle and Zod
- **CORS**: Cross-Origin Resource Sharing support

## tsconfig.json and package.json

- using "module": "commonjs" and removed moduleResolution to use common js instead of esm
- Now, files compiled in dist folder are all common js code instead of esm
- If I use esm ("module": "NodeNext", "moduleResolution": "NodeNext"), and build by tsc, I need use file.js when import in my codebase, so common js might make sense
- I probably can use esm once I use "moduleResolution": "Bundler" for web apps

## [Drizzle Kit/Studio commands](https://orm.drizzle.team/docs/kit-overview)

```
npx drizzle-kit generate
npx drizzle-kit migrate
npx drizzle-kit push
npx drizzle-kit pull
npx drizzle-kit check
npx drizzle-kit up
npx drizzle-kit studio
```

## Docker

- [Dockerfile overview](https://docs.docker.com/build/concepts/dockerfile/?_gl=1*1vydeqr*_gcl_au*MjA2NDMwNzAwNy4xNzUwNTM0Nzk4*_ga*MTAzMjc0NTU2NC4xNzQ5NjUwMjEy*_ga_XJWPQMJYHQ*czE3NTA1MzQ3OTgkbzMkZzEkdDE3NTA1MzQ3OTgkajYwJGwwJGgw)
- [Docker multi-stage build](https://docs.docker.com/develop/develop-images/multistage-build/)
- Build docker image
  ```
  docker build -t weather-app-express:1.0 .
  ```
- Run the image: include port binding and giving container a readable name
  ```
  docker run --name weather-app-prod --env-file .env.docker -p 4750:4750 weather-app-express:1.0
  ```
- Test the endpoint using curl
