# Indian Flight Route Planning System

Full-stack web application for Indian domestic flight route planning using in-memory data and Floyd-Warshall shortest path algorithm.

## Tech Stack
- Frontend: React + Tailwind CSS + Plotly
- Backend: FastAPI
- Data: In-memory Python lists/dictionaries (no database)

## Project Structure

```
backend/
  main.py
  algorithms/
  data/
frontend/
  src/
    components/
    pages/
    services/
```

## Backend Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

API runs at `http://127.0.0.1:8000`

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://127.0.0.1:5173`

## API Endpoints
- `GET /airports`
- `GET /routes`
- `POST /find-route`
- `POST /multi-city`
- `GET /analysis`

