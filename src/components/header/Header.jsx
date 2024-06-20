import { Link } from "react-router-dom";
import SearchBar from "../../utils/SearchBar";

import "./header.css";

const Header = ({ search, setSearch }) => {
  return (
    <div className="navBar">
      <Link to="/">
        <img src="/img/marvel-logo.svg" alt="Marvel logo" />
      </Link>
      <SearchBar search={search} setSearch={setSearch} />
      <Link to="/">Characters</Link>
      <Link to="/comics">Comics</Link>
      <Link to="/favorites">
        <i className="fas fa-heart"></i>
        <i className="far fa-heart"></i>
      </Link>
    </div>
  );
};

export default Header;
