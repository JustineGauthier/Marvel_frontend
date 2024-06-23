import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./favorites.css";

const Favorites = ({
  favoritesCharactersCookie,
  favoritesComicsCookie,
  handleFavoriteToggle,
}) => {
  const [charactersData, setCharactersData] = useState([]);
  const [comicsData, setComicsData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      try {
        const favoritesCharacters = Cookies.get("favoritesCharactersCookie");
        if (favoritesCharacters) {
          const parsedCharacters = JSON.parse(favoritesCharacters);
          parsedCharacters.sort((a, b) => a.name.localeCompare(b.name));
          setCharactersData(parsedCharacters);
        }

        const favoritesComics = Cookies.get("favoritesComicsCookie");
        if (favoritesComics) {
          const parsedComics = JSON.parse(favoritesComics);
          parsedComics.sort((a, b) => a.title.localeCompare(b.title));
          setComicsData(parsedComics);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [handleFavoriteToggle]);

  return (
    <main className="favorites-container">
      <h2>Characters :</h2>
      <div className="favorites-collection-container">
        {charactersData.length > 0 ? (
          charactersData.map((character) => {
            return (
              <div key={character._id} className="favorites-card">
                <i
                  className={
                    favoritesCharactersCookie.some(
                      (item) => item._id === character._id
                    )
                      ? "fas fa-heart"
                      : "far fa-heart"
                  }
                  onClick={() => {
                    handleFavoriteToggle(
                      character,
                      "favoritesCharactersCookie"
                    );
                  }}
                ></i>
                <Link
                  to={`/characters/${character._id}`}
                  className="favorites-card-content"
                >
                  <img
                    src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
                    alt={`${character.name} image`}
                  />
                  <div className="favorites-card-infos">
                    <h2>{character.name}</h2>
                    <p>{character.description}</p>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <p className="no-favorites">
            You don't have any favorite characters !
          </p>
        )}
      </div>

      <h2>Comics :</h2>
      <div className="favorites-collection-container">
        {comicsData.length > 0 ? (
          comicsData.map((comic) => {
            return (
              <div key={comic._id} className="favorites-card">
                <i
                  className={
                    favoritesComicsCookie.some((item) => item._id === comic._id)
                      ? "fas fa-heart"
                      : "far fa-heart"
                  }
                  onClick={() => {
                    handleFavoriteToggle(comic, "favoritesComicsCookie");
                  }}
                ></i>
                <Link
                  to={`/comics/${comic._id}`}
                  className="favorites-card-content"
                >
                  <img
                    src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
                    alt={`${comic.name} image`}
                  />
                  <div className="favorites-card-infos"></div>
                  <h2>{comic.name}</h2>
                  <p>{comic.description}</p>
                </Link>
              </div>
            );
          })
        ) : (
          <p className="no-favorites">You don't have any favorite comics !</p>
        )}
      </div>
    </main>
  );
};

export default Favorites;
