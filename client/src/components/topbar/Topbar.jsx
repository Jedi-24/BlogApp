import { Link } from "react-router-dom";
import "./topbar.css";
import { useContext } from "react";
import { Context } from "../../context/Context";

const Topbar = () => {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="topbar">
      <div className="topleft">
        <i className="topicon fab fa-instagram"></i>
        <i className="topicon fab fa-linkedin-in"></i>
      </div>
      <div className="topcentre">
        <ul className="toplist">
          <li className="toplistname">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="toplistname">
            <Link className="link" to="/">
              ABOUT
            </Link>
          </li>
          <li className="toplistname">
            <Link className="link" to="/">
              CONTACT
            </Link>
          </li>
          <li className="toplistname">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="toplistname" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topright">
        {user ? (
          <Link to="/settings">
            <img className="topimg" src={PF + user.profilePic} alt="profile" />
          </Link>
        ) : (
          <ul className="toplist">
            <li className="toplistname">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="toplistname">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className=" topsearchicon fas fa-search"></i>
      </div>
    </div>
  );
};

export default Topbar;
