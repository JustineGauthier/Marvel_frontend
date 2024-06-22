import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "../../utils/SearchBar";
import Paging from "../../utils/Paging";
import "./characters.css";

const Characters = ({
  search,
  setSearch,
  page,
  setPage,
  favoritesCharactersCookie,
  handleFavoriteToggle,
}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          //   `https://site--backend-leboncoincoin--nksmjkmnbqhd.code.run/characters`
          `http://localhost:3000/characters?name=${search}&page=${page}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search, page]);

  return isLoading ? (
    <p>Loading</p>
  ) : (
    <main>
      <SearchBar search={search} setSearch={setSearch} setPage={setPage} />
      <div className="characters-container">
        {data.paginatedCharacters.map((character) => {
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
                  handleFavoriteToggle(character, "favoritesCharactersCookie");
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
        })}
      </div>
      <Paging
        page={data.pageNumber}
        totalPages={data.totalPages}
        setPage={setPage}
      ></Paging>
    </main>
  );
};

export default Characters;
