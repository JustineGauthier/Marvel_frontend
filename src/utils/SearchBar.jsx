const SearchBar = ({ search, setSearch, setPage }) => {
  return (
    <input
      type="text"
      placeholder="Rechercher des articles"
      value={search}
      onChange={(event) => {
        setSearch(event.target.value);
        setPage(1);
      }}
    />
  );
};

export default SearchBar;
