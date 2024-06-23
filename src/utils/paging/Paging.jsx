import "./paging.css";

const Paging = ({ page, totalPages, setPage }) => {
  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pagings-container">
      <i
        className={`${page <= 1 && "hide-icon"} fa-solid fa-caret-left`}
        onClick={() => {
          handlePageChange(page - 1);
        }}
      ></i>

      <span>
        {page}...{totalPages}
      </span>

      <i
        className={`${
          page >= totalPages && "hide-icon"
        } fa-solid fa-caret-right`}
        onClick={() => {
          handlePageChange(page + 1);
        }}
      ></i>
    </div>
  );
};

export default Paging;
