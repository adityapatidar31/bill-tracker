import { useSelector } from "react-redux";
import BillListItem from "./BillListItem";
import { FaDollarSign } from "react-icons/fa";

import { AiOutlineCalendar } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { MdDescription } from "react-icons/md";

const BillList = () => {
  const bills = useSelector((state) => state.bill.bills);
  const iconStyle = {
    marginRight: "8px",
    fontSize: "16px",
    color: "var(--text-color)",
  };

  return (
    <div>
      <h2>Expense List</h2> {/* Heading added here */}
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
      {bills.map((bill) => (
        <BillListItem key={bill.id} {...bill} />
      ))}
    </div>
  );
};

export default BillList;
