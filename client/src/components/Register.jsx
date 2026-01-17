import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styling/Login.css"; // reuse same styling

const Register = () => {

  const [usn, setUsn] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post("http://localhost:5000/api/auth/register", {
        usn,
        password
      });

      alert("Registration Successful!");
      navigate("/");

    } catch (err) {

      setError(err.response?.data?.message || "Registration Failed");

    }
  };

  return (
    <div className="login-page">

      <div className="login-box">

        <h2>Register</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="USN"
            value={usn}
            onChange={(e) => setUsn(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit">Register</button>

        </form>

        <p style={{ marginTop: "10px" }}>
          Already have an account?  
          <span
            style={{ color: "#ff6f61", cursor: "pointer", marginLeft: "5px" }}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>

      </div>

    </div>
  );
};

export default Register;
