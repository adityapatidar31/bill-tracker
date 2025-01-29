/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBill } from "../features/bill/billSlice";
import { addData } from "../features/form/formSlice";
import { MdEdit, MdDelete } from "react-icons/md";

const BillListItem = ({
  amount,
  description,
  category,
  date,
  id,
  isHighlighted,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(isHighlighted);
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const dispatch = useDispatch();

  function handleDeleteBill() {
    dispatch(deleteBill(id));
  }

  function handleUpdateBill() {
    const bill = { description, amount, category, date, id };
    dispatch(addData(bill));
    handleDeleteBill();
    toggleModal();
  }

  return (
    <div className={`item-row ${isHighlighted ? "highlight-row" : ""}`}>
      <div className="item-amount">{amount}</div>
      <div className="item-description">{description}</div>
      <div className="item-category">{category}</div>
      <div className="item-date">{date}</div>
      <div className="item-actions item-action-table" onClick={toggleModal}>
        &#8942;
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <button className="modal-button" onClick={handleUpdateBill}>
            <MdEdit /> Edit
          </button>
          <button className="modal-button" onClick={handleDeleteBill}>
            <MdDelete /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BillListItem;
