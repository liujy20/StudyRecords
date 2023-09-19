import React, { useEffect, useState } from "react";
import { Button, Card, Table, Space, Modal, Form, Input } from "antd";
import {} from "react-router-dom";
import { addRoles, findRoles } from "../../apis/roleApi";
import MyDrawer from "../../components/MyDrawer";

export default function Role() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState([]);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    getRole();
  }, []);
  const getRole = async () => {
    let res = await findRoles();
    console.log(res.data);
    setData(res.data.data);
  };
  const onOpen = (data) => {
    setOpen(true);
    console.log(data);
    setInfo(data);
  };
  const onClose = () => {
    setOpen(false);
  };
  const columns = [
    {
      title: "修改人",
      dataIndex: "authUser",
    },
    {
      title: "角色",
      dataIndex: "name",
    },
    { title: "创建时间", dataIndex: "createTime" },
    { title: "修改时间", dataIndex: "authTime" },
    {
      title: "操作",
      render: (_, item) => (
        <Space>
          <Button onClick={() => onOpen(item)}>修改</Button>
          <Button>删除</Button>
        </Space>
      ),
    },
  ];
  const addRole = () => {
    setVisible(true);
  };
  const closeBox = () => {
    setVisible(false);
  };
  const onFinish = async ({ name }) => {
    console.log("Success:", name);
    let res = await addRoles({
      name,
      createTime: new Date().toLocaleString(),
    });
    console.log(res);
  };
  return (
    <React.Fragment>
      <Card
        title="商品列表"
        extra={<Button onClick={addRole}>添加角色</Button>}
        style={{
          width: "100%",
          margin: "20px 0",
        }}
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
      <MyDrawer open={open} onClose={onClose} info={info}></MyDrawer>
      <Modal title="添加角色" open={visible} onCancel={closeBox} footer={null}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="name"
            rules={[
              {
                required: true,
                message: "请输入角色名",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              添加
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
}
