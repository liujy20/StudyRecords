import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { userChange } from '../../redux/actions'
export default function Main() {
  const data = useSelector((state) => {
    return state.userStore;
  });
  const dispatch=useDispatch()
  useEffect(() => {
    // console.log(data);
    // dispatch(userChange('llllllxwg'))
    // console.log(data);
  }, [])
  return (
    <React.Fragment>
      <div>Main</div>
      <p>{data.name}</p>
    </React.Fragment>
  );
}
