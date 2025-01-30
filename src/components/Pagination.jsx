/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../features/bill/billSlice";

function Pagination({ currentPage, isFirstPage, isLastPage }) {
  const dispatch = useDispatch();

  const handlePrevPage = () => {
    if (!isFirstPage) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNextPage = () => {
    if (!isLastPage) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };
  if (isFirstPage && isLastPage) return;
  return (
    <div className="pagination">
      <button onClick={handlePrevPage} disabled={isFirstPage}>
        Prev
      </button>

      <span>Page {currentPage}</span>
      <button onClick={handleNextPage} disabled={isLastPage}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
