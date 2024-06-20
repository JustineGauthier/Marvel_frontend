import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Paging from "../../utils/Paging";
import "./characters.css";

const Characters = ({ search }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          //   `https://site--backend-leboncoincoin--nksmjkmnbqhd.code.run/characters`
          `http://localhost:3000/characters?name=${search}&page=${page}`
        );
        console.log(response.data);
        setData(response.data);
        setPage(response.data.pageNumber);
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
      <div className="characters-container">
        {data.paginatedCharacters.map((character) => {
          return (
            <Link to={`/characters/${character._id}`} key={character._id}>
              <div>
                <img
                  src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
                  alt={`${character.name} image`}
                />
                <h2>{character.name}</h2>
                <p>{character.description}</p>
              </div>
            </Link>
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
