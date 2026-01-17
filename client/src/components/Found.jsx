import axios from "axios";
import React, { useState } from "react";
import Navbar from "./Navbar";
import "./styling/Found.css";

const Found = () => {

  const [formData, setFormData] = useState({
    name: "",
    usn: "",
    phone: "",
    location: "",
    description: "",
    status: "found",
    image: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const token = localStorage.getItem("token");

    const data = new FormData();

    data.append("name", formData.name);
    data.append("usn", formData.usn);
    data.append("phone", formData.phone);
    data.append("location", formData.location);
    data.append("description", formData.description);
    data.append("status", formData.status);
    data.append("image", formData.image);

    try {

      const res = await axios.post(
        "http://localhost:5000/api/items",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      console.log("UPLOAD SUCCESS:", res.data);
      alert("Item Uploaded Successfully");

    } catch (error) {

      console.log(error.response?.data || error.message);
      alert("Upload Failed");

    }
  };

  return (
    <>
      <Navbar />

      <div className="main-content">

        <div className="found-form-container">

          <h1>Report Found Item</h1>

          <form onSubmit={handleSubmit} className="found-form">

            <input
              className="input-field"
              name="name"
              onChange={handleChange}
              placeholder="Name"
              required
            />

            <input
              className="input-field"
              name="usn"
              onChange={handleChange}
              placeholder="USN"
              required
            />

            <input
              className="input-field"
              name="phone"
              onChange={handleChange}
              placeholder="Phone"
              required
            />

            <input
              className="input-field"
              name="location"
              onChange={handleChange}
              placeholder="Location"
              required
            />

            <textarea
              className="input-field textarea-field"
              name="description"
              onChange={handleChange}
              placeholder="Description"
              required
            />

            <input
              className="input-field file-field"
              type="file"
              onChange={handleFileChange}
              required
            />

            <button className="submit-button" type="submit">
              Submit
            </button>

          </form>

        </div>

      </div>
    </>
  );
};

export default Found;
