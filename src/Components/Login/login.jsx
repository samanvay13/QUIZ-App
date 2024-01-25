import React from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const navigate = useNavigate();

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function handleForm() {
    if (!email) {
      setEmailError("Email is required");
    } else if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
    }

    if (!name) {
      setNameError("Name is required");
    }

    if (email && isValidEmail(email) && name) {
      setEmailError("");
      setNameError("")
      navigate(
        `/quizpage?email=${encodeURIComponent(email)}&name=${encodeURIComponent(
          name
        )}`,
        { state: { name } }
      );
    }
  }

  return (
    <div className="login-container">
      <div className="card-container">
        <div className="header-welcome">
          <h1>BrainBurst.io</h1>
        </div>
        <div className="login-card">
          <form className="email-input">
            <label>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="example@gmail.com"
            />
            {emailError && <p className="error-message">{emailError}</p>}
            <label>Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
            />
            {nameError && <p className="error-message">{nameError}</p>}
          </form>
          <div className="submit-btn">
            <input
              onClick={handleForm}
              type="button"
              value="Start Quiz"
              id=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};
