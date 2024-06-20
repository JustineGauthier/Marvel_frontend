const Paging = ({ page, totalPages, setPage }) => {
  return (
    <>
      {page > 1 && (
        <i
          className="fa-solid fa-caret-left"
          onClick={() => {
            setPage(page - 1);
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
            setPage(page + 1);
          }}
        ></i>
      )}
    </>
  );
};

export default Paging;
