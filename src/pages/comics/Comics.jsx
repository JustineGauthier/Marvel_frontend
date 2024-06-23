import { useEffect, useState } from "react";
import axios from "axios";
import List_section from "../../components/sections/list_section/List_section";
import SearchBar from "../../utils/searchBar/SearchBar";
import Paging from "../../utils/paging/Paging";
import "./comics.css";

const Comics = ({
  search,
  setSearch,
  page,
  setPage,
  favoritesComicsCookie,
  handleFavoriteToggle,
}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--nksmjkmnbqhd.code.run/comics?title=${search}&page=${page}`
          // `http://localhost:3000/comics?title=${search}&page=${page}`
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
        favoritesCookie={favoritesComicsCookie}
        handleFavoriteToggle={handleFavoriteToggle}
        type={"comic"}
      ></List_section>
      <Paging
        page={data.pageNumber}
        totalPages={data.totalPages}
        setPage={setPage}
      ></Paging>
    </main>
  );
};

export default Comics;
