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
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const dispatch = useDispatch();

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const openConfirmModal = () => {
    setIsConfirmOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmOpen(false);
    toggleModal();
  };

  function handleDeleteBill() {
    dispatch(deleteBill(id));
    closeConfirmModal();
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
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal-button" onClick={handleUpdateBill}>
            <MdEdit /> Edit
          </button>
          <button className="modal-button" onClick={openConfirmModal}>
            <MdDelete /> Delete
          </button>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {isConfirmOpen && (
        <div className="confirm-modal" onClick={closeConfirmModal}>
          <div className="confirm-box" onClick={(e) => e.stopPropagation()}>
            <p>Are you sure you want to delete?</p>
            <div className="confirm-actions">
              <button className="cancel-button" onClick={closeConfirmModal}>
                Cancel
              </button>
              <button className="delete-button" onClick={handleDeleteBill}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillListItem;
