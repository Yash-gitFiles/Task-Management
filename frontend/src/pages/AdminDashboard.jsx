import React, { useState } from "react";
import AdminTaskList from "../components/AdminTaskList";
import AdminUserList from "../components/AdminUserList";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");

  function handleTabChange(value) {
    setActiveTab(value);
  }

  return (
    <div>
      <div>
        <button
          onClick={() => {
            handleTabChange("users");
          }}
        >
          User
        </button>
        <button
          onClick={() => {
            handleTabChange("tasks");
          }}
        >
          Task
        </button>
      </div>
      <div>{activeTab === "users" && <AdminUserList />}</div>
      <div>{activeTab === "tasks" && <AdminTaskList />}</div>
    </div>
  );
}

export default AdminDashboard;
