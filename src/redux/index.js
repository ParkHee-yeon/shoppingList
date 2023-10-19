import { combineReducers } from "redux";
import modalReducer from "./modules/modalReducer";

const rootReducer = combineReducers({
  modalReducer,
});
export default rootReducer;
