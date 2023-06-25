import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import API from "../utils/api";
import { AppContext } from "../AppContext";
import { useContext } from "react";

function Register() {
  const { isLoading, setIsLoading } = useContext(AppContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleRegisterFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await API.post("/register", {
        name,
        username,
        email,
        password,
        age,
        gender,
      });
      setIsLoading(false);
      setMessage("Success! you can login now");
      setTimeout(() => {
        setMessage("");
        setError("");
        navigate("/login");
      }, 1500);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      if (err.response.data) setError(err.response.data.error);
      else setError("Something went wrong");
    }
  };

  return (
    <>
      <Navbar active={"register"} />
      <div className="register-page">
        <div className="register-form-container">
          <h2>Register</h2>
          <form onSubmit={handleRegisterFormSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                min={5}
                max={120}
                value={age}
                onChange={handleAgeChange}
              />
            </div>
            <div className="form-group gender-radio-group">
              <label>Gender</label>
              <div className="gender-radio-group">
                <label htmlFor="male">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={handleGenderChange}
                  />
                  Male
                </label>
                <label htmlFor="female">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={handleGenderChange}
                    required
                  />
                  Female
                </label>
              </div>
            </div>

            {(message != "" || error != "") && (
              <div className={`message ${error ? "error" : ""}`}>
                {error ? error : message}
              </div>
            )}
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
