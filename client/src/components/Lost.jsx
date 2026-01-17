import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar.jsx";
import "./styling/Lost.css";

const Lost = () => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/items")
      .then((res) => setItems(res.data))
      .catch(() => alert("Error fetching items"));
  }, []);

  const handleSearch = () => {
    if (!query.trim()) {
      axios.get("http://localhost:5000/api/items")
        .then((res) => setItems(res.data));
    } else {
      axios.get(`http://localhost:5000/api/items/search?search=${query}`)
        .then((res) => setItems(res.data));
    }
  };

  return (
    <>
      <Navbar />

      <div className="search">
        <h1>Lost Items</h1>

        <input
          type="text"
          className="inp"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for lost items"
        />

        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="items">
        {items.map((item) => (
          <div key={item._id} className="item">

            <img
              src={`http://localhost:5000/${item.image}`}
              alt={item.name}
            />

            <div className="item-details">
              <p><b>Name:</b> {item.name}</p>
              <p><b>USN:</b> {item.usn}</p>
              <p><b>Phone:</b> {item.phone}</p>
              <p><b>Location:</b> {item.location}</p>
              <p><b>Description:</b> {item.description}</p>
            </div>

          </div>
        ))}
      </div>
    </>
  );
};

export default Lost;
