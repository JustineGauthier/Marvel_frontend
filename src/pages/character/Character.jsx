import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Item_section from "../../components/sections/item_section/Item_section";
import "./character.css";

const Character = ({ favoritesCharactersCookie, handleFavoriteToggle }) => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--nksmjkmnbqhd.code.run/comics/character/${id}`
          // `http://localhost:3000/comics/character/${id}`
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
        favoritesCookie={favoritesCharactersCookie}
        data={data}
        handleFavoriteToggle={handleFavoriteToggle}
        type={"character"}
      ></Item_section>
    </main>
  );
};

export default Character;
