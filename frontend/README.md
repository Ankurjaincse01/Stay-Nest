# StayNest Frontend 🏠

This is the React-based frontend for the StayNest platform, built using Vite and styled with Bootstrap.

## 🚀 Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Start Development Server:**
    ```bash
    npm run dev
    ```

## 📂 Project Structure

```text
src/
├── api/             # Central Axios instance & configuration
├── assets/
│   └── styles/      # App.css, index.css, and other global styles
├── components/      # Functional UI components grouped by feature
│   ├── booking/     # Booking card & logic
│   ├── common/      # Navbar, Footer
│   ├── listing/     # Hero, Maps, Owner controls
│   └── review/      # Review form & list
├── pages/           # Main route-based page components
└── App.jsx          # App entry with React Router & global state
```

## 🛠 Tech Stack

- **React** & **Vite**
- **Axios** (Centralized API calls)
- **Bootstrap** (Styling)
- **React Leaflet** (Maps)
- **React Toastify** (Notifications)
