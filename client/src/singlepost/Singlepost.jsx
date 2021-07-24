import { useLocation } from "react-router-dom";
import "./singlepost.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";

const Singlepost = () => {
  const { user } = useContext(Context);
  const PF = "http://localhost:5000/images/";
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  //console.log(path);
  //console.log("here");
  const [post, setpost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [upd, setUpd] = useState(false);
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/post/" + path); // post._id is just not working here, idk whyyy.
      console.log(res);
      setpost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]); // whenever the path changes, fire the useEffect hook;

  const handleDel = async () => {
    try {
      await axios.delete(`/post/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpd = async () => {
    try {
      await axios.put(`/post/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      //window.location.reload();   no need to reload.
      setUpd(false);
    } catch (err) {}
  };

  return (
    <div className="singlepost">
      <div className="singlepostwrap">
        {post.photo && <img src={PF + post.photo} alt="" className="spimg" />}
        {upd ? (
          <input
            type="text"
            value={title}
            className="sptitleinput"
            autoFocus
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        ) : (
          <h1 className="sptitle">
            {title}
            {post.username === user?.username && (
              <div className="spud">
                <i class=" ud far fa-edit" onClick={() => setUpd(true)}></i>
                <i class=" ud far fa-trash-alt" onClick={handleDel}></i>
              </div>
            )}
          </h1>
        )}
        <div className="spinfo">
          <span className="spauthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b> {post.username} </b>
            </Link>
          </span>
          <span className="spdate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {upd ? (
          <textarea
            className="spdescinput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        ) : (
          <p className="spdesc">{desc}</p>
        )}
        {upd && (
          <button className="spupdbtn" onClick={handleUpd}>
            UPDATE
          </button>
        )}
      </div>
    </div>
  );
};

export default Singlepost;
