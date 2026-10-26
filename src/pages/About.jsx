import React from "react";
import "./About.css";

function About() {
  return (
    <div className="container about-page">
      <h1 className="section-title">Aurora</h1>
      <p className="section-subtitle">
        Why we built this and how it works
      </p>

      <div className="about-block">
        <h3>The Problem</h3>
        <p>
          Every semester, students lose items like ID cards, bottles, chargers,
          and bags on campus. Found items usually end up sitting at a security
          desk with no easy way for owners to know they exist.
        </p>
      </div>

      <div className="about-block">
        <h3>Our Solution</h3>
        <p>
          Aurora lets students browse found items like a marketplace, and
          claim their belongings by answering a few verification questions
          that only the real owner would know.
        </p>
      </div>

      <div className="about-block">
        <h3>Why Verification Matters</h3>
        <p>
          To prevent someone from falsely claiming another student's item, we
          don't reveal private identifying details publicly. Only after a
          claim is submitted and reviewed is the item handed over.
        </p>
      </div>

      <div className="about-block">
        <h3>Who Made This</h3>
        <p>
          Aurora was built by a team of three second-year CSE (AI/ML)
          students as a Front-End Engineering project.
        </p>
      </div>
    </div>
  );
}

export default About;