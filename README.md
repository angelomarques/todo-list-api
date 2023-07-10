# To-Do List API

<!-- [![Build Status](https://img.shields.io/travis/username/repo.svg)](https://travis-ci.org/username/repo)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT) -->

## Overview

Basic CRUD and Authencation API for managing tasks. It allows users to create, update (complete), and delete tasks.

## Installation

To use this API, ensure that you have Node.js and npm installed. Then, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/angelomarques/todo-list-api.git
```

2. Set up environment variables:
   - Duplicate the `.env.example` file and rename it to `.env`
   - Modify the necessary values in the `.env` file

## Getting Started

To get started with the API, follow these steps:

1. Register a new user account by sending a `POST` request to `/auth/register` with the required fields: `firstName`, `lastName`, `email`, and `password`.
2. Obtain an access token by sending a `POST` request to `/auth/login` with the `email` and `password` fields.
3. Include the access token in the `Authorization` header of the protected requests:

```bash
Authorization: Bearer <access_token>
```

## API Reference

### Tasks

Create a task

---

- URL: `/tasks/`
- Method: `POST`
- Headers:
  - `Authorization`: "Bearer <access_token>"
- Body:
  - `title`(required): The title of the task

List tasks by user id

---

- URL: `/tasks/`
- Method: `GET`
- Headers:
  - `Authorization`: "Bearer <access_token>"

Get single task by id

---

- URL: `/tasks/:id`
- Method: `GET`
- Headers:
  - `Authorization`: "Bearer <access_token>"

Update task by id

---

- URL: `/tasks/:id`
- Method: `PUT`
- Headers:
  - `Authorization`: "Bearer <access_token>"
- Body:
  - `title`(optional): The title of the task
  - `completed`(optional): A boolean field that describes if the task is completed or not

Delete task by id

---

- URL: `/tasks/:id`
- Method: `DELETE`
- Headers:
  - `Authorization`: "Bearer <access_token>"

Complete task by id

---

- URL: `/tasks/:id/complete`
- Method: `PUT`
- Headers:
  - `Authorization`: "Bearer <access_token>"

### Users

Get user info

---

- URL: `/users/`
- Method: `GET`
- Headers:
  - `Authorization`: "Bearer <access_token>"

Update user info

---

- URL: `/users/`
- Method: `PUT`
- Headers:
  - `Authorization`: "Bearer <access_token>"
- Body:
  - `firstName`(optional): User's first Name
  - `lastName`(optional): User's last Name

### Authencation

Register a user

---

- URL: `/auth/register`
- Method: `POST`
- Body:
  - `firstName`(required): User's first Name
  - `lastName`(required): User's last Name
  - `email`(required): User's email
  - `password`(required): User's password

Login a user

---

- URL: `/auth/login`
- Method: `POST`
- Body:
  - `email`(required): User's email
  - `password`(required): User's password

Refresh the user Acess token

---

- URL: `/auth/refreshToken`
- Method: `POST`
- Body:
  - `refreshToken`(required): The user refresh token

## Authentication

This API uses JSON Web Tokens (JWT) for authentication.

## Middlewares

- `checkTaskOwnership`: It checks if the task belongs to the user and if he's allowed to manipulate that task
- `validateResource`: It uses [Zod](https://zod.dev/) to validate the resource (body and params) of each API endpoint
- `verifyAuthentication`: Middleware necessary to protect routes by JWT tokens
