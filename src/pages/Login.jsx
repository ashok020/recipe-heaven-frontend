import { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import API from "../utils/api";
import { AppContext } from "../AppContext";
function Login() {
  const navigate = useNavigate();
  const { handleLogin, handleLogout } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", {
        username,
        password,
      });
      const token = await res.token;
      handleLogin(token);
      setMessage("Sucess! Redirecting to Home");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      if (err.response.data) setError(err.response.data.error);
      else setError("Something went wrong");
    }
  };

  return (
    <>
      <Navbar active={"login"} handleLogout={handleLogout} />
      <div className="login-page">
        <div className="login-form-container">
          <h2>Login</h2>
          <form onSubmit={handleLoginFormSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username/Email</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
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

            {(message != "" || error != "") && (
              <div className={`message ${error ? "error" : ""}`}>
                {error ? error : message}
              </div>
            )}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
