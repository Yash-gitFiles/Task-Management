import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../styles/pages/adminUserList.module.css";
import UserModal from "./UserModal.jsx";

function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function fetchAllUsers() {
    try {
      const response = await axios.get("http://localhost:8000/admin", {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      await axios.put(
        `http://localhost:8000/admin/${updatedUser._id}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("auth")).token
            }`,
          },
        }
      );

      fetchAllUsers();
      handleCloseModal();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/admin/${userId}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      });

      fetchAllUsers();
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin User List</h1>
      <div className={styles.userList}>
        {users.map((user) => (
          <div
            key={user._id}
            className={styles.userCard}
            onClick={() => handleUserClick(user)}
          >
            <div className={styles.userAvatar}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className={styles.userInfo}>
              <p className={styles.userName}>{user.name}</p>
              <p className={styles.userEmail}>{user.email}</p>
              <p className={styles.userRole}>{user.role}</p>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && selectedUser && (
        <UserModal
          user={selectedUser}
          onClose={handleCloseModal}
          onUpdate={handleUpdateUser}
          onDelete={handleDeleteUser}
        />
      )}
    </div>
  );
}

export default AdminUserList;
