/* eslint-disable react/prop-types */
import { useState } from "react";

const BillListItem = ({ amount, description, category, date, id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="item-row">
      <div className="item-amount">{amount}</div>
      <div className="item-description">{description}</div>
      <div className="item-category">{category}</div>
      <div className="item-date">{date}</div>
      <div className="item-actions" onClick={toggleModal}>
        &#8942;
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <button className="modal-button" onClick={() => console.log(id)}>
            Edit
          </button>
          <button className="modal-button" onClick={() => console.log(id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BillListItem;
