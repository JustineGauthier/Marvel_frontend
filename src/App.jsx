import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Pages
import Characters from "./pages/characters/Characters";
import Character from "./pages/character/Character";
import Comics from "./pages/comics/Comics";
import Comic from "./pages/comic/Comic";
import Favorites from "./pages/favorites/Favorites";

// Components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [favoritesCharactersCookie, setFavoritesCharactersCookie] = useState(
    JSON.parse(Cookies.get("favoritesCharactersCookie") || "[]")
  );
  const [favoritesComicsCookie, setFavoritesComicsCookie] = useState(
    JSON.parse(Cookies.get("favoritesComicsCookie") || "[]")
  );

  const handleFavoriteToggle = (data, cookieName) => {
    if (cookieName === "favoritesCharactersCookie") {
      const isFavorite = favoritesCharactersCookie.some(
        (item) => item._id === data._id
      );
      const updatedFavorites = isFavorite
        ? favoritesCharactersCookie.filter((item) => item._id !== data._id)
        : [...favoritesCharactersCookie, data];

      Cookies.set(cookieName, JSON.stringify(updatedFavorites), {
        expires: 15,
      });
      setFavoritesCharactersCookie(updatedFavorites);
    }
    if (cookieName === "favoritesComicsCookie") {
      const isFavorite = favoritesComicsCookie.some(
        (item) => item._id === data._id
      );
      const updatedFavorites = isFavorite
        ? favoritesComicsCookie.filter((item) => item._id !== data._id)
        : [...favoritesComicsCookie, data];

      Cookies.set(cookieName, JSON.stringify(updatedFavorites), {
        expires: 15,
      });
      setFavoritesComicsCookie(updatedFavorites);
    }
  };

  return (
    <Router>
      <Header setSearch={setSearch} setPage={setPage}></Header>
      <Routes>
        <Route
          path="/comics/:id"
          element={
            <Comic
              favoritesComicsCookie={favoritesComicsCookie}
              setFavoritesComicsCookie={setFavoritesComicsCookie}
              handleFavoriteToggle={handleFavoriteToggle}
            />
          }
        />
        <Route
          path="/characters/:id"
          element={
            <Character
              favoritesCharactersCookie={favoritesCharactersCookie}
              setFavoritesCharactersCookie={setFavoritesCharactersCookie}
              handleFavoriteToggle={handleFavoriteToggle}
            />
          }
        />
        <Route
          path="/comics/"
          element={
            <Comics
              search={search}
              setSearch={setSearch}
              page={page}
              setPage={setPage}
              favoritesComicsCookie={favoritesComicsCookie}
              setFavoritesComicsCookie={setFavoritesComicsCookie}
              handleFavoriteToggle={handleFavoriteToggle}
            />
          }
        />
        <Route
          path="/favorites/"
          element={
            <Favorites
              favoritesCharactersCookie={favoritesCharactersCookie}
              setFavoritesCharactersCookie={setFavoritesCharactersCookie}
              favoritesComicsCookie={favoritesComicsCookie}
              setFavoritesComicsCookie={setFavoritesComicsCookie}
              handleFavoriteToggle={handleFavoriteToggle}
            />
          }
        />
        <Route
          path="*"
          element={
            <Characters
              search={search}
              setSearch={setSearch}
              page={page}
              setPage={setPage}
              favoritesCharactersCookie={favoritesCharactersCookie}
              setFavoritesCharactersCookie={setFavoritesCharactersCookie}
              handleFavoriteToggle={handleFavoriteToggle}
            />
          }
        />
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
