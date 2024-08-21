import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/components/taskModal.module.css";

function TaskModal({ isOpen, onClose, taskToEdit, onSave }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [email, setEmail] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDesc(taskToEdit.desc);
      setEmail(taskToEdit.email);
      setCompleted(taskToEdit.completed);
    } else {
      setTitle("");
      setDesc("");
      setEmail("");
      setCompleted(false);
    }
  }, [taskToEdit]);

  const handleSave = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("auth")).token;
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      if (taskToEdit) {
        await axios.put(
          `http://localhost:8000/task/${taskToEdit._id}`,
          { title, desc, email, completed },
          { headers }
        );
      } else {
        try {
          await axios.post(
            "http://localhost:8000/task",
            { title, desc, email },
            { headers }
          );

          onClose();
        } catch (error) {
          const alertMsg = error.response.data.message;
          alert(alertMsg);
          onClose();
        }
      }
      onSave();
    } catch (err) {
      console.error("Failed to save task:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <span className={styles.close} onClick={onClose}>
            &times;
          </span>
          <h2>{taskToEdit ? "Update Task" : "Create Task"}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <label className={styles.label}>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className={styles.input}
              />
            </label>
            <label className={styles.label}>
              Description:
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
                className={styles.textarea}
              />
            </label>
            <label className={styles.label}>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
              />
            </label>
            {taskToEdit && (
              <label className={styles.label}>
                Completed:
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={() => setCompleted(!completed)}
                  className={styles.checkbox}
                />
              </label>
            )}
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.saveButton}>
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
