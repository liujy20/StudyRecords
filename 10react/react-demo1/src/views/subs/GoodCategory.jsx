import React, { useEffect, useState } from "react";
import { Button, Card, Table, Space, Modal, Form, Input, Select, message } from "antd";
import { addCategroy, deleteCateGroy, findCategroy } from "../../apis/categoryApi";

export default function GoodCategory() {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState(true);
  const [isHidden, setIsHidden] = useState(true);
  const clear=()=>{
    setIsHidden(true)
    form.resetFields()
  }
  const showModal = () => {
    setIsModalOpen(true);
    clear()
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    getCategory();
  }, []);

  const columns = [
    {
      title: "类型名称",
      dataIndex: "name",
    },
    {
      title: "类别",
      dataIndex: "type",
    },
    {
      title: "操作",
      render: (_, item) => (
        <Space>
          {item.type ==='一级分类'?<Button type="primary" onClick={() => getSub(item)}>
            查看子分类
          </Button>:null}
          <Button onClick={()=>delCategory(item)}>删除</Button>
        </Space>
      ),
    },
  ];
  const getCategory = async () => {
    let res = await findCategroy({ parentId: 0 });
    console.log(res.data);
    setData(res.data.data.data);
    setStatus(true);
  };
  const getSub = async (item) => {
    let res = await findCategroy({ parentId: item._id });
    console.log(res.data);
    setData(res.data.data.data);
    setStatus(false);
  };
  const delCategory=async (item)=>{
    console.log('delID',item._id);
    let res=await deleteCateGroy({id:item._id})
    console.log(res.data);
    if(res.data.code){
      message.success(res.data.msg)
      getCategory()
    }
  }
  const handleTypeChange = (value) => {
    console.log(`selected ${value}`);
    if (value === "二级分类") {
      setIsHidden(false);
    } else {
      setIsHidden(true);
    }
  };
  const handleIdChange = (value) => {
    console.log(`selected ${value}`);
  };
  // 校验成功
  const onFinish = async (values) => {
    console.log("Success:", values);
    if (values.type === "一级分类") {
      values.parentId = 0;
    }
    let res = await addCategroy(values);
    console.log(res.data);
    getCategory()
    handleOk()
  };
  // 校验失败
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Card
        title="分类列表"
        extra={
          status ? (
            <Button onClick={showModal}>添加</Button>
          ) : (
            <Button onClick={getCategory}>返回</Button>
          )
        }
        style={{ width: "100%" }}
      >
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={data}
          pagination={{
            pageSizeOptions: [5, 10, 20],
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </Card>
      <Modal
        title="添加分类"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          form={form}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            width: "100%",
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
          
            label="分类名称"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
          initialValue="一级分类"
            label="分类类型"
            name="type"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Select
              onChange={handleTypeChange}
              options={[
                {
                  value: "一级分类",
                  label: "一级分类",
                },
                {
                  value: "二级分类",
                  label: "二级分类",
                },
              ]}
            ></Select>
          </Form.Item>
          <Form.Item
          initialValue="5fbccd29ea6c0000ff007f32"
            hidden={isHidden}
            label="父级类型"
            name="parentId"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Select
              onChange={handleIdChange}
              options={data.map((item) => {
                return {
                  label: item.name,
                  value: item._id,
                };
              })}
            ></Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button onClick={handleCancel}>取消</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
