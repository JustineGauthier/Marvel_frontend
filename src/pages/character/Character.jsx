import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./character.css";

const Character = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          //   "https://site--backend-leboncoincoin--nksmjkmnbqhd.code.run/offers"
          `http://localhost:3000/comics/character/${id}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Loading</p>
  ) : (
    <main>
      <div className="character-container">
        <div>
          <img
            src={`${data.thumbnail.path}/portrait_uncanny.${data.thumbnail.extension}`}
            alt={`${data.name} image`}
          />
          <h2>{data.name}</h2>
          <p>{data.description}</p>
          <h3>Comics :</h3>
          <ul>
            {data.comics.map((comic) => {
              return (
                <Link to={`/comics/${comic._id}`} key={comic._id}>
                  <li>
                    <img
                      src={`${comic.thumbnail.path}/portrait_small.${comic.thumbnail.extension}`}
                      alt={`${comic.name} image`}
                    />
                    <h4>{comic.title}</h4>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Character;
