import { Link } from "react-router-dom";
import "./list_section.css";

const List_section = ({
  data,
  favoritesCookie,
  handleFavoriteToggle,
  type,
}) => {
  const typeWithFirstLetterCapitalize =
    type.charAt(0).toUpperCase() + type.slice(1);
  return (
    <div className="items-container">
      {data.paginatedData.length > 0 ? (
        data.paginatedData.map((item) => {
          return (
            <div className="item-list-card" key={item._id}>
              <i
                className={
                  favoritesCookie.some(
                    (favoriteItem) => favoriteItem._id === item._id
                  )
                    ? "fas fa-heart"
                    : "far fa-heart"
                }
                onClick={() => {
                  handleFavoriteToggle(
                    item,
                    `favorites${typeWithFirstLetterCapitalize}sCookie`
                  );
                }}
              ></i>
              <Link
                to={`/${type}s/${item._id}`}
                className="item-list-card-content"
              >
                <img
                  src={`${item.thumbnail.path}/portrait_incredible.${item.thumbnail.extension}`}
                  alt={`${item.name} image`}
                />
                <div className="item-list-card-infos">
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                </div>
              </Link>
            </div>
          );
        })
      ) : (
        <p>There are no {type}s matching your search!</p>
      )}
    </div>
  );
};

export default List_section;
