import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/pages/userTaskList.module.css";

function UserTaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/userTask", {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      });
      setTasks(response.data.task);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch tasks. Please try again later.");
      setLoading(false);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    console.log(taskId);
    try {
      await axios.put(
        `http://localhost:8000/userTask/${taskId}`,
        { completed: newStatus === "completed" },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("auth")).token
            }`,
          },
        }
      );
      setTasks(
        tasks.map((task) =>
          task._id === taskId
            ? { ...task, completed: newStatus === "completed" }
            : task
        )
      );
    } catch (err) {
      console.error("Failed to update task status:", err);
      alert("Failed to update task status. Please try again.");
    }
  };

  if (loading) return <div className={styles.loading}>Loading tasks...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Task List</h1>
      <div className={styles.taskList}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className={styles.taskCard}>
              <h2 className={styles.taskTitle}>{task.title}</h2>
              <p className={styles.taskDesc}>{task.desc}</p>
              <div className={styles.taskStatus}>
                <label htmlFor={`status-${task._id}`}>Status: </label>
                <select
                  id={`status-${task._id}`}
                  value={task.completed ? "completed" : "incomplete"}
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  className={styles.statusDropdown}
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </div>
    </div>
  );
}

export default UserTaskList;
