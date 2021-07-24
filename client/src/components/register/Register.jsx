import "./register.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      //this time we are giving this response, post request.
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      console.log(res);
      res.data && window.location.replace("/login");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  return (
    <div className="R">
      <span className="regtitle">Register</span>
      <form className="regform" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter your Username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          placeholder="Enter your Email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="regbtn" type="submit">
          Register
        </button>
      </form>
      <button className="loginbtn">
        <Link className="link" to="/login">
          LOGIN
        </Link>
      </button>
      {error && (
        <span style={{ color: "red", marginTop: "10px" }}>
          {" "}
          Something went wrong !{" "}
        </span>
      )}
    </div>
  );
};

export default Register;
