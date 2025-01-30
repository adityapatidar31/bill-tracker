import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBill } from "../features/bill/billSlice";
import { toast } from "react-toastify";

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

const now = new Date();
const formattedDate = formatDate(now);

const Form = () => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(formattedDate);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    function showToastMessage() {
      toast.success("New bill add successfully !");
    }
    const bill = { description, category, amount, date };
    dispatch(addBill(bill));
    setDate(formattedDate);
    setAmount("");
    setCategory("");
    setDescription("");
    showToastMessage();
  };

  return (
    <div className="form-container">
      <h2> Add New Bill</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <label className="form-label">
          Description
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="form-input"
          />
        </label>

        <label className="form-label">
          Category
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="form-input"
          >
            <option value="">Select a category</option>
            <option value="Travel">Travel</option>
            <option value="Personal">Personal</option>
            <option value="Education">Education</option>
            <option value="Food & Dining">Food & Dining</option>
            <option value="Shopping">Shopping</option>
            <option value="Utility">Utility</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label className="form-label">
          Amount
          <input
            type="number"
            name="amount"
            min="0"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
            className="form-input"
          />
        </label>

        <label className="form-label">
          Date
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="form-input"
          />
        </label>

        <button type="submit" className="form-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
