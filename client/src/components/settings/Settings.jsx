import { Context } from "../../context/Context";
import Sidebar from "../sidebar/Sidebar";
import "./settings.css";
import { useContext, useState } from "react";
import axios from "axios";

const Settings = () => {
  const PF = "http://localhost:5000/images/";
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPD_START" });
    const updUser = {
      userid: user._id, // do not write userId cause in the API's users route's logic its userid.
      username,
      email,
      password,
    };
    // creating photo logic, jo meri smjh ke bahar hai.
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name; // date.now() is for uniqueness, diff images shouldn't have same name.(UID can also be used for uniqueness)
      data.append("name", filename);
      data.append("file", file);
      updUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    // sir ke uppar se gyaa uppar ka code.
    try {
      const res = await axios.put("/user/" + user._id, updUser);
      setSuccess(true);
      dispatch({ type: "UPD_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPD_FAILURE" });
    }
  };

  return (
    <div className="settings">
      <div className="setwrap">
        <div className="settitle">
          <span className="setupdtitle">Update your account</span>
          <span className="setdeltitle">Delete your account</span>
        </div>
        <form className="setform" onSubmit={handleSubmit}>
          <label htmlFor="">Profile Picture:</label>
          <div className="setprofile">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilePic}
              alt=""
            />
            <label htmlFor="fileinput">
              <i class=" setproficon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileinput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="setupdate" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", margin: "20px" }}
            >
              {" "}
              PROFILE HAS BEEN UPDATED !
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Settings;
