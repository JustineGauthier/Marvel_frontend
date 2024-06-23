import { Link } from "react-router-dom";

import "./header.css";

const Header = ({ setSearch, setPage }) => {
  return (
    <div className="navBar">
      <div className="navBar-container">
        <Link to="/">
          <img src="/img/marvel-logo.svg" alt="Marvel logo" />
        </Link>

        <div className="menu">
          <Link
            to="/"
            onClick={() => {
              setPage(1);
              setSearch("");
            }}
          >
            Characters
          </Link>
          <Link
            to="/comics"
            onClick={() => {
              setPage(1);
              setSearch("");
            }}
          >
            Comics
          </Link>
          <Link
            to="/favorites"
            onClick={() => {
              setPage(1);
              setSearch("");
            }}
          >
            Favorites
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
