import { useSelector } from "react-redux";
import BillListItem from "./BillListItem";

const ExpenseList = () => {
  const bills = useSelector((state) => state.bill.bills);

  return (
    <div>
      <div className="item-row">
        <div className="item-amount">Amount</div>
        <div className="item-description">Description</div>
        <div className="item-category">Category</div>
        <div className="item-date">Date</div>
        <div className="item-actions"></div>
      </div>
      {bills.map((bill) => (
        <BillListItem key={bill.id} {...bill} />
      ))}
    </div>
  );
};

export default ExpenseList;
