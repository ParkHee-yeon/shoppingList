import { openModal, dropModal, allDropModal, executePost } from "../../common";
import AlertModal from "../popup/AlertModal";
import { openConfirmModal } from "../../common";

const ProductInfoModal = ({ data, componentKey }) => {
  const { clickItemInfo } = data;
  const addCart = () => {
    executePost("cart", clickItemInfo.id)
      .then((res) => {
        allDropModal();
      })
      .catch(console.error);
  };
  return (
    <div className="contentBox">
      <h2>{clickItemInfo.name}</h2>
      <img src={clickItemInfo.image} />
      <p>{clickItemInfo.price} 원</p>
      <button
        className="cartBtn"
        onClick={() => {
          openConfirmModal({
            title: "알림",
            description: "장바구니에 추가하시겠습니까?",
            button: [
              {
                name: "확인",
                callback: () => {
                  addCart(clickItemInfo.id);
                },
              },
              {
                name: "취소",
                callback: () => {
                  allDropModal();
                },
              },
            ],
          });
        }}
      >
        장바구니
      </button>
      <button
        onClick={() => {
          dropModal(componentKey);
        }}
      >
        닫기
      </button>
    </div>
  );
};
export default ProductInfoModal;
