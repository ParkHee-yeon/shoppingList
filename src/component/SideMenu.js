const SideMenu = ({ cartList, delCart }) => {
  return (
    <div className="asideBox">
      <ul>
        <span>장바구니</span>
        {cartList.map((item) => {
          return (
            <li>
              {item.name}
              <button
                onClick={() => {
                  delCart(item.id);
                }}
              >
                삭제
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default SideMenu;
