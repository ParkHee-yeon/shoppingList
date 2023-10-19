import { openModal } from "../../common";
import ProductInfoModal from "./ProductInfoModal";
const SidePopup = ({ recentItemList }) => {
  return (
    <div className="sidePopup">
      <div className="sideBox">
        <span>최근 본 상품</span>
        <ul>
          {recentItemList.map((item) => {
            const clickItemInfo = item;
            return (
              <li
                className="recentList"
                key={item.id}
                onClick={() => {
                  openModal(ProductInfoModal, {clickItemInfo});
                }}
              >
                <img src={item.image} />
                <span>{item.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default SidePopup;
