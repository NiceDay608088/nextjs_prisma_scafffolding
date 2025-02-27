The project's structure is primarily built using Next.js and Prisma. It serves as a scaffold for building full-stack web applications by integrating modern development tools and providing practical examples.

# Components

| Component              | Version               |
| ---------------------- | --------------------- |
| Apollo Client & Server |                       |
| date-fns               |                       |
| DndKit                 |                       |
| GraphQL                |                       |
| JWT                    |                       |
| lodash                 |                       |
| Next.js                | 15                    |
| Next.js middleware     |                       |
| Prisma                 |                       |
| React                  | 19                    |
| React-hook-form        |                       |
| RTK (Redux Toolkit)    |                       |
| Shadcn                 | shadcn@2.4.0-canary.6 |
| Supabase               |                       |
| Tailwind CSS           |                       |
| Typescript             |                       |
| Zod                    |                       |
|                        |                       |

# Features

## Next.js RESTful API

- Examples demonstrating HTTP methods: POST, GET, PUT, and DELETE
- Examples for submitting forms and posting JSON data
- Examples for handling file uploads
- User-related features follow a RESTful API approach

## Next.js GraphQL API

- Examples showcasing HTTP methods: POST, typically used for both mutation and query requests with a JSON payload.
- Order-related functionality is built using GraphQL

## Prisma Integration

- Examples of CRUD operations for a single table
- Querying relationships across multiple tables using Prisma
- Implementing pagination functionality

## Authentication & Middleware

Middleware for authentication validation using JWT is implemented for both GraphQL and RESTful requests, with configuration handled through .env files.

## Http Request Encapsulation

Centralized HTTP API requests using Fetch API with error handling and reusable methods for GET, POST, PUT, and DELETE.

# other

Rename `.eenv` to `.env` to reference the environment file.

# References

- https://github.com/sersavan/shadcn-multi-select-component
