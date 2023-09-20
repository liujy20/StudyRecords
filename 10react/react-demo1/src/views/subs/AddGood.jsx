import MyUpload from "../../components/MyUpload";
import React, { useEffect, useState } from "react";
import {
  Button,
  Cascader,
  Form,
  Input,
  InputNumber,
  message,
} from "antd";
import { findAllCategroy } from "../../apis/categoryApi";
import { addGoods } from "../../apis/goodApi";
const { TextArea } = Input;
export default function AddGood() {
  const [category, setCategory] = useState([]);
  const [typeID, setTypeID] = useState("");
  useEffect(() => {
    getCategory();
  }, []);
  const getCategory = async () => {
    let res = await findAllCategroy();
    // console.log(res);
    setCategory(res.data.data);
  };
  const getTypeID = (_, value) => {
    console.log(value);
    setTypeID(value[1].id);
  };
  const getSrc=(src)=>{
    console.log('src',src);
  }
  const onFinish = async (values) => {
    values.type = typeID;
    console.log("Success:", values);
    let res = await addGoods(values);
    console.log(res);
    if (res.data.code) {
      message.success(res.data.msg);
    } else {
      message.error(res.data.msg);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("输入不合法");
  };
  return (
    <>
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        layout="horizontal"
        disabled={false}
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="商品名称"
          name="name"
          rules={[
            {
              required: true,
              message: "请输入商品名称",
            },
            {
              min:3,
              message:'名称长度小于6'
            },
            {
              max:10,
              message:'名称长度大于10'
            },
            {
              pattern:/^[\u4e00-\u9fff]+$/,
              message:'请输入中文'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="商品描述" name="title"
        rules={[
          {
            required: true,
            message: "请输入商品描述",
          },
        ]}>
          <Input />
        </Form.Item>
        <Form.Item label="商品价格" name="price"
        rules={[
          {
            required: true,
            message: "请输入商品价格",
          },
        ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="商品类型" name="type"
        rules={[
          {
            required: true,
            message: "请输入商品类型",
          },
        ]}>
          <Cascader options={category} onChange={getTypeID} />
        </Form.Item>
        <Form.Item label="描述信息" name="msg"
        rules={[
          {
            required: true,
            message: "请输入商品描述信息",
          },
        ]}>
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="上传图片">
          <MyUpload  action="http://localhost:8002/goods/fileUpload" fileName='imgSrc' getSrc={getSrc}></MyUpload>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Button type="primary" htmlType="submit">
            添加
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
