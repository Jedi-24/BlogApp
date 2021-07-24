import "./sidebar.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [cats, setcats] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setcats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebaritem">
        <span className="sidebartitle">ABOUT ME</span>
        <img
          className="sidebarimg"
          src="https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171__340.jpg"
          alt=""
        />
        <p className="sidebartext">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
          dolores, et iusto reprehenderit consequuntur incidunt.
        </p>
      </div>
      <div className="sidebaritem">
        <span className="sidebartitle">CATEGORIES</span>
        <ul className="sidebarlist">
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
              <li className="sidebarlistitem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebaritem">
        <span className="sidebartitle">FOLLOW US</span>
        <div className="sidebarsocials">
          <i className="sidebaricon fab fa-instagram"></i>
          <i className="sidebaricon fab fa-linkedin-in"></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
