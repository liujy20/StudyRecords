const treeData = [
  {
    title: '系统主页',
    key: '/home/main',
  },
  {
    title: '用户管理',
    key: '/home/user',
  },
  {
    title: '角色管理',
    key: '/home/role',
  },
  {
    title: '店铺管理',
    key: '/home/shop',
  },
  {
    title: '商品管理',
    key: '/home/good',
    children: [
      {
        title: '商品列表',
        key: '/home/good/goodlist',
        
      },
      {
        title: '商品分类',
        key: '/home/good/goodcategory',
        
      },
    ],
  },
  {
    title: '财务管理',
    key: '/home/finance',
    children: [
      {
        title: '工资数据',
        key: '/home/Finance/salary',
        
      },
      {
        title: '销售数据',
        key: '/home/Finance/sale',
        
      },
    ],
  },
];
export default treeData