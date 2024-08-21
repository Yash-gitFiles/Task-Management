import React, { useState } from "react";
import styles from "../styles/components/signUp.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/signup",
        userData
      );
      navigate("/login");
      alert(response.data.message);
    } catch (error) {
      console.error("error", error);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2>Sign Up</h2>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={userData.name}
            onChange={(e) => {
              handleChange(e);
            }}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            required
            onChange={(e) => {
              handleChange(e);
            }}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            required
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <button type="submit">Sign Up</button>
        </form>
        <p className={styles.login}>
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
