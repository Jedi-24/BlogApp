import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="headertitles">
        <span className="htsm">React-Node</span>
        <span className="htlg">Blog</span>
      </div>
      <img
        className="headerimg"
        src="https://images.unsplash.com/photo-1487611459768-bd414656ea10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
        alt="Header image"
      />
    </div>
  );
};

export default Header;
