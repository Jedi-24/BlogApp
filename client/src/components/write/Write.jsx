import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    // creating photo logic, jo meri smjh ke bahar hai.
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name; // date.now() is for uniqueness, diff images shouldn't have same name.(UID can also be used for uniqueness)
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    // sir ke uppar se gyaa uppar ka code.
    try {
      const res = await axios.post("/post/", newPost);
      // after the api request, redirecting ourselves to single page.(route is written in app.js iykyk :)
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };
  return (
    <div className="write">
      {file && (
        <img
          src={URL.createObjectURL(file)} // creates URL for the file..
          alt=""
          className="wimg"
        />
      )}

      <form className="writeform" onSubmit={handleSubmit}>
        <div className="wfgrp">
          <label htmlFor="fileinput">
            <i className=" addicon far fa-plus-square"></i>
          </label>
          <input
            type="file"
            id="fileinput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="addtext"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="wfgrp">
          <textarea
            placeholder="Write your own blog..."
            type="text"
            className="addtext writetext"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writesubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default Write;
