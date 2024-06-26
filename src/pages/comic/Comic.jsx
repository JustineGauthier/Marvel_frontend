import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Item_section from "../../components/sections/item_section/Item_section";
import "./comic.css";

const Comic = ({ favoritesComicsCookie, handleFavoriteToggle }) => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--nksmjkmnbqhd.code.run/comics/${id}`
          // `http://localhost:3000/comics/${id}`
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
      <Item_section
        favoritesCookie={favoritesComicsCookie}
        data={data}
        handleFavoriteToggle={handleFavoriteToggle}
        type={"comic"}
      ></Item_section>
    </main>
  );
};

export default Comic;
