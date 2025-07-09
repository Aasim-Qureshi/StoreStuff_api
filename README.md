# StoreStuff – Backend

**StoreStuff** is a modular cloud storage solution that allows users to create and join collaborative storage spaces. Within each space, users can upload and organize files using a nested folder system, download shared files, and collaborate in real time with other members.

This repository contains the backend service for StoreStuff, built using **Node.js**, **Express**, **PostgreSQL**, and **Prisma**. It follows the principles of **Clean Architecture**, ensuring a clear separation between business logic, infrastructure, and interfaces.

## Features

- **Space creation & sharing** – Organize files into isolated storage environments
- **Folder hierarchy** – Create nested folders like a traditional file system
- **File uploads** – Upload and store files via Cloudinary
- **File downloads** – Download files uploaded by collaborators
- **Collaboration** – Invite users and manage access to shared spaces
- **Modular, testable structure** – Clean Architecture ensures scalability and maintainability
- More features coming soon...

## Architecture

This project is structured according to **Clean Architecture** principles:
```
src/
  ├── application/      Use cases (business logic)
  ├── domain/           Core entities and business rules
  ├── infrastructure/   External services, Prisma models
  └── server.ts         Entry point
```
### Benefits:
- Easy to test and scale
- Each layer has a single responsibility
- Infrastructure (like DB or Cloudinary) can be swapped without changing core logic


## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Aasim-Qureshi/StoreStuff_api.git
cd StoreStuff_api
````

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Configure environment variables

Create a `.env` file in the root directory and add the following:

```env
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<dbname>
JWT_PRIVATE_KEY=your-private-key
JWT_PUBLIC_KEY=your-public-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
PORT=3000
```

You can generate RSA key pairs for JWT using OpenSSL:

```bash
openssl genrsa -out private.key 2048
openssl rsa -in private.key -pubout -out public.key
```

Paste the content of the keys into your `.env` as single-line strings (use `\n` for newlines).

---

### 4. Run database migrations

```bash
npx prisma migrate dev --name init
```

(Optional) Launch Prisma Studio to view your data:

```bash
npx prisma studio
```

---

### 5. Start the development server

```bash
npm run dev
```

Server will start at: `http://localhost:3000`

## Available Scripts

| Script          | Description                      |
| --------------- | -------------------------------- |
| `npm run dev`   | Start server in development mode |


## Tech Stack

* **Node.js** + **Express**
* **PostgreSQL** + **Prisma**
* **Cloudinary** for cloud file storage
* **TypeScript** for safety and maintainability

## Current Status

Implemented:

* File & folder system
* Cloud uploads via Cloudinary
* Collaborative spaces with access management
* Download functionality

In Progress:

* Authentication middleware
* Role-based permissions
* File previews and thumbnails

## Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## License

This project is licensed under the MIT License.

---

## Author

**Aasim Qureshi**
GitHub: [@Aasim-Qureshi](https://github.com/Aasim-Qureshi)

