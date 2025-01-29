import { useDispatch } from "react-redux";
import { payBills } from "../features/bill/billSlice";

function PayBillInput() {
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    const amount = Number(e.target.amount.value);
    console.log(amount);

    dispatch(payBills(amount));
  }
  return (
    <div className="child2">
      <form onSubmit={handleSubmit} className="flex-2-child">
        <input
          type="text"
          name="amount"
          required
          className="form-input"
          placeholder="Enter Amount"
        />
        <button type="submit " className="form-button bill-button">
          Pay
        </button>
      </form>
    </div>
  );
}
export default PayBillInput;
