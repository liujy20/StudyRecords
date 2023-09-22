import React,{useEffect} from "react";
import { useSelector } from "react-redux";
import useInit from "../../hooks/userHook";
export default function Main() {
  const data = useSelector((state) => {
    return state;
  });
  // const dispatch=useDispatch()
  const {getGoods,delGood}=useInit()
  useEffect(() => {
    getGoods()
  }, [])
  return (
    <React.Fragment>
      <div>Main</div>
      <p>{data.userStore.name}</p>
      <p>goodsLength:{data.goodStore.goods.length}</p>
    </React.Fragment>
  );
}
