import { useDispatch } from "react-redux";
import { applyFilter } from "../features/bill/billSlice";

function FilterComponent() {
  const dispatch = useDispatch();
  function handleChange(e) {
    dispatch(applyFilter(e.target.value));
  }
  return (
    <select
      name="category"
      onChange={handleChange}
      required
      className="form-input child"
    >
      <option value="">Filter By Category</option>
      <option value="Travel">Travel</option>
      <option value="Personal">Personal</option>
      <option value="Education">Education</option>
      <option value="Food & Dining">Food & Dining</option>
      <option value="Shopping">Shopping</option>
      <option value="Utility">Utility</option>
      <option value="Other">Other</option>
    </select>
  );
}

export default FilterComponent;
