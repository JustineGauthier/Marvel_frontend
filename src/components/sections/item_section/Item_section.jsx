import { Link } from "react-router-dom";

const Item_section = ({
  favoritesCookie,
  data,
  handleFavoriteToggle,
  type,
}) => {
  const typeWithFirstLetterCapitalize =
    type.charAt(0).toUpperCase() + type.slice(1);
  return (
    <div className="item-container">
      <div>
        <i
          className={
            favoritesCookie.some((item) => item._id === data._id)
              ? "fas fa-heart"
              : "far fa-heart"
          }
          onClick={() => {
            handleFavoriteToggle(
              data,
              `favorites${typeWithFirstLetterCapitalize}sCookie`
            );
          }}
        ></i>
        <img
          src={`${data.thumbnail.path}/portrait_uncanny.${data.thumbnail.extension}`}
          alt={`${data.title} image`}
        />
        <h2>{data.name ? data.name : data.title}</h2>
        <p>
          {data.description
            ? data.description
            : `This ${type} has no description yet.`}
        </p>

        {data.comics && (
          <div>
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
        )}
      </div>
    </div>
  );
};

export default Item_section;
