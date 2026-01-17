import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar.jsx";
import "./styling/Lost.css";

const Lost = () => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/items")
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
        alert("Error fetching items");
      });
  }, []);

  const handleSearch = () => {
    if (query.trim() === "") {
      axios
        .get("http://localhost:5000/api/items")
        .then((res) => {
          setItems(res.data);
        })
        .catch((err) => {
          console.error("Error fetching items:", err);
          alert("Error fetching items");
        });
    } else {
      axios
        .get(`http://localhost:5000/api/items/search?search=${query}`)
        .then((res) => {
          setItems(res.data);
          console.log(items);
        })
        .catch((err) => {
          console.error("Error searching items:", err);
          alert("Error searching items");
        });
    }
  };

  return (
    <div>
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
            <img src={`http://localhost:5000/${item.image}`} alt={item.name} />
            <div
              className="item-details"
              style={{ color: "white", fontSize: "1.4em" }}
            >
              <p>Name: {item.name}</p>
              <p>USN: {item.usn}</p>
              <p>Phone: {item.phone}</p>
              <p>Location: {item.location}</p>
              <p>description: {item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lost;
