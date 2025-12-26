# Purple Merit Backend

## Overview

It demonstrates authentication, authorization, real-time collaboration, and asynchronous job processing using a clean, modular NestJS architecture.

The implementation focuses on system design, API correctness, and scalability as required by the assessment.

---

## Tech Stack

- NestJS
- JWT Authentication
- Role-Based Access Control (RBAC)
- WebSockets (Socket.IO)
- BullMQ + Redis
- Docker & Docker Compose

---

## Architecture Overview

The system follows a modular, API-first architecture:

- REST APIs for authentication, projects, workspaces, and jobs
- JWT-based authentication with role-based authorization
- WebSocket gateway for real-time collaboration
- Redis-backed BullMQ queue for background job processing

All APIs are stateless, allowing horizontal scaling behind a load balancer.
Redis is used as shared infrastructure for both real-time messaging and async jobs.

---

## Features

- JWT-based authentication with refresh tokens
- Role-based access control (Owner, Collaborator, Viewer)
- Project and workspace management APIs
- Real-time collaboration:
  - User join / leave events
  - File change and cursor update events
- Asynchronous job processing with retries
- Fully Dockerized environment

---

## Authentication

Authentication is mocked for assessment purposes to focus on:

- JWT flow
- RBAC enforcement
- Secure API design

Any email/password combination can be used to obtain a token.
Roles can be adjusted internally to test authorization behavior.

---

## API Documentation

Swagger UI is available at:

http://localhost:3000/docs

All protected endpoints require a Bearer token.

---

## Running Locally (Docker)

### Prerequisites

- Node.js 18+
- Docker & Docker Compose

### Start the application

```bash
docker compose up --build
```
