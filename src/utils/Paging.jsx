const Paging = ({ page, totalPages, setPage }) => {
  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {page > 1 && (
        <i
          className="fa-solid fa-caret-left"
          onClick={() => {
            handlePageChange(page - 1);
          }}
        ></i>
      )}

      <span>
        {page}...{totalPages}
      </span>

      {page < totalPages && (
        <i
          className="fa-solid fa-caret-right"
          onClick={() => {
            handlePageChange(page + 1);
          }}
        ></i>
      )}
    </>
  );
};

export default Paging;
