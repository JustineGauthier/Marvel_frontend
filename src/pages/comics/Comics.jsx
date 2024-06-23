import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBar from "../../utils/SearchBar";
import Paging from "../../utils/Paging";
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
          //   `https://site--backend-leboncoincoin--nksmjkmnbqhd.code.run/comics`
          `http://localhost:3000/comics?title=${search}&page=${page}`
        );
        console.log(response.data);
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
      <div className="comics-container">
        {data.paginatedComics.length > 0 ? (
          data.paginatedComics.map((comic) => {
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
                    src={`${comic.thumbnail.path}/portrait_fantastic.${comic.thumbnail.extension}`}
                    alt={`${comic.title} image`}
                  />
                  <h2>{comic.title}</h2>
                  <p>{comic.description}</p>
                </Link>
              </div>
            );
          })
        ) : (
          <p>There are no comics matching your search!</p>
        )}
      </div>
      <Paging
        page={data.pageNumber}
        totalPages={data.totalPages}
        setPage={setPage}
      ></Paging>
    </main>
  );
};

export default Comics;
