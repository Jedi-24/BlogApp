import Post from "../post/Post";
import "./posts.css";

const Posts = ({ allPosts }) => {
  return (
    <div className="posts">
      {allPosts.map((p) => (
        <Post post={p} />
      ))}
    </div>
  );
};

export default Posts;
