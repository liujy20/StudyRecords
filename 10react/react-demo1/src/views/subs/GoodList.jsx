import React from "react";
import { Space, Button, Select, Input, Card, Table } from "antd";

const options = [
  {
    value: "zhejiang",
    label: "Zhejiang",
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
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
const data = [
  {
    _id: "5fbfa53461d8a9055011ac20",
    name: "小米10",
    title: "至尊纪念版 双模5G 骁龙865 120HZ高刷新率 ",
    price: 299,
    type: {
      _id: "5fbccd4aea6c0000ff007f33",
      name: "数码产品",
      parentId: "0",
      type: "一级分类",
      updateDate: null,
    },
    imgSrc: "3.jpg",
    msg: "商品名称：小米10至尊纪念版商品编号：100014565820商品毛重：0.8kg商品产地：中国大陆CPU型号：骁龙865运行内存：12GB机身存储：256GB存储卡：不支持存储卡摄像头数量：后置四摄后摄主摄像素：4800万像素前摄主摄像素：2000万像素主屏幕尺寸（英寸）：6.67英寸分辨率：全高清FHD+屏幕比例：19.6~20:9屏幕前摄组合：开孔屏充电器：其他热点：液冷散热，人脸识别，无线充电，快速充电，NFC，屏幕指纹，曲面屏，5G，超高屏占比，屏幕高刷新率特殊功能：超大字体，超大音量，语音识别(文字语音互转)，极简桌面模式屏占比：≥92%操作系统：Android(安卓)游戏配置：液冷散热游戏性能：发烧级充电功率：100W以上",
    createDate: "2020-11-26T12:53:08.611Z",
    updateDate: "2020-11-27T02:18:09.629Z",
    delstate: 1,
    state: 0,
  },
  {
    _id: "5fc0aef526420000dc005038",
    name: "三星Galaxy Z Fold2 5G",
    title:
      "5G(SM-F9160)折叠屏 双模5G手机 骁龙865+ 内外双屏 120Hz自适应屏幕 12GB+512GB迷雾金",
    price: 16990,
    type: {
      _id: "5fbccd4aea6c0000ff007f33",
      name: "数码产品",
      parentId: "0",
      type: "一级分类",
      updateDate: null,
    },
    imgSrc: "4.jpg",
    msg: "商品名称：三星Galaxy Z Fold2 5G商品编号：100008483105商品毛重：0.78kg商品产地：越南CPU型号：骁龙865 plus运行内存：12GB机身存储：512GB存储卡：不支持存储卡摄像头数量：后置三摄后摄主摄像素：1200万像素前摄主摄像素：1000万像素主屏幕尺寸（英寸）：7.6英寸分辨率：QXGA+屏幕比例：22.5：18屏幕前摄组合：开孔屏充电器：9V/2.77A热点：人脸识别，无线充电，快速充电，NFC，屏幕指纹，5G，超高屏占比，折叠屏，屏幕高刷新率屏占比：≥90%游戏性能：发烧级操作系统：Android(安卓)",
    delstate: 1,
    state: 1,
  },
];

export default function GoodList() {
  return (
    <React.Fragment>
      <div>
        <Space.Compact
          style={{
            width: "30%",
          }}
        >
          <Select defaultValue="Zhejiang" options={options} />
          <Input placeholder="Combine input and button" />
          <Button type="primary">搜索</Button>
        </Space.Compact>
      </div>
      <Card
        title="商品列表"
        extra={<span>More</span>}
        style={{
          width: "100%",
          margin: "20px 0",
        }}
      >
        <Table columns={columns} dataSource={data} />
      </Card>
    </React.Fragment>
  );
}
