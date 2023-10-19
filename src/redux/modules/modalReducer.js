const MODAL_SHOW = "MODAL_SHOW";
const MODAL_HIDE = "MODAL_HIDE";
const MODAL_ALL_HIDE = "MODAL_ALL_HIDE";

export const modalShow = (data) => {
  return {
    type: MODAL_SHOW,
    data,
  };
};
export const modalHide = (key) => {
  return {
    type: MODAL_HIDE,
    key,
  };
};
export const modalAllHide = () => {
  return {
    type: MODAL_ALL_HIDE,
  };
};

const initialState = {
  components: [],
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_SHOW:
      document.body.style.overflow = "hidden";
      return {
        components: [...state.components, action.data],
      };
    case MODAL_HIDE:
      document.body.style.overflow = "auto";
      const updateComponents = [
        ...state.components.filter((component) => component.key !== action.key),
      ];
      return {
        components: updateComponents,
      };
    case MODAL_ALL_HIDE:
      document.body.style.overflow = "auto";
      return {
        components: [],
      };
    default:
      return state;
  }
};
export default modalReducer;
