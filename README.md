# CineMatch – Smart Movie Recommendation App

CineMatch is a modern, Netflix-style movie exploration web app built with **React.js**, **Tailwind CSS**, and the **TMDb API**.

## 🚀 Features

- 🔍 **Search Movies:** Real-time search by title + list of recently viewed.
- 🎙️ **Voice Search:** State-of-the-art search using **Web Speech API**.
- 🎬 **Trailer Modal:** Smooth cinematic experience using **Framer Motion**.
- 📈 **Trending & Popular:** Dynamic discovery across categories.
- 🤖 **Smart Matches:** Custom recommendation engine based on genre, ratings, and era.
- 💾 **Watchlist:** LocalStorage persistence for your favorite picks.
- 🧩 **Advanced Filters:** Fine-tune discovery by Genre, Rating, and Release Year.
- 🎲 **Surprise Me:** Random movie generator easter egg.
- 📱 **Premium UI:** Dark mode, skeleton shimmers, glowing cards, and glassmorphism.
- 📊 **Economic Insights:** View movie Budget, Revenue, and Popularity stats.

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite
- **Styling:** Tailwind CSS, Lucide React (Icons), Framer Motion (Animations)
- **API:** TMDb (The Movie Database)
- **State Management:** React Context API

## 🏁 Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd movie
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up the API Key
1. Sign up/Login to [TMDB](https://www.themoviedb.org/).
2. Navigate to Settings > API and get your **API Key**.
3. Create a `.env` file in the root directory:
```bash
VITE_TMDB_API_KEY=your_api_key_here
```

### 4. Run the development server
```bash
npm run dev
```

## 📂 Folder Structure
```text
/src
  /components  # Reusable UI elements (Navbar, MovieCard, Hero)
  /context     # Global state management
  /pages       # Main application views (Home, MovieDetails, etc.)
  /services    # API configuration and service calls
  /utils       # Helper functions
  App.jsx      # Main routing and layout
  index.css    # Global styles & Tailwind directives
```

## ✨ Advanced Features
- [x] Debounced search (Planned)
- [x] Loading skeleton UI
- [x] Error handling
- [x] Mobile responsive navigation
- [x] Watchlist persistence

## 📜 License
MIT
