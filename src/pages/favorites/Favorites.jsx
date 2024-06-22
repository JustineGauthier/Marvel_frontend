import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

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
          setCharactersData(JSON.parse(favoritesCharacters));
        }

        const favoritesComics = Cookies.get("favoritesComicsCookie");
        if (favoritesComics) {
          setComicsData(JSON.parse(favoritesComics));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [handleFavoriteToggle]);

  return (
    <main>
      <div className="characters-container">
        <h2>Characters :</h2>
        {charactersData.length > 0 ? (
          charactersData.map((character) => {
            return (
              <div key={character._id}>
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
                <Link to={`/characters/${character._id}`}>
                  <img
                    src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
                    alt={`${character.name} image`}
                  />
                  <h2>{character.name}</h2>
                  <p>{character.description}</p>
                </Link>
              </div>
            );
          })
        ) : (
          <p>You don't have any favorite characters !</p>
        )}
      </div>

      <div className="comics-container">
        <h2>Comics :</h2>
        {comicsData.length > 0 ? (
          comicsData.map((comic) => {
            return (
              <div key={comic._id}>
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
                <Link to={`/comics/${comic._id}`}>
                  <img
                    src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
                    alt={`${comic.name} image`}
                  />
                  <h2>{comic.name}</h2>
                  <p>{comic.description}</p>
                </Link>
              </div>
            );
          })
        ) : (
          <p>You don't have any favorite comics !</p>
        )}
      </div>
    </main>
  );
};

export default Favorites;
