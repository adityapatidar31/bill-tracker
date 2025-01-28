import { useSelector } from "react-redux";
import BillListItem from "./BillListItem";

const ExpenseList = () => {
  const bills = useSelector((state) => state.bill.bills);

  return (
    <>
      {bills.map((bill) => (
        <BillListItem key={bill.id} {...bill} />
      ))}
    </>
  );
};

export default ExpenseList;
