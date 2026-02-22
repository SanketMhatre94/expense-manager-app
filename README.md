# SpendsMate — Mini Expense Manager

A full-stack expense management application built as a 48-hour assignment.

## Technologies Used
- **Frontend** — React 18, TypeScript, Vite, Nginx
- **Backend** — Spring Boot 3, Java 21, Spring Data JPA, Flyway
- **Database** — PostgreSQL 16
- **Infrastructure** — Docker, Docker Compose

## Setup Instructions

### Prerequisites
- Docker Desktop installed and running

### Run the application
```bash
git clone https://github.com/SanketMhatre94/expense-manager-app.git
cd expense-manager-app
```

Create a `.env` file at the root:
```env
POSTGRES_DB=expense_manager
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/expense_manager
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres
```

Then start everything:
```bash
docker compose up --build
```

| Service  | URL                   |
|----------|-----------------------|
| Frontend | http://localhost:5173 |
| Backend  | http://localhost:8080 |
| Database | localhost:5432        |

### Reset database
```bash
docker compose down -v && docker compose up --build
```

## API Endpoints

| Method | Endpoint                   | Description          |
|--------|----------------------------|----------------------|
| POST   | `/api/expenses`            | Add single expense   |
| POST   | `/api/expenses/upload`     | Upload CSV file      |
| GET    | `/api/dashboard/summary`   | Full dashboard data  |
| GET    | `/api/dashboard/anomalies` | Anomalies only       |

## CSV Format
```csv
date,amount,vendor,description
2026-02-01,300,Swiggy,Lunch
2026-02-02,1200,Amazon,Headphones
```

## Assumptions
- Vendor matching is case-insensitive — `SWIGGY`, `Swiggy`, and `swiggy` all map to Food
- A vendor with no mapping is assigned the `Other` category automatically
- Anomaly detection requires at least one prior expense in the same category — a first-ever expense is never flagged as an anomaly
- CSV rows with invalid amounts, missing fields, or unparseable dates are skipped individually without aborting the entire upload
- The anomaly flag is computed at write time and stored — it reflects the average at the moment the expense was saved, not retroactively recalculated
