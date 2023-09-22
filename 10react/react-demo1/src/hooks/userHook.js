import { useDispatch } from "react-redux";
import { goodFindAll } from "../redux/actions";
import { findAllGoods } from "../apis/goodApi";

const useInit = () => {
  const dispatch = useDispatch();
  const getGoods = async () => {
    let res = await findAllGoods();
    // console.log('hook',res);
    dispatch(goodFindAll(res.data.data));
  };
  const delGood = () => {};
  return { getGoods, delGood };
};

export default useInit;
