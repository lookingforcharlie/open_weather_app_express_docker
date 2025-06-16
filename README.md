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

### Development Tools

- **ESLint 9.28.0**: Code linting
- **TypeScript Node**: TypeScript execution environment
- **TSX**: TypeScript execution and watch mode
- **Rimraf**: Cross-platform tool for deleting files and directories

### Environment & Configuration

- **dotenv 16.5.0**: Environment variable management
- **dotenv-expand 12.0.2**: Environment variable expansion

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
