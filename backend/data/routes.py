"""
In-memory domestic flight route edges.
Each route is directed and represents one available leg.
"""

ROUTES = [

    # ================= DEL ↔ BLR CORE ROUTES =================

    # 🔥 DIRECT (SHORTEST + FAST BUT EXPENSIVE)
    {"source": "DEL", "destination": "BLR", "distance": 1740, "duration": 2.8, "cost": 9000},
    {"source": "BLR", "destination": "DEL", "distance": 1740, "duration": 2.9, "cost": 8800},

    # 💰 VIA MUMBAI (CHEAPEST)
    {"source": "DEL", "destination": "BOM", "distance": 1148, "duration": 2.2, "cost": 2500},
    {"source": "BOM", "destination": "DEL", "distance": 1148, "duration": 2.3, "cost": 2600},

    {"source": "BOM", "destination": "BLR", "distance": 842, "duration": 1.7, "cost": 2000},
    {"source": "BLR", "destination": "BOM", "distance": 842, "duration": 1.8, "cost": 2100},

    # ⚡ VIA HYDERABAD (FASTEST)
    {"source": "DEL", "destination": "HYD", "distance": 1250, "duration": 1.8, "cost": 5000},
    {"source": "HYD", "destination": "DEL", "distance": 1250, "duration": 1.9, "cost": 5100},

    {"source": "HYD", "destination": "BLR", "distance": 500, "duration": 0.9, "cost": 3000},
    {"source": "BLR", "destination": "HYD", "distance": 500, "duration": 1.0, "cost": 3100},

    # 🧭 VIA CHENNAI (BALANCED)
    {"source": "DEL", "destination": "MAA", "distance": 1760, "duration": 3.0, "cost": 4000},
    {"source": "MAA", "destination": "DEL", "distance": 1760, "duration": 3.1, "cost": 4100},

    {"source": "MAA", "destination": "BLR", "distance": 290, "duration": 1.0, "cost": 1500},
    {"source": "BLR", "destination": "MAA", "distance": 290, "duration": 1.0, "cost": 1550},

    # ================= EXTRA NETWORK =================

    {"source": "BOM", "destination": "HYD", "distance": 622, "duration": 1.4, "cost": 2800},
    {"source": "HYD", "destination": "BOM", "distance": 622, "duration": 1.5, "cost": 2900},

    {"source": "BOM", "destination": "MAA", "distance": 1033, "duration": 1.9, "cost": 3500},
    {"source": "MAA", "destination": "BOM", "distance": 1033, "duration": 2.0, "cost": 3600},

    {"source": "MAA", "destination": "COK", "distance": 529, "duration": 1.2, "cost": 2200},
    {"source": "COK", "destination": "MAA", "distance": 529, "duration": 1.3, "cost": 2300},

    {"source": "COK", "destination": "TRV", "distance": 180, "duration": 0.8, "cost": 1500},
    {"source": "TRV", "destination": "COK", "distance": 180, "duration": 0.8, "cost": 1550},

    {"source": "BOM", "destination": "GOI", "distance": 435, "duration": 1.1, "cost": 2000},
    {"source": "GOI", "destination": "BOM", "distance": 435, "duration": 1.1, "cost": 2100},

    {"source": "BLR", "destination": "GOI", "distance": 493, "duration": 1.2, "cost": 2200},
    {"source": "GOI", "destination": "BLR", "distance": 493, "duration": 1.2, "cost": 2300},

    {"source": "DEL", "destination": "JAI", "distance": 241, "duration": 0.9, "cost": 1500},
    {"source": "JAI", "destination": "DEL", "distance": 241, "duration": 0.9, "cost": 1600},

    {"source": "DEL", "destination": "LKO", "distance": 417, "duration": 1.1, "cost": 1800},
    {"source": "LKO", "destination": "DEL", "distance": 417, "duration": 1.1, "cost": 1900},

    {"source": "DEL", "destination": "IXC", "distance": 239, "duration": 0.9, "cost": 1400},
    {"source": "IXC", "destination": "DEL", "distance": 239, "duration": 0.9, "cost": 1450},

    {"source": "CCU", "destination": "BBI", "distance": 369, "duration": 1.0, "cost": 1700},
    {"source": "BBI", "destination": "CCU", "distance": 369, "duration": 1.0, "cost": 1750},

    {"source": "CCU", "destination": "PAT", "distance": 470, "duration": 1.2, "cost": 1900},
    {"source": "PAT", "destination": "CCU", "distance": 470, "duration": 1.2, "cost": 1950},

    {"source": "CCU", "destination": "GAU", "distance": 527, "duration": 1.3, "cost": 2100},
    {"source": "GAU", "destination": "CCU", "distance": 527, "duration": 1.3, "cost": 2200},

    {"source": "AMD", "destination": "BOM", "distance": 441, "duration": 1.2, "cost": 2000},
    {"source": "BOM", "destination": "AMD", "distance": 441, "duration": 1.2, "cost": 2100},

    {"source": "AMD", "destination": "DEL", "distance": 777, "duration": 1.6, "cost": 2800},
    {"source": "DEL", "destination": "AMD", "distance": 777, "duration": 1.6, "cost": 2900},

    {"source": "PNQ", "destination": "BOM", "distance": 120, "duration": 0.7, "cost": 1200},
    {"source": "BOM", "destination": "PNQ", "distance": 120, "duration": 0.7, "cost": 1250},

    {"source": "PNQ", "destination": "HYD", "distance": 503, "duration": 1.2, "cost": 2200},
    {"source": "HYD", "destination": "PNQ", "distance": 503, "duration": 1.2, "cost": 2300},

    {"source": "NAG", "destination": "DEL", "distance": 852, "duration": 1.8, "cost": 3000},
    {"source": "DEL", "destination": "NAG", "distance": 852, "duration": 1.8, "cost": 3100},

    {"source": "NAG", "destination": "HYD", "distance": 423, "duration": 1.1, "cost": 2000},
    {"source": "HYD", "destination": "NAG", "distance": 423, "duration": 1.1, "cost": 2100},

    {"source": "NAG", "destination": "BLR", "distance": 890, "duration": 1.8, "cost": 3200},
    {"source": "BLR", "destination": "NAG", "distance": 890, "duration": 1.8, "cost": 3300},
]