import React, { useState } from "react";
import styles from "../styles/components/userModal.module.css";

function UserModal({ user, onClose, onUpdate, onDelete }) {
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = () => {
    onUpdate(updatedUser);
  };

  const handleDelete = () => {
    onDelete(user._id);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h2>Edit User</h2>
        <input
          type="text"
          name="name"
          value={updatedUser.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="email"
          value={updatedUser.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="role"
          value={updatedUser.role}
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit}>Update</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default UserModal;
