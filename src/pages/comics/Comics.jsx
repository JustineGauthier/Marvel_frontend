import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Paging from "../../utils/Paging";
import "./comics.css";

const Comics = ({ search, setPage, page }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          //   `https://site--backend-leboncoincoin--nksmjkmnbqhd.code.run/comics`
          `http://localhost:3000/comics?title=${search}&page=${page}`
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
      <div className="comics-container">
        {data.paginatedComics.map((comic) => {
          return (
            <Link to={`/comics/${comic._id}`} key={comic._id}>
              <div>
                <img
                  src={`${comic.thumbnail.path}/portrait_fantastic.${comic.thumbnail.extension}`}
                  alt={`${comic.title} image`}
                />
                <h2>{comic.title}</h2>
                <p>{comic.description}</p>
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

export default Comics;
