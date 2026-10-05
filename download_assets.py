import urllib.request
import os

images = {
    # Category images
    "assets/images/cat-burger.jpg": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    "assets/images/cat-pizza.jpg": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    "assets/images/cat-biryani.jpg": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    "assets/images/cat-chicken.jpg": "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800&q=80",
    "assets/images/cat-local-food.jpg": "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80",
    "assets/images/cat-drinks-desserts.jpg": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",

    # Popular Restaurant images
    "assets/images/res-pizza-hut.jpg": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    "assets/images/res-burger-house.jpg": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
    "assets/images/res-kacchi-bhai.jpg": "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80",
    "assets/images/res-spicy-station.jpg": "https://images.unsplash.com/photo-1527477378407-63a228e01e1c?auto=format&fit=crop&w=800&q=80",
    "assets/images/res-tea-time.jpg": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",

    # Customer avatars
    "assets/images/user-rafiq.jpg": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    "assets/images/user-tania.jpg": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    "assets/images/user-arif.jpg": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",

    # Hero & Food mockup elements
    "assets/images/hero-burger-meal.png": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=80",
    "assets/images/hero-bg-texture.jpg": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=80",
    "assets/images/app-promo-food.jpg": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for path, url in images.items():
    print(f"Downloading {path}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            with open(path, "wb") as f:
                f.write(resp.read())
        print(f"Saved {path}")
    except Exception as e:
        print(f"Failed {path}: {e}")
