import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import { FavoritesProvider } from "./context/FavoritesContext";
import "./App.css";
const screens = { home: <HomePage />, favorites: <FavoritesPage /> };

function App() {
  const [selected, setSelected] = useState("home");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <FavoritesProvider>
      <Header
        selected={selected}
        setSelected={setSelected}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <div>{screens[selected]}</div>
    </FavoritesProvider>
  );
}

export default App;
