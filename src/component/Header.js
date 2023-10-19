import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <h2>수정본임다 ~</h2>
      <Link to="/">홈</Link>
      <Link to="/cart">장바구니</Link>
    </header>
  );
};
export default Header;
