import "./App.css";
import Header from "./component/Header";
import ShoppingList from "./component/ShoppingList";
import Cart from "./component/Cart";
import ModalContainer from "./component/ModalContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  console.log("window.cache", window.caches);
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ShoppingList />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
      <ModalContainer />
    </>
  );
}
export default App;
