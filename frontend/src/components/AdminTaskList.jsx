import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskModal from "./TaskModal";
import styles from "../styles/pages/adminTaskList.module.css";

function AdminTaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/task", {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      });
      setTasks(response.data.tasks);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch tasks. Please try again later.");
      setLoading(false);
    }
  };

  const openModal = (task = null) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(false);
  };

  const handleSave = () => {
    fetchTasks();
    closeModal();
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <h1>Admin Task List</h1>
      <button onClick={() => openModal()} className={styles.createButton}>
        Create Task
      </button>
      {tasks.length > 0 ? (
        <div className={styles.taskList}>
          {tasks.map((task) => (
            <div key={task._id} className={styles.task}>
              <h3>{task.title}</h3>
              <p>{task.desc}</p>
              <p>Assigned to: {task.assignTo?.name || "Unassigned"}</p>
              <p>Email: {task.email}</p>
              <p>Status: {task.completed ? "Completed" : "Incomplete"}</p>
              <p>Created: {new Date(task.createdAt).toLocaleString()}</p>
              <p>Last Updated: {new Date(task.updatedAt).toLocaleString()}</p>
              <button
                onClick={() => openModal(task)}
                className={styles.editButton}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noTasks}>No tasks available</div>
      )}
      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        taskToEdit={taskToEdit}
        onSave={handleSave}
      />
    </div>
  );
}

export default AdminTaskList;
