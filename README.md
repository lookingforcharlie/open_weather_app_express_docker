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
- Use docker to build docker image
  ```
  docker build -t weather-app-express:1.0 .
  ```
- Use docker to run the image: include port binding and giving container a readable name
  ```
  docker run --name weather-app-prod --env-file .env.docker -p 4750:4750 weather-app-express:1.0
  ```
- Test the endpoint using curl

- Use docker-compose.yml
  | Command | What it does |
  |----------------------------------|----------------------------------------------------------------|
  | `docker-compose build` | Only builds the image |
  | `docker-compose up` | Starts the container; no rebuild unless the image is missing |
  | `docker-compose up --build` | Rebuilds the image (if needed) and starts the container |
  | `docker-compose up --build -d` | Same, but runs in the background (detached mode) |
  | `docker-compose start` | Starts existing stopped containers |
  | `docker-compose restart` | Restarts containers |
  | `docker-compose stop` | Stops the container, but **does not remove** it |
  | `docker-compose down` | Stops and **removes** the container, network, and more |
  | `docker-compose down --volumes` | Same as above, but also removes volumes |
  | `docker-compose logs` | Shows logs for all services (useful when running in detached mode) |
  | `docker-compose logs <service>` | Shows logs for specific service (e.g., `weather-app`) |
  | `docker-compose logs -f` | Shows logs for all services and follows (useful when running in detached mode) |
  | `docker-compose logs -f <service>` | Shows logs for specific service and follows (useful when running in detached mode) |

- Individual Docker Commands
  | Command | What it does |
  |-----------------------------|-------------------------------------------------------------|
  | `docker ps` | Lists running containers |
  | `docker ps -a` | Lists **all** containers, including stopped ones |
  | `docker images` | Lists all locally stored Docker images |
  | `docker build -t <name> .` | Builds an image from a Dockerfile and tags it |
  | `docker run -p 3000:3000 <image>` | Runs a container and maps port 3000 to host |
  | `docker run --name weather-app-prod --env-file .env.docker -p 4750:4750 weather-app-express:1.0` | Runs weather app container with production settings, environment variables, and port mapping |
  | `docker logs <container>` | Shows logs of a container |
  | `docker logs -f <container>` | Shows logs and follows (live updates) |
  | `docker stop <container>` | Stops a running container |
  | `docker start <container>` | Starts a stopped container |
  | `docker restart <container>` | Restarts a container |
  | `docker rm <container>` | Removes a stopped container |
  | `docker rm -f <container>` | Force removes a container (even if running) |
  | `docker rmi <image>` | Removes an image |
  | `docker image prune` | Deletes **dangling (unused)** images (prompts confirmation) |
  | `docker image prune -f` | Same as above, but **forces deletion without confirmation** |
  | `docker system prune` | Removes all unused containers, networks, and images |
  | `docker system prune -a` | More aggressive cleanup (removes all unused images) |

## [Deploy Docker to AWS/ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/getting-started.html), and [AWS/ECR](https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html)

- Create a repo in ECR
- Create a ECS cluster with EC2 or Fargate, which manages containers
- ECS with EC2: Containers actually hosted in EC2, an ECS Agent is installed on each container for communicating with ECS
- ECS with Fargate(serverless): Relinquish the management of containers to AWS totally
- Inside ECS, create and setup Task Definitions using ECR image(ARN)
- Run task definition into ECS cluster by
- If you need customized domain: setup Route53

## [Pass secrets or sensitive information securely to containers in an Amazon ECS task and how to add role](https://www.youtube.com/watch?v=GZZpEJ3R0Lw)

- AmazonECSTaskExecutionRolePolicy: for creating task definition
- weather-express-secret-access-permission: customized for access secret via AWS Secrets Manager

# AWS System Manager -> Parameter Store to store environment variables
