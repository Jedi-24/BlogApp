import Header from "../header/Header";
import { useState, useEffect } from "react";

import Posts from "../posts/Posts";
import Sidebar from "../sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/post" + search);
      console.log(res);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <Header />
      <div className="home">
        <Posts allPosts={posts} />
        <Sidebar />
      </div>
    </>
  );
};

export default Home;
