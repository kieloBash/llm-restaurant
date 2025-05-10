# 🍽️ LLM-Driven Restaurant Finder App

This app allows users to search for restaurants using natural language. It uses an LLM (e.g., OpenAI GPT-4) to convert user input into structured queries, then fetches matching restaurants from the Foursquare Places API.

---

## Limitations

It cannot correctly display the correct term for the cuisine on the display result but can still query them correctly. (Italian, Filipino)

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

### 2. Install Dependencies

### 3. Configure Environment Variables

FOURSQUARE_API_KEY=
FOURSQUARE_CLIENT_ID=
FOURSQUARE_CLIENT_SECRET=
OPENAI_API_KEY=

Defaults:
FOURSQUARE_API_URL=https://api.foursquare.com/v3/places/search
FOURSQUARE_LIMIT=10
RESTAURANT_SEARCH_API_URL=/api/restaurant-search
NEXT_PUBLIC_APP_URL=http://localhost:3000