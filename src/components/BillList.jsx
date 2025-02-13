import { useSelector } from "react-redux";
import BillListItem from "./BillListItem";
import { FaDollarSign } from "react-icons/fa";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { MdDescription } from "react-icons/md";
import FilterComponent from "./FilterComponent";
import Pagination from "./Pagination";

function BillList() {
  const { filter, bills, totalAmount, currentPage, pageSize } = useSelector(
    (state) => state.bill
  );

  const filteredBills = bills.filter(
    (bill) => bill.category === filter || filter === ""
  );

  const totalAmountDisplay =
    filter === ""
      ? totalAmount
      : filteredBills.reduce((total, bill) => total + bill.amount, 0);
  const iconStyle = {
    marginRight: "8px",
    fontSize: "16px",
    color: "var(--text-color)",
  };

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedBills = filteredBills.slice(startIndex, startIndex + pageSize);
  const isFirstPage = currentPage === 1;
  const isLastPage = startIndex + pageSize >= filteredBills.length;

  return (
    <div>
      <div className="flex-2-child">
        <h2 className="child1">Expense List</h2>
        <FilterComponent />
      </div>
      <div className="list-container expense-list-container">
        <div className="item-row">
          <div className="item-amount">
            <FaDollarSign style={iconStyle} /> Amount
          </div>
          <div className="item-description">
            <MdDescription style={iconStyle} />
            Description
          </div>
          <div className="item-category">
            <BiCategoryAlt style={iconStyle} /> Category
          </div>
          <div className="item-date">
            <AiOutlineCalendar style={iconStyle} />
            Date
          </div>
          <div className="item-actions">Action</div>
        </div>
        {paginatedBills.map((bill) => (
          <BillListItem key={bill.id} {...bill} />
        ))}

        <h2 className="total-amount">Total Amount: {totalAmountDisplay}</h2>
      </div>
      <div className="pagination-container">
        <Pagination
          currentPage={currentPage}
          isFirstPage={isFirstPage}
          isLastPage={isLastPage}
        />
      </div>
    </div>
  );
}

export default BillList;
