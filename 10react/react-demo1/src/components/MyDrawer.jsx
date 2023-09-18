import React, { useState,useEffect } from "react";
import { Drawer, Tree, Button, message } from "antd";
import treeData from "../configs/treeData";
import { addAuth } from "../apis/roleApi";
export default function MyDrawer({ open, onClose, info }) {
  const [menus, setMenus] = useState(info.menus);
  useEffect(() => {
    setMenus(info.menus);
  }, [info.menus]);
  const onCheck = (checkedKeys, info) => {
    setMenus(checkedKeys);
    console.log("onCheck", checkedKeys, info);
  };
  const sumbit = async () => {
    console.log(menus);
    let res = await addAuth({
      id: info._id,
      authTime: new Date().toLocaleString(),
      authUser: "xiaofei",
      menus: menus,
    });

    if(res.data.code){
    message.success(res.data.msg)
    onClose()
    }
  };
  return (
    <React.Fragment>
      <Drawer title="权限修改" placement="right" onClose={onClose} open={open}>
        <Tree
          checkable
          defaultExpandedKeys={["/home/good", "/home/finance"]}
          defaultCheckedKeys={info.menus}
          checkedKeys={menus}
          onCheck={onCheck}
          treeData={treeData}
        />
        <Button onClick={sumbit}>修改授权</Button>
      </Drawer>
    </React.Fragment>
  );
}
