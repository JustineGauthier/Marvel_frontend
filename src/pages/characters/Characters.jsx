import { useEffect, useState } from "react";
import axios from "axios";

import SearchBar from "../../utils/searchBar/SearchBar";
import List_section from "../../components/sections/list_section/List_section";
import Paging from "../../utils/paging/Paging";
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
          `https://site--marvel-backend--nksmjkmnbqhd.code.run/characters?name=${search}&page=${page}`
          // `http://localhost:3000/characters?name=${search}&page=${page}`
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
    <main>
      <p>Loading...</p>
    </main>
  ) : (
    <main>
      <SearchBar search={search} setSearch={setSearch} setPage={setPage} />
      <List_section
        data={data}
        favoritesCookie={favoritesCharactersCookie}
        handleFavoriteToggle={handleFavoriteToggle}
        type={"character"}
      ></List_section>
      <Paging
        page={data.pageNumber}
        totalPages={data.totalPages}
        setPage={setPage}
      ></Paging>
    </main>
  );
};

export default Characters;
