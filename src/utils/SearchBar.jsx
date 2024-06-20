const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Rechercher des articles"
      value={search}
      onChange={(event) => {
        setSearch(event.target.value);
      }}
    />
  );
};

export default SearchBar;
