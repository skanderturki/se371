
function Header(props) {
  const banner = props.banner;
  return (
    <header>
      <h1>{banner}</h1>
    </header>
  );
}

export default Header;