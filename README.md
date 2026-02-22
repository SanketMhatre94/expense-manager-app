# SpendsMate — Mini Expense Manager

A full-stack expense management app built with React, Spring Boot, and PostgreSQL.

## Features
- Add expenses manually with auto-categorization by vendor
- Bulk upload via CSV with row-level error handling
- Anomaly detection — flags expenses exceeding 3× the category average
- Dashboard with category totals, top vendors, and anomaly list

## Tech Stack
- **Frontend** — React 18, TypeScript, Vite, Nginx
- **Backend** — Spring Boot 3, Java 21, Flyway
- **Database** — PostgreSQL 16
- **Infrastructure** — Docker, Docker Compose

## Running locally

### Prerequisites
- Docker Desktop running

### Start everything
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
docker compose down -v
docker compose up --build
```

## Project structure
```
spends-mate-expense-manager/
├── SpendsMate/                      # Spring Boot backend
│   └── src/main/java/com/expensemanager/
│       ├── controller/
│       ├── service/
│       ├── repository/
│       ├── model/
│       └── dto/
├── spends-mate-frontend/spends-mate/ # React frontend
│   └── src/
│       ├── pages/
│       ├── components/
│       ├── api/
│       └── types/
└── docker-compose.yml
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/expenses` | Add single expense |
| POST | `/api/expenses/upload` | Upload CSV file |
| GET | `/api/dashboard/summary` | Full dashboard data |
| GET | `/api/dashboard/anomalies` | Anomalies only |

## CSV Format
```csv
date,amount,vendor,description
2026-02-01,300,Swiggy,Lunch
2026-02-02,1200,Amazon,Headphones
```

## Design Notes
- Vendor categorization is data-driven via `vendor_category_mapping` table — add new rules with a single INSERT, no code change needed
- Anomaly flag is computed and stored at write time so dashboard reads are cheap
- Money uses `BigDecimal` (Java) and `NUMERIC(12,2)` (Postgres) throughout — never float
- CSV upload fails rows individually without aborting the batch
- Single `ApiResponse<T>` wrapper across all endpoints for consistent error handling
