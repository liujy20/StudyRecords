import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useInit from "../../hooks/userHook";
export default function Main() {
  const userStore = useSelector((state) => {
    return state.userStore;
  });
  const goodStore = useSelector((state) => {
    return state.goodStore;
  });
  // const dispatch=useDispatch()
  const { getGoods, delGood } = useInit();
  useEffect(() => {
    getGoods();
  }, []);
  return (
    <React.Fragment>
      <div>Main</div>
      <p>{userStore.name}</p>
      <p>goodsLength:{goodStore.goods.length}</p>
    </React.Fragment>
  );
}
