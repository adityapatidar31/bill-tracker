/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBill, updateBill } from "../features/bill/billSlice";
import { MdEdit, MdDelete } from "react-icons/md";
import Form from "./Form";

const BillListItem = ({
  amount,
  description,
  category,
  date,
  id,
  isHighlighted,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isConfirmUpdateOpen, setIsConfirmUpdateOpen] = useState(false);

  const dispatch = useDispatch();

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const openConfirmDeleteModal = () => {
    setIsConfirmDeleteOpen(true);
  };

  const closeConfirmDeleteModal = () => {
    setIsConfirmDeleteOpen(false);
    toggleModal();
  };

  const openConfirmUpdateModal = () => {
    setIsConfirmUpdateOpen(true);
  };

  const closeConfirmUpdateModal = () => {
    setIsConfirmUpdateOpen(false);
    toggleModal();
  };

  function handleDeleteBill() {
    dispatch(deleteBill(id));
    closeConfirmDeleteModal();
  }

  function handleUpdateBill() {
    const bill = { description, amount, category, date, id };
    dispatch(updateBill(bill));
    closeConfirmUpdateModal();
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
          <button className="modal-button" onClick={openConfirmUpdateModal}>
            <MdEdit /> Edit
          </button>
          <button className="modal-button" onClick={openConfirmDeleteModal}>
            <MdDelete /> Delete
          </button>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {isConfirmDeleteOpen && (
        <div className="confirm-modal" onClick={closeConfirmDeleteModal}>
          <div className="confirm-box" onClick={(e) => e.stopPropagation()}>
            <p>Are you sure you want to delete?</p>
            <div className="confirm-actions">
              <button
                className="cancel-button"
                onClick={closeConfirmDeleteModal}
              >
                Cancel
              </button>
              <button className="delete-button" onClick={handleDeleteBill}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Update Modal */}
      {isConfirmUpdateOpen && (
        <div className="confirm-modal" onClick={closeConfirmUpdateModal}>
          <div className="confirm-box" onClick={(e) => e.stopPropagation()}>
            <Form
              amount={amount}
              description={description}
              category={category}
              date={date}
              id={id}
              isHighlighted={isHighlighted}
            />
            <div className="confirm-actions">
              <button
                className="cancel-button"
                onClick={closeConfirmUpdateModal}
              >
                Cancel
              </button>
              <button
                className="delete-button update-button"
                onClick={handleUpdateBill}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillListItem;
