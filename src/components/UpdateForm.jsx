/* eslint-disable react/prop-types */
import { useState } from "react";

function UpdateForm({
  defaultAmount,
  defaultDescription,
  defaultCategory,
  defaultDate,
  id,
  closeConfirmUpdateModal,
  handleUpdateBill,
}) {
  const [description, setDescription] = useState(defaultDescription);
  const [category, setCategory] = useState(defaultCategory);
  const [amount, setAmount] = useState(defaultAmount);
  const [date, setDate] = useState(defaultDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    const bill = {
      description,
      category,
      amount,
      date,
      id,
    };
    handleUpdateBill(bill);
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
        <div className="confirm-actions">
          <button className="cancel-button" onClick={closeConfirmUpdateModal}>
            Cancel
          </button>
          <button className="delete-button update-button">Update</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateForm;
