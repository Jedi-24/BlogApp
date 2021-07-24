import "./login.css";
import { Link } from "react-router-dom";
import { useRef, useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios"; // do not write {axios} or else post request nhi jayegi aur lawde lg jayenge... fir try block me nhi catch block me
//miloge seedha... smjhe bsdikee.

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" }); //dispatch is just an alias for action in context API. -- GOOGLE.
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value, // this key aka "username" is connected to the req.body.username used in logic building inside auth route in backend API
        password: passwordRef.current.value, //very useful beyyy
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  //console.log(user);
  return (
    <div className="LR">
      <span className="logintitle">Login</span>
      <form className="loginform" onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" placeholder="Enter your Username..." ref={userRef} />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginbutton" type="submit" disabled={isFetching}>
          LOGIN
        </button>
      </form>
      <button className="regisbtn">
        <Link className="link" to="/register">
          REGISTER
        </Link>
      </button>
    </div>
  );
};

export default Login;
