import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  executeGet,
  executePost,
  executePatch,
  executeDel,
  openModal,
} from "../common";
import SidePopup from "./popup/SidePopup";
import ProductInfoModal from "./popup/ProductInfoModal";

const ShoppingList = () => {
  const [productList, setProductList] = useState([]);
  const [recentItemList, setRecentItemList] = useState([]);

  const [hasMoreState, setHasMoreState] = useState(true);
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState(20);
  const COUNT = 20;

  const getData = (cursor, count) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: productList.slice(cursor, cursor + count),
          page: cursor + count,
          total: productList.length,
        });
      }, 2000);
    });
  };

  const fetchData = () => {
    getData(cursor, COUNT)
      .then((res) => {
        const { data, page, total } = res;
        if (!!data) {
          setItems((prev) => [...prev, ...data]);
        }
        if (!!page) {
          setCursor(page);
        }
        if (page >= total) {
          setHasMoreState(false);
        }
      })
      .catch(console.error);
  };

  const loadRecentItem = () => {
    executeGet("recentItem?_sort=date&_order=desc")
      .then((res) => {
        setRecentItemList(res.data);
      })
      .catch(console.error);
  };

  const addRecentItem = (id) => {
    executeGet(`recentItem?id=${id}`)
      .then((res) => {
        const recentItemInfo = productList.find((item) => item.id === id);
        // 1. 최근항목에 해당 id가 포함되지 않은 경우
        if (res.data.length === 0) {
          // 1-1. 최근 항목의 개수가 5개일 경우
          if (recentItemList.length === 5) {
            executeDel(
              "recentItem",
              recentItemList[recentItemList.length - 1].id
            )
              .then((res) =>
                executePost("recentItem", {
                  ...recentItemInfo,
                  date: new Date().getTime(),
                })
                  .then((res) => loadRecentItem())
                  .catch(console.error)
              )
              .catch(console.error);
          }
          // 1-2. 최근 항목의 개수가 5개 미만일 경우
          else if (recentItemList.length < 5) {
            executePost(`recentItem`, {
              ...recentItemInfo,
              date: new Date().getTime(),
            })
              .then((res) => {
                loadRecentItem();
              })
              .catch(console.error);
          }
        }
        // 2. 최근항목에 해당 id가 포함된 경우
        else {
          executePatch("recentItem", id, { date: new Date().getTime() })
            .then((res) => {
              loadRecentItem();
            })
            .catch(console.error);
        }
      })
      .catch(console.error);
  };
  
  const onClickItem = (e) => {
    const clickItemInfo = items.find(item=>item.id === Number(e.currentTarget.dataset.id));
    openModal(ProductInfoModal, {clickItemInfo});
    addRecentItem(Number(e.currentTarget.dataset.id));
  }

  useEffect(() => {
    executeGet("product")
      .then((res) => {
        setProductList(res.data);
        setItems(res.data.slice(0, 20));
      })
      .catch(console.error)
      .finally(loadRecentItem());
  }, []);

  return (
    <div id="shoppingList">
      <InfiniteScroll
        dataLength={items.length}
        next={fetchData}
        hasMore={hasMoreState}
        loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>The End!!</b>
          </p>
        }
      >
        <div className="listBox">
          <ul>
            {items.map((item) => {
              return (
                <li
                  key={item.id}
                  data-id={item.id}
                  onClick={onClickItem}
                >
                  <div className="productBox">
                    <img src={item.image} />
                    <div className="productInfo">
                      <p>{item.name}</p>
                      <p>{item.price}원</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <SidePopup recentItemList={recentItemList} />
      </InfiniteScroll>
    </div>
  );
};
export default ShoppingList;
