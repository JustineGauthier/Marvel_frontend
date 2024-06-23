import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./comic.css";

const Comic = ({ favoritesComicsCookie, handleFavoriteToggle }) => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          //   "https://site--backend-leboncoincoin--nksmjkmnbqhd.code.run/offers"
          `http://localhost:3000/comics/${id}`
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
      <div className="comic-container">
        <div>
          <i
            className={
              favoritesComicsCookie.some((item) => item._id === data._id)
                ? "fas fa-heart"
                : "far fa-heart"
            }
            onClick={() => {
              handleFavoriteToggle(data, "favoritesComicsCookie");
            }}
          ></i>
          <img
            src={`${data.thumbnail.path}/portrait_uncanny.${data.thumbnail.extension}`}
            alt={`${data.title} image`}
          />
          <h2>{data.title}</h2>
          <p>{data.description}</p>
        </div>
      </div>
    </main>
  );
};

export default Comic;
