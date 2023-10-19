import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <Link to="/">홈</Link>
      <Link to="/cart">장바구니</Link>
    </header>
  );
};
export default Header;
