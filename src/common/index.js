import axios from "../api/index";
import ConfirmModal from "../component/popup/ConfirmModal";
import {
  modalAllHide,
  modalHide,
  modalShow,
} from "../redux/modules/modalReducer";

// 공통 모달 관련 함수
let _store = null;

export const init = (store) => {
  _store = store;
};

/**
 * openConfirmModal({
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
 */
export const openConfirmModal = (data) => {
  const modalData = {
    key: new Date().getTime(),
    Component: ConfirmModal,
    isOpen: true,
    data,
  };
  _store.dispatch(modalShow(modalData));
};

export const openModal = (component, data) => {
  const modalData = {
    key: new Date().getTime(),
    Component: component,
    isOpen: true,
    data: data,
  };
  _store.dispatch(modalShow(modalData));
};

export const dropModal = (key) => {
  _store.dispatch(modalHide(key));
};

export const allDropModal = () => {
  _store.dispatch(modalAllHide());
};

// axios 통신 공통 함수
export const executeGet = (URL) => {
  return axios.get(`/${URL}`);
};

export const executePost = (URL, items) => {
  return axios.post(`/${URL}`, items);
};

export const executePut = (URL, items) => {
  return axios.put(`/${URL}`, items);
};

export const executePatch = (URL, id, obj) => {
  return axios.patch(`/${URL}/${id}`, obj);
};

export const executeDel = (URL, id) => {
  return axios.delete(`/${URL}/${id}`);
};
