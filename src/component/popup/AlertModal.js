import { allDropModal, dropModal, executePost } from "../../common";

const AlertModal = ({ data, componentKey }) => {
  const { clickItemInfo } = data;
  const addCart = () => {
    executePost("cart", clickItemInfo.id)
      .then((res) => {
        allDropModal();
      })
      .catch(console.error);
  };
  return (
    <div className="alertBox">
      <h3>장바구니에 해당 항목을 추가하시겠습니까?</h3>
      <div>
        <button
          className="addBtn"
          onClick={() => {
            addCart();
          }}
        >
          확인
        </button>
        <button
          className="cancelBtn"
          onClick={() => {
            dropModal(componentKey);
          }}
        >
          취소
        </button>
      </div>
    </div>
  );
};
export default AlertModal;
