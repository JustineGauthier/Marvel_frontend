import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./characters.css";

const Characters = ({ search }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          //   `https://site--backend-leboncoincoin--nksmjkmnbqhd.code.run/characters`
          `http://localhost:3000/characters?name=${search}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search]);

  return isLoading ? (
    <p>Loading</p>
  ) : (
    <main>
      <div className="characters-container">
        {data.map((character) => {
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
    </main>
  );
};

export default Characters;
