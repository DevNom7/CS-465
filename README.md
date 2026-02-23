# CS 465 – Full Stack Development I  
## Travlr Getaways – Full Stack Web Application (MEAN)

This repository contains my final Travlr Getaways project for CS 465. It is a full stack MEAN application (MongoDB, Express, Angular, Node.js) with a customer-facing site and a secured admin SPA.

---

## Overview

This project includes:

- Customer-facing website rendered with **Express + Handlebars (HBS)**
- Admin **Angular** single-page application (SPA)
- **RESTful API** built with Express/Node
- **MongoDB** database with **Mongoose** models
- **JWT authentication** to secure admin routes

The goal was to build a working full stack travel application that separates the frontend, backend, and database while supporting both public users and administrators.

---

## Architecture

### Express Frontend vs Angular SPA

This project uses two frontend approaches.

The customer-facing site uses **Express + HBS templates** (server-side rendering). When a user visits a page, the server handles the request, pulls data, and sends back fully rendered HTML. Navigation follows a standard request/response cycle and usually triggers a full page reload.

The admin side is built as an **Angular SPA**. Angular loads once and updates the UI dynamically using API calls. When an admin adds or edits a trip, the page does not reload — the UI updates based on the JSON response from the API. The SPA provides a smoother experience and is better for data management.

### Why MongoDB (NoSQL)

MongoDB made sense because this entire stack is JavaScript-based. MongoDB stores data as JSON-like documents, which map naturally to JavaScript objects in Node and Angular. It also allows flexible schema design, which made it easier to build and iterate on trip data during development. Using MongoDB with Mongoose made CRUD operations simple and consistent.

---

## Functionality

### JSON vs JavaScript

JSON is a **data format**. JavaScript is a **programming language**.

JSON ties the frontend and backend together. Angular sends requests to the Express API and receives JSON responses. Express retrieves data from MongoDB and returns it as JSON, and Angular binds that JSON directly into the UI. In this project, JSON is the “shared language” between Angular, Express, and MongoDB.

### Refactoring + Reusable UI Components

During development I refactored code to improve structure and maintainability, including:

- Separating Express routes and controllers for clearer responsibilities
- Centralizing MongoDB logic using Mongoose models
- Moving HTTP requests into Angular services instead of duplicating logic in components
- Reusing the same trip form structure for Add and Edit operations

Reusable UI components reduce duplicated code, make updates easier, and keep the user experience consistent across the app.

---

## Testing

Testing required validating endpoints and also confirming security behavior once authentication was added.

### API Testing (GET + PUT)

To verify the SPA worked correctly with the API and database, I tested the full flow end-to-end:

- **GET** requests confirmed trip data was returned correctly (ex: `/api/trips`)
- **PUT** requests confirmed updates were persisted (ex: `/api/trips/:tripCode`)

After submitting an edit from the Angular admin UI, I verified the update by:
1. Confirming a successful API response
2. Refreshing the trip list in Angular to confirm the UI updated
3. Running another GET request to confirm the updated values were stored in MongoDB

### Security Testing (JWT)

Once JWT authentication was added:
- Requests to protected endpoints without a token returned **401 Unauthorized**
- After login, Angular stored the JWT and included it in the Authorization header
- Protected admin actions (POST/PUT/DELETE) succeeded only with a valid token

---

## Reflection

This course forced me to connect everything — not just frontend or backend in isolation. I built a full MVC server, a REST API, a MongoDB data layer, a client-side SPA, and secured it using JWT authentication. I now understand how data flows from the browser, through the API, into the database, and back again, and why separation of concerns matters when building scalable applications. This project strengthened my confidence in full stack development and helped me build a portfolio piece that demonstrates real-world architecture, API integration, and secure admin access.

---

## How to Run

### Backend (Express + API)
```bash
npm install
npm start
