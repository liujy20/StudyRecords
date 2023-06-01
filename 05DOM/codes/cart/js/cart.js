let carProducts = [
  {
    id: 1,
    name: "创意现代简约干花花瓶摆件",
    price: 20,
    num: 2,
    imgSrc: "./img/cart01.jpg",
    checked: false,
  },
  {
    id: 2,
    name: "白瓶绿植",
    price: 16,
    num: 1,
    imgSrc: "./img/cart02.jpg",
    checked: false,
  },
  {
    id: 3,
    name: "香薰1",
    price: 22.5,
    num: 3,
    imgSrc: "./img/cart03.jpg",
    checked: false,
  },
  {
    id: 4,
    name: "酒瓶干花",
    price: 12,
    num: 1,
    imgSrc: "./img/id3.jpg",
    checked: false,
  },
];

let tbody = document.querySelector(".tbody");
let allPrice = document.querySelector("tfoot .price .red");
let allNum = document.querySelector("tfoot .num .red");
let selectAll = document.querySelector("tfoot input");
// let isSelectAll = false;

main();

function main() {
  render();
  addSelectAllBox();
}

/**
 * 渲染商品列表
 */
function render() {
  tbody.innerHTML = "";
  let sumPrice = 0;
  let sumNum = 0;
  carProducts.forEach((item, i) => {
    notToPay()
    if (item.checked) {
      sumPrice += item.price * item.num;
      sumNum += item.num;
      toPay()
    }

    let tr = document.createElement("tr");
    tr.setAttribute("data-id", item.id);
    // console.log(tr);
    tr.innerHTML = `<td class="product">
    <input type="checkbox" name="" id="" class="check"  ${
      item.checked ? "checked" : ""
    }/>
    <img src="${item.imgSrc}" alt="" />
    <div class="info">
      <div class="name">${item.name}</div>
      <div class="type">颜色分类：</div>
      <div class="color">白色瓷瓶+白色串枚</div>
    </div>
  </td>

  <td class="price">￥${item.price.toFixed(1)}</td>

  <td class="number">
    <div class="wrapper clearfix">
      <div class="reduce">-</div>
      <input type="text" value="${item.num}" />
      <div class="add">+</div>
    </div>
  </td>
  <td class="count">￥${(item.price * item.num).toFixed(1)}</td>

  <td class="op">
    <input class="proDel" type="button" value="删除" />
  </td>
    `;
    tbody.appendChild(tr);
  });
  renderPrice(sumPrice);
  renderNum(sumNum);
  addListener();
}

// 渲染价格
function renderPrice(sum) {
  allPrice.innerText = sum.toFixed(1);
}

// 渲染数量
function renderNum(sum) {
  allNum.innerText = sum;
}

// 添加点击事件
function addListener() {
  addChange();
  addDel();
  addSelect();
}

/**
 * 绑定添加删除
 */
function addChange() {
  let add = document.querySelectorAll(".tbody .add");
  add.forEach((item) => {
    let number = item.parentElement;
    let reduce = number.querySelector(".reduce");
    let tr = number.parentElement.parentElement;
    let index = tr.getAttribute("data-id");
    // console.log(index);
    item.addEventListener("click", () => {
      addNum(index);
      console.log(carProducts);
    });
    reduce.addEventListener("click", () => {
      subNum(index);
      console.log(carProducts);
    });
  });
}

/**
 * 添加数量
 */
function addNum(index) {
  carProducts.forEach((item) => {
    if (item.id == index) {
      item.num++;
    }
  });
  render();
}

/**
 * 减少数量
 */
function subNum(index) {
  carProducts.forEach((item) => {
    if (item.id == index && item.num > 1) {
      item.num--;
    }
  });
  render();
}

/**
 * 绑定删除商品
 */
function addDel() {
  let del = document.querySelectorAll(".tbody .op input");
  del.forEach((item) => {
    let tr = item.parentElement.parentElement;
    let index = tr.getAttribute("data-id");
    item.addEventListener("click", () => {
      delPro(index);
      console.log(carProducts);
    });
  });
}

/**
 * 删除商品
 */
function delPro(index) {
  for (i in carProducts) {
    if (carProducts[i].id == index) {
      carProducts.splice(i, 1);
    }
  }
  render();
}

/**
 * 全选
 */
function addSelect() {
  let selBox = document.querySelectorAll(".product .check");
  selBox.forEach((item, i) => {
    item.addEventListener("click", (e) => {
      let tr = item.parentElement.parentElement;
      let index = tr.getAttribute("data-id");
      carProducts.forEach((item) => {
        if (item.id == index) {
          item.checked = e.target.checked;
        }
      });
      let flag=true;
      carProducts.forEach(item=>{
        if(!item.checked){
          flag=false;
        }
      })
      selectAll.checked=flag
      render();
      console.log(carProducts);
    });
  });
}

function addSelectAllBox(){
  selectAll.addEventListener('click',()=>{
    carProducts.forEach((item)=>{
      item.checked=selectAll.checked
    })
    render();
  })
}

function toPay(){
  let pay=document.querySelector('tfoot .submit')
  pay.classList.add('active')
  console.log(pay);
}

function notToPay(){
  let pay=document.querySelector('tfoot .submit')
  pay.classList.remove('active')
  console.log(pay);
}
