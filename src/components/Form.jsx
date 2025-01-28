import { useState } from "react";

const Form = () => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(description);
    console.log(category);
    console.log(amount);
    console.log(date);
  };

  return (
    <div className="form-container">
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
            onChange={(e) => setAmount(e.target.value)}
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
          <p> *Invalid Date</p>
        </label>

        <button type="submit" className="form-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
