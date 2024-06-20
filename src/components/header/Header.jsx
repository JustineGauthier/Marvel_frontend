import { Link } from "react-router-dom";
import SearchBar from "../../utils/SearchBar";

import "./header.css";

const Header = ({ search, setSearch, setPage }) => {
  return (
    <div className="navBar">
      <Link to="/">
        <img src="/img/marvel-logo.svg" alt="Marvel logo" />
      </Link>
      <SearchBar search={search} setSearch={setSearch} setPage={setPage} />
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
        <i className="fas fa-heart"></i>
        <i className="far fa-heart"></i>
      </Link>
    </div>
  );
};

export default Header;
