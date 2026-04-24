"""Floyd-Warshall shortest path implementation for weighted airport graph."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Dict, List

INF = float("inf")


@dataclass
class PathResult:
    path: List[str]
    total_distance: float
    total_duration: float
    total_cost: float
    flights_count: int


class FlightNetwork:
    def __init__(self, airports: List[dict], routes: List[dict]) -> None:
        self.airports = airports
        self.routes = routes
        self.codes = [airport["code"] for airport in airports]
        self.index = {code: idx for idx, code in enumerate(self.codes)}
        self.edge_metrics: Dict[tuple, List[dict]] = {}

        for route in routes:
            key = (route["source"], route["destination"])
            self.edge_metrics.setdefault(key, []).append(
                {
                    "distance": route["distance"],
                    "duration": route["duration"],
                    "cost": route["cost"],
                }
            )

    def _build_matrices(self, optimize_by: str):
        n = len(self.codes)
        dist = [[INF] * n for _ in range(n)]
        nxt = [[None] * n for _ in range(n)]

        for i in range(n):
            dist[i][i] = 0
            nxt[i][i] = i

        for route in self.routes:
            u = self.index[route["source"]]
            v = self.index[route["destination"]]
            weight = route[optimize_by]
            if weight < dist[u][v]:
                dist[u][v] = weight
                nxt[u][v] = v

        return dist, nxt

    def _run_floyd_warshall(self, dist, nxt):
        n = len(self.codes)
        for k in range(n):
            for i in range(n):
                if dist[i][k] == INF:
                    continue
                for j in range(n):
                    candidate = dist[i][k] + dist[k][j]
                    if candidate < dist[i][j]:
                        dist[i][j] = candidate
                        nxt[i][j] = nxt[i][k]

    def _reconstruct_path(self, src_code: str, dst_code: str, nxt):
        src = self.index[src_code]
        dst = self.index[dst_code]

        if nxt[src][dst] is None:
            return []

        path_indices = [src]
        while src != dst:
            src = nxt[src][dst]
            if src is None:
                return []
            path_indices.append(src)

        return [self.codes[idx] for idx in path_indices]

    def _best_leg_metrics(self, source: str, destination: str, optimize_by: str) -> dict:
        options = self.edge_metrics[(source, destination)]
        return min(options, key=lambda option: option[optimize_by])

    def find_shortest_path(self, source: str, destination: str, optimize_by: str) -> PathResult:
        if source not in self.index or destination not in self.index:
            raise ValueError("Invalid source or destination airport code.")
        if optimize_by not in {"distance", "duration", "cost"}:
            raise ValueError("optimize_by must be one of distance, duration, or cost.")

        dist, nxt = self._build_matrices(optimize_by)
        self._run_floyd_warshall(dist, nxt)
        path = self._reconstruct_path(source, destination, nxt)

        if not path:
            raise ValueError("No available route between selected airports.")

        total_distance = 0.0
        total_duration = 0.0
        total_cost = 0.0

        for i in range(len(path) - 1):
            leg = self._best_leg_metrics(path[i], path[i + 1], optimize_by)
            total_distance += leg["distance"]
            total_duration += leg["duration"]
            total_cost += leg["cost"]

        return PathResult(
            path=path,
            total_distance=round(total_distance, 2),
            total_duration=round(total_duration, 2),
            total_cost=round(total_cost, 2),
            flights_count=max(len(path) - 1, 0),
        )

    def network_analysis(self):
        total_routes = len(self.routes)
        total_distance = sum(route["distance"] for route in self.routes)
        total_duration = sum(route["duration"] for route in self.routes)
        total_cost = sum(route["cost"] for route in self.routes)

        return {
            "total_connected_routes": total_routes,
            "average_distance": round(total_distance / total_routes, 2),
            "average_duration": round(total_duration / total_routes, 2),
            "average_cost": round(total_cost / total_routes, 2),
            "total_airports": len(self.codes),
        }
