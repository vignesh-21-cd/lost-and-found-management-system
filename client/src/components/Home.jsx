import React from "react";
import Navbar from "./Navbar.jsx";
import "./styling/Home.css";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="home-container">

        <header className="hero-section">
          <div className="hero-content">
            <h1 className="main-title">Lost and Found</h1>
            <p className="subtitle">
              Helping you find your lost items or report found items effortlessly.
            </p>
            <a href="/lost" className="btn-primary">Get Started</a>
          </div>
        </header>

        <section className="goals-section">
          <div className="goals-content">
            <h2 className="section-title">Our Goal</h2>
            <p>
              Our mission is to create a trustworthy community where people can easily recover their lost belongings.
            </p>
          </div>
        </section>

      </div>
    </>
  );
};

export default Home;
