import "./header.css"

const Header = () => {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Funzzzz</span>
        <span className="headerTitleLg">BLOG</span>
      </div>
      <img
        className="headerImg"
        src="https://wallpaperaccess.com/full/923586.jpg"
        alt=""
      />
    </div>
  );
}

export default Header