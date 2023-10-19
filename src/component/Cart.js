import { executeGet, executeDel } from "../common";
import { useEffect, useState } from "react";
const Cart = () => {
  const [cartDetail, setCartDetail] = useState([]);

  const loadCartDetail = () => {
    executeGet("cart")
      .then((res) => {
        const cartId = res.data;
        const idArr = cartId.map((item) => `id=${item.id}`).join("&");
        executeGet(`product?${idArr}`)
          .then((res) => setCartDetail(res.data))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadCartDetail();
  }, []);

  const calcPriceTotal = () => {
    return cartDetail
      .reduce((acc, item) => {
        return acc + item.price;
      }, 0)
      .toLocaleString("en");
    /*
    cartDetail.forEach((item) => {
      const priceTotal += item.price;
      return priceTotal;
    });
    return priceTotal.toLocaleString("en");
    */
  };

  return (
    <div className="cartListBox">
      <table className="cart__list">
        <thead>
          <tr>
            {/*
            <td>
              <input type="checkbox" />
            </td>
            */}
            <td>번호</td>
            <td>상품이미지</td>
            <td>상품명</td>
            <td>상품금액</td>
            <td>삭제</td>
          </tr>
        </thead>
        <tbody>
          {cartDetail.map((item, idx) => {
            return (
              <tr className="cart__list__detail">
                {/*
                <td>
                  <input type="checkbox" />
                </td>
                */}
                <td>{idx + 1}</td>
                <td>
                  <img src={item.image} />
                </td>
                <td>
                  <span>{item.name}</span>
                </td>
                <td>
                  <span className="price">{item.price}원</span>
                </td>
                <td>
                  <button
                    onClick={() => {
                      executeDel("cart", item.id)
                        .then((res) => console.log(res))
                        .catch((error) => console.log(error))
                        .finally(loadCartDetail());
                    }}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th>합계</th>
            <td colSpan="4">{calcPriceTotal()}원</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
export default Cart;
