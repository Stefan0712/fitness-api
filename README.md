# EasyFitness API

An API for handling creating, editing, viewing, sharing, and finding workouts and exercises. Primarily made for my Fitness App, it can be used as standalone by using the API Portal.  
> ⚠️ This project is currently a **Work in Progress**. Features are being added and things may break or change often.

## 📖 About

The API will handle users, workouts, exercises, equipment, and community features, such as guides, posts, comments, and friends. Paired with the API Portal, you can easily manage your workouts and exercises, by creating new ones or finding curated or user-created ones.
In future updates you will be able to plan your workouts and exercises, allowing you to make entire workout plans and share them. It will also act as a hub for interacting with other users by allowing interaction between them through posts, guides, comments, and follows.

---

## ✨ Features

- ✅  CRUD for exercises: You can see, edit, delete, and create exercises. You can also add exercises to favorites or save them
- ✅  CRUD for workouts: You can see, edit, delete, and create workouts. You can also add workouts to favorites or save them
- ✅  Basic auth with login, register, logout, basic authorization based on ownership or role
- [ ] Workout planner
- [ ] CRUD for guides
- [ ] CRUD for posts
- [ ] Admin panel
- [ ] Social features, such as friends, followers, notifications, public profiles, etc
- [ ] Activity history

---

## 🛠️ Tech Stack

- Express.js
- Mongodb
- JWT
- Bcrypt
- CORS
- dotenv
- cookie-parser
- nodemon

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=git,express,js,mongodb,npm" />
  </a>
</p>

---
## Planned Endpoints (WIP)
## 📡 Planned Endpoints (WIP)

| Method | Endpoint                        | Description                    | Status      |
|--------|---------------------------------|--------------------------------|-------------|
| GET    | /api/exercise                   | List all exercises             | ✅ Working  |
| POST   | /api/exercise                   | Create a new exercise          | ✅ Working  |
| GET    | /api/exercise/view/:id          | Get exercise by id             | ✅ Working  |
| PUT    | /api/exercise/:id               | Edit exercise                  | ✅ Working  |
| DELETE | /api/exercise/:id               | Delete exercise                | ✅ Working  |
| POST   | /api/exercise/my-exercises      | Get user's exercises           | ✅ Working  |
| POST   | /api/exercise/favorite:/id      | Add exercise to favorites      | ✅ Working  |
| POST   | /api/exercise/add/:id           | Save exercise to library       | ✅ Working  |
| GET    | /api/workout                    | List all workout               | ✅ Working  |
| POST   | /api/workout                    | Create a new workout           | ✅ Working  |
| GET    | /api/workout/:id                | Get workout by id              | ✅ Working  |
| PUT    | /api/workout/:id                | Edit workout                   | ✅ Working  |
| DELETE | /api/workout/:id                | Delete workout                 | ✅ Working  |
| POST   | /api/workout/my-workouts        | Get user's workouts            | ✅ Working  |
| POST   | /api/workout/favorite:/id       | Add workout to favorites       | ✅ Working  |
| POST   | /api/workout/add/:id            | Save workout to library        | ✅ Working  |
| POST   | /api/auth/register              | Create a new user              | ✅ Working  |
| POST   | /api/auth/login                 | Login user                     | ✅ Working  |
| POST   | /api/auth/logout                | Logout user                    | ✅ Working  |
| GET    | /api/auth/private               | Get full user data             | ✅ Working  |
| POST   | /api/equipment/all              | Login user                     | ✅ Working  |
| GET    | /api/equipment/default          | Get full user data             | ✅ Working  |
| POST   | /api/equipment/my-equipment     | Login user                     | ✅ Working  |
| POST    | /api/equipment/create           | Create equipment               | ✅ Working  |
| GET    | /api/equipment/:id              | Get equipment by id            | ✅ Working  |
| POST   | /api/equipment/toggle-save/:id  | Add or remove from library     | ✅ Working  |
| PUT    | /api/equipment/:id              | Update equipment               | ✅ Working  |

## 🌐 API Portal

A web-based frontend to interact with the API. Coming soon.

[API Portal](https://github.com/Stefan0712/api-portal)
