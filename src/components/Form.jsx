import { addBill } from "../features/bill/billSlice";
import { useDispatch, useSelector } from "react-redux";
import { addData, clearData } from "../features/form/formSlice";

const Form = () => {
  const { description, category, amount, date, id } = useSelector(
    (store) => store.form
  );
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const bill = { description, category, amount, date, id };
    dispatch(clearData());
    dispatch(addBill(bill));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      addData({ ...{ description, category, amount, date, id }, [name]: value })
    );
  };

  return (
    <div className="form-container">
      <h2>Add New Bill</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-row">
          <label className="form-label">
            Description
            <input
              type="text"
              name="description"
              value={description}
              onChange={handleChange}
              required
              className="form-input"
            />
          </label>

          <label className="form-label">
            Category
            <select
              name="category"
              value={category}
              onChange={handleChange}
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
        </div>

        <div className="form-row">
          <label className="form-label">
            Amount
            <input
              type="number"
              name="amount"
              min="0"
              value={amount}
              onChange={handleChange}
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
              onChange={handleChange}
              required
              className="form-input"
            />
          </label>
        </div>

        <button type="submit" className="form-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
