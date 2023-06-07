const cinemaList = document.querySelector("ul.content");

main();

function main() {
  render();
  addListener();
}

/**
 * 渲染影院列表
 */
function render() {
  cinemaList.innerHTML = "";
  opera.forEach((item) => {
    let li = document.createElement("li");
    li.setAttribute("data-id", item.id);
    li.innerHTML = `
    <div class="info1">
      <div class="name">${item.name}</div>
      <div class="region">${item.address}</div>
      <div class="service">
        <div class="s1 s">改签</div>
        <div class="s2 s">折扣卡</div>
      </div>
    </div>
    <div class="info2">
      <div class="price">
        <span>¥</span>
        <span class="num">23</span>
        起
      </div>
      <div class="distance">
        24KM
      </div>
    </div>
    <div class="info3">
      <button class="toChoose" data-id="${item.id}">
        选座购票
      </button>
    </div>`;
    cinemaList.appendChild(li);
  });
}

/**
 * 添加点击事件
 */
function addListener() {
  const btns = document.querySelectorAll(".toChoose");
  btns.forEach((item) => {
    item.addEventListener("click", () => {
      let id = item.getAttribute("data-id");
      location.href = "cinemaDetial.html?id=" + id;
    });
  });
}
