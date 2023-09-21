import React from "react";
import { Tag, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { delTab, toTab } from "../redux/actions";
import { Link, useNavigate } from "react-router-dom";
const MyTabs = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const tabStore = useSelector((state) => {
    return state.tabStore;
  });
  const activeTab = (e) => {
    console.log(e.target.getAttribute("href"));
    dispatch(toTab(e.target.getAttribute("href")));
  };
  const close = (e,key) => {
    console.log(e,key);
    e.preventDefault();
    if(key!==tabStore.aliveKey){
      dispatch(delTab(key))
      return
    }
    let index = tabStore.list.findIndex(item=>item.key===key)
    let prevKey=tabStore.list[index-1].key
    console.log(prevKey);
    dispatch(delTab(key))
    dispatch(toTab(prevKey))
    navigate(prevKey)
  };
  return (
    <Space size={[0, 8]} wrap>
      {tabStore.list.map((item, index) => {
        return (
          <Tag
            key={item.key}
            onClick={activeTab}
            color={item.key === tabStore.aliveKey ? "#87d068" : ""}
            closeIcon={index ? true : false}
            onClose={(e)=>close(e,item.key)}
          >
            <Link to={item.key}>{item.name}</Link>
          </Tag>
        );
      })}
    </Space>
  );
};
export default MyTabs;
