import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styling/Login.css";

const Login = () => {

  const [usn, setUsn] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { usn, password }
      );

      // Save JWT token
      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      navigate("/home");

    } catch (err) {

      setError("Invalid Credentials");

    }

  };

  return (
    <div className="login-page">

      <div className="login-container">

        <h1 className="login-title">Lost & Found Portal</h1>

        <form onSubmit={handleSubmit} className="login-form">

          <input
            className="login-input"
            type="text"
            placeholder="Enter USN"
            value={usn}
            onChange={(e) => setUsn(e.target.value)}
            required
          />

          <input
            className="login-input"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error-text">{error}</p>}

          <button className="login-btn" type="submit">
            Login
          </button>

        </form>

        {/* REGISTER LINK */}
        <p style={{ marginTop: "15px", textAlign: "center" }}>
          New User?{" "}
          <span
            style={{ color: "#ff6f61", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register Here
          </span>
        </p>

      </div>

    </div>
  );
};

export default Login;
