import React, { useEffect, useState } from "react";
import {findAllGoods, findGoodsByName}from '../../apis/goodApi'
import { Space, Button, Select, Input, Card, Table } from "antd";
import {Link} from 'react-router-dom'

const options = [
  {
    value: "name",
    label: "商品名称",
  },
  {
    value: "title",
    label: "商品描述",
  },
];
const columns = [
  {
    title: "商品名字",
    dataIndex: "name",
  },
  {
    title: "商品描述",
    dataIndex: "title",
  },
  {
    title: "商品价格",
    dataIndex: "price",
    width:'100px'
  },
  {
    title: "商品类型",
    dataIndex: "type",
    width:'100px',
    render: (item) => <span>{item.name}</span>,
  },
  {
    title: "商品状态",
    dataIndex:'state',
    render: (item) => <Space>
      {item?<Button>下架</Button>:<Button>上架</Button>}
    </Space>,
  },
  {
    title: "操作",
    render: () => (
      <Space>
        <Button danger>删除</Button>
        <Button>修改</Button>
      </Space>
    ),
  },
];

export default function GoodList() {
  const [data,setData]=useState([])
  const [type,setType]=useState('name')
  const [input,setInput]=useState('')
  useEffect(()=>{
    getList()
  },[])
  const getList=async ()=>{
    let res=await findAllGoods()
    console.log(res);
    setData(res.data.data)
  }
  const search=async ()=>{
    console.log(type,input);
    let res=await findGoodsByName({
      searchType:type,
      searchData:input
    })
    console.log(res);
    setData(res.data.data)
  }
  return (
    <React.Fragment>
      <div>
        <Space.Compact
          style={{
            width: "30%",
          }}
        >
          <Select defaultValue="name" onChange={(val)=>setType(val)} options={options} />
          <Input placeholder="请输入搜索信息" onChange={(val)=>setInput(val.target.value)}/>
          <Button type="primary" onClick={search}>搜索</Button>
        </Space.Compact>
      </div>
      <Card
        title="商品列表"
        extra={<Link to="/home/good/addgood">添加数据</Link>}
        style={{
          width: "100%",
          margin: "20px 0",
        }}
      >
        <Table rowKey="_id" columns={columns} dataSource={data} pagination={{
          pageSizeOptions:[5,10,20],
          showSizeChanger:true,
          showQuickJumper:true
        }}/>
      </Card>
    </React.Fragment>
  );
}
