from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from algorithms.floyd_warshall import FlightNetwork
from data.airports import AIRPORTS
from data.routes import ROUTES

app = FastAPI(title="Indian Flight Route Planning System API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

network = FlightNetwork(AIRPORTS, ROUTES)


class FindRouteRequest(BaseModel):
    source: str = Field(..., min_length=3, max_length=3)
    destination: str = Field(..., min_length=3, max_length=3)
    optimize_by: str = Field(default="distance")


class MultiCityRequest(BaseModel):
    cities: list[str] = Field(..., min_length=2)
    optimize_by: str = Field(default="distance")


@app.get("/")
def root():
    return {"message": "Indian Flight Route Planning System API is running"}


@app.get("/airports")
def get_airports():
    return {"airports": AIRPORTS}


@app.get("/routes")
def get_routes():
    return {"routes": ROUTES}


@app.post("/find-route")
def find_route(payload: FindRouteRequest):
    try:
        source = payload.source.upper()
        destination = payload.destination.upper()
        shortest = network.find_shortest_path(source=source, destination=destination, optimize_by="distance")
        fastest = network.find_shortest_path(source=source, destination=destination, optimize_by="duration")
        cheapest = network.find_shortest_path(source=source, destination=destination, optimize_by="cost")

        return {
            "shortest": shortest.__dict__,
            "fastest": fastest.__dict__,
            "cheapest": cheapest.__dict__,
        }
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@app.post("/multi-city")
def multi_city(payload: MultiCityRequest):
    if len(payload.cities) < 2:
        raise HTTPException(status_code=400, detail="At least two cities are required.")

    cities = [city.upper() for city in payload.cities]
    segments = []
    aggregate = {
        "total_distance": 0.0,
        "total_duration": 0.0,
        "total_cost": 0.0,
        "flights_count": 0,
    }

    try:
        for i in range(len(cities) - 1):
            segment = network.find_shortest_path(cities[i], cities[i + 1], payload.optimize_by)
            segments.append(
                {
                    "from": cities[i],
                    "to": cities[i + 1],
                    **segment.__dict__,
                }
            )
            aggregate["total_distance"] += segment.total_distance
            aggregate["total_duration"] += segment.total_duration
            aggregate["total_cost"] += segment.total_cost
            aggregate["flights_count"] += segment.flights_count

        aggregate = {k: round(v, 2) if isinstance(v, float) else v for k, v in aggregate.items()}
        return {"segments": segments, "summary": aggregate}
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@app.get("/analysis")
def analysis():
    return network.network_analysis()
