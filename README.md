# Portfolio Tracker

A simple full-stack web application for tracking investment portfolios.

## Core Features

- 📊 Real-time portfolio dashboard
- 💼 Track investments
- 📈 Performance analytics
- 🔄 Automatic price updates
- 📱 Responsive design

## Tech Stack

### Frontend

- React.js
- TailwindCSS

### Backend

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- 
## Deployment
- AWS EC2 – Deployed the backend application on an AWS EC2 instance for scalability and performance.
- Nginx – Configured as a reverse proxy to handle HTTPS traffic and route requests between the frontend and backend.

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- npm

### Installation

1. Clone and setup

```bash
git clone https://github.com/ayush-khatrii/portfolio-tracker
cd portfolio-tracker
```

2. Install dependencies

```bash
cd server
npm install
```

3. Start application

```bash
cd client
npm run dev
```

## API Routes

- GET ` /api/holding/all` - Get all holdings
- GET ` /api/holding/:id` - Get holding by id
- POST `/api/holding/create` - Add holding
- PUT `/api/holding/:id/update` - Update holding
- DELETE `/api/holding/:id/delete` - Remove holding
