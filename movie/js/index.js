// 渲染
const nowPlayingMovie = document.querySelector(".now-playing-movie");
const nowPlayingNum = document.querySelector(".nowPlaying span");
const upComingMoive = document.querySelector(".up-coming-moive");
const upComingNum = document.querySelector(".upcoming span");

const loginReg = document.querySelector(".header .login-reg");
const online = document.querySelector(".header .online");

// 登录
const login = document.querySelector(".header .login");
const loginBox = document.querySelector(".login-box");
const loginClose = loginBox.querySelector(".close");
const loginPhone = loginBox.querySelector(".phone");
const loginPhoneInp = loginPhone.children[0];
// phone警告
const loginPhoneWarn = loginPhone.querySelector(".phone-warning");
const loginPwd = loginBox.querySelector(".password");
const loginPwdInp = loginPwd.children[0];
// Pwd警告
const loginPwdWarn = loginPwd.querySelector(".password-warning");
const loginBtn = loginBox.querySelector(".login");

// 注册
const reg = document.querySelector(".header .reg");
const regBox = document.querySelector(".reg-box");
const regClose = regBox.querySelector(".close");
const regPhone = regBox.querySelector(".phone");
const phoneInp = regPhone.children[0];
// phone警告
const regPhoneWarn = regPhone.querySelector(".phone-warning");
const regPwd1 = regBox.querySelector("#pwd1");
const pwd1Inp = regPwd1.children[0];
// Pwd1警告
const regPwd1Warn = regPwd1.querySelector(".password1-warning");
const regPwd2 = regBox.querySelector("#pwd2");
const pwd2Inp = regPwd2.children[0];
// Pwd2警告
const regPwd2Warn = regPwd2.querySelector(".password2-warning");
const regRe = regBox.querySelector(".re");
const regCodeInp = regRe.querySelector(".re-inp input");
const regRandomCode = regRe.querySelector(".code");
const regBtn = regBox.querySelector(".register");

// RegExp
const phoneRe = /^1[3456789]\d{9}$/;
const pwdRe = /^[A-Z]\w{5,15}$/;
const codeArr = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  0,
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
];
let code = "";

// banner
const banner = document.querySelector(".banner");
const bannerImg = document.querySelector(".banner img");
const bannerDot = document.querySelectorAll(".banner li");
const bannerArr = [
  "./img/banner/slider01.png",
  "./img/banner/slider02.png",
  "./img/banner/slider03.png",
  "./img/banner/slider04.png",
];
let bannerIndex = 0;
let timer;

// 账号
const users = { 13112341234: "ASDFASDF" };

// 搜索
const search = document.querySelector(".search");
const searchInp = search.querySelector("input");
const searchList = search.querySelector(".s-list");
const searchBtn = search.querySelector("button");
let selectId;

// 影院选择
const cinema = document.querySelector(".fastPay .cinema");
const cinemaOptins = cinema.querySelector(".list");
const moive = document.querySelector(".fastPay .moive");
const moiveOptions = moive.querySelector(".list");
let selectMovies = [];

main();

function main() {
  render();
  addListener();
}

function render() {
  renderNowPlaying();
  renderUpComing();
  renderOpera();
}

/**
 * 渲染正在热播电影,绑定跳转页面
 */
function renderNowPlaying() {
  nowPlayingNum.innerHTML = `(${nowPlaying.length}部)`;
  let arr = nowPlaying.slice(0, 8);
  nowPlayingMovie.innerHTML = "";
  arr.forEach((item) => {
    // console.log(item.imgSrc);
    let li = document.createElement("li");
    li.innerHTML = `
    <img src="${item.imgSrc}" alt="" />
    <div class="des">
      <span class="name">${item.title}</span>
      <span class="level">${item.score}</span>
    </div>`;
    li.setAttribute("data-id", item.id);
    nowPlayingMovie.appendChild(li);

    li.addEventListener("click", () => {
      location.href = "detail.html?id=" + li.getAttribute("data-id");
    });
  });
}

/**
 * 渲染即将上映电影
 */
function renderUpComing() {
  upComingNum.innerHTML = `(${upComing.length}部)`;
  let arr = upComing.slice(0, 8);
  upComingMoive.innerHTML = "";
  arr.forEach((item) => {
    let li = document.createElement("li");
    li.innerHTML = `
    <img src="${item.imgSrc}" alt="" />
    <div class="movie-des">
      <span class="name">${item.title}</span>
      <div class="reservation">
        <div class="res1">预告片</div>
        <div class="res2">预售</div>
      </div>
    </div>
    <div class="time">8月6日上映</div>`;
    li.className = "coming-item";
    li.setAttribute("data-id", item.id);
    upComingMoive.appendChild(li);
  });
}

/**
 * 渲染影院
 */
function renderOpera() {
  cinemaOptins.innerHTML = "";
  opera.forEach((item) => {
    let li = document.createElement("li");
    li.innerHTML = item.name;
    li.setAttribute("data-id", item.id);
    cinemaOptins.appendChild(li);
  });
  addCinemaChoose();
  addMovieChoose();
  addOpenList();
}

/**
 * 打开选择列表
 */
function addOpenList() {
  cinema.addEventListener("click", (e) => {
    // console.log(e.target.className);
    // console.log(cinemaOptins);
    if (e.target.className == "cinema select") {
      cinemaOptins.style.display = "block";
    }
  });
  moive.addEventListener("click", (e) => {
    console.log(e.target.className);
    if (selectMovies.length != 0 && e.target.className == "moive select") {
      addOperaChange();
      moiveOptions.style.display = "block";
    }
  });
}

/**
 * 选择影院
 */
function addCinemaChoose() {
  cinemaOptins.addEventListener("click", (e) => {
    let ele = e.target;
    if (ele.innerText.length > 8) {
      cinema.innerText = ele.innerText.slice(0, 8) + "...";
    } else {
      cinema.innerText = ele.innerText;
    }
    cinema.appendChild(cinemaOptins);
    opera.forEach((item) => {
      if (ele.getAttribute("data-id") == item.id) {
        selectMovies = item.movies;
      }
    });
    cinemaOptins.style.display = "none";
    moive.innerText = "选择电影";
  });
}

/**
 * 监听影院修改
 */
function addOperaChange() {
  moiveOptions.innerHTML = "";
  // console.log(selectMovies);
  // console.log(moiveOptions);
  selectMovies.forEach((item) => {
    nowPlaying.forEach((val) => {
      if (item == val.id) {
        let li = document.createElement("li");
        li.innerHTML = val.title;
        moiveOptions.appendChild(li);
      }
    });
  });
  moive.appendChild(moiveOptions);
}

/**
 * 选择电影
 */
function addMovieChoose() {
  moiveOptions.addEventListener("click", (e) => {
    let ele = e.target;
    if (ele.innerText.length > 8) {
      moive.innerText = ele.innerText.slice(0, 8) + "...";
    } else {
      moive.innerText = ele.innerText;
    }
    moive.appendChild(moiveOptions);
    moiveOptions.style.display = "none";
  });
}

function addListener() {
  addBannerchange();
  addChooseImg();
  addLoginAndReg();
  addLoginRe();
  addRegRe();
  addSearch();
  addChooseResult();
  addSearchBtn();
}

/**
 * 登录注册页面按钮绑定
 */
function addLoginAndReg() {
  login.addEventListener("click", () => {
    loginBox.style.display = "block";
  });
  loginClose.addEventListener("click", closeLogin);
  loginBtn.addEventListener("click", loginUser);

  reg.addEventListener("click", () => {
    regBox.style.display = "block";
    renderRandom();
  });
  regClose.addEventListener("click", closeReg);
  regBtn.addEventListener("click", regUser);
}

/**
 * 渲染验证码
 */
function renderRandom() {
  let str = "";
  for (let i = 0; i < 5; i++) {
    str += codeArr[parseInt(Math.random() * codeArr.length)];
  }
  code = str;
  regRandomCode.innerHTML = str;
}

/**
 * 关闭登录页面
 */
function closeLogin() {
  loginPhoneInp.value = "";
  loginPwdInp.value = "";
  loginBox.style.display = "none";

  loginPhoneWarn.style.display = "none";
  loginPhone.style.border = "1px solid #d8d8d8";
  loginPwdWarn.style.display = "none";
  loginPwd.style.border = "1px solid #d8d8d8";
}

/**
 * 关闭注册页面
 */
function closeReg() {
  phoneInp.value = "";
  pwd1Inp.value = "";
  pwd2Inp.value = "";
  regCodeInp.value = "";
  regBox.style.display = "none";

  regPhoneWarn.style.display = "none";
  regPhone.style.border = "1px solid #d8d8d8";
  regPwd1Warn.style.display = "none";
  regPwd1.style.border = "1px solid #d8d8d8";
  regPwd2Warn.style.display = "none";
  regPwd2.style.border = "1px solid #d8d8d8";
}

/**
 * 账号登录验证
 */
function addLoginRe() {
  loginPhoneInp.addEventListener("input", () => {
    if (phoneRe.test(loginPhoneInp.value)) {
      loginPhoneWarn.style.display = "none";
      loginPhone.style.border = "1px solid #d8d8d8";
    } else {
      loginPhoneWarn.style.display = "block";
      loginPhone.style.border = "1px solid #f03d37";
    }
  });
  loginPwdInp.addEventListener("input", () => {
    if (pwdRe.test(loginPwdInp.value)) {
      loginPwdWarn.style.display = "none";
      loginPwd.style.border = "1px solid #d8d8d8";
    } else {
      loginPwdWarn.style.display = "block";
      loginPwd.style.border = "1px solid #f03d37";
    }
  });
}

/**
 * 账号注册验证
 */
function addRegRe() {
  // phone验证

  phoneInp.addEventListener("input", () => {
    if (phoneRe.test(phoneInp.value)) {
      regPhoneWarn.style.display = "none";
      regPhone.style.border = "1px solid #d8d8d8";
    } else {
      regPhoneWarn.style.display = "block";
      regPhone.style.border = "1px solid #f03d37";
    }
  });
  // password验证
  pwd1Inp.addEventListener("input", () => {
    if (pwdRe.test(pwd1Inp.value)) {
      regPwd1Warn.style.display = "none";
      regPwd1.style.border = "1px solid #d8d8d8";
    } else {
      regPwd1Warn.style.display = "block";
      regPwd1.style.border = "1px solid #f03d37";
    }
  });
  pwd2Inp.addEventListener("input", () => {
    if (pwdRe.test(pwd2Inp.value)) {
      regPwd2Warn.style.display = "none";
      regPwd2.style.border = "1px solid #d8d8d8";
    } else {
      regPwd2Warn.style.display = "block";
      regPwd2.style.border = "1px solid #f03d37";
    }
  });
}

/**
 * 账号登录
 */
function loginUser() {
  if (users[loginPhoneInp.value] == loginPwdInp.value) {
    alert("登陆成功");
    closeLogin();
    loginReg.style.display = "none";
    online.style.display = "block";
  } else {
    alert("用户名或密码错误");
  }
}

/**
 * 账号注册
 */
function regUser() {
  // console.log(code);
  let temp = code.split("").map((item) => {
    return item.toLowerCase();
  });
  code = temp.join("");
  temp = regCodeInp.value
    .split("")
    .map((item) => {
      return item.toLowerCase();
    })
    .join("");
  if (phoneRe.test(phoneInp.value)) {
    if (pwdRe.test(pwd1Inp.value)) {
      if (pwd1Inp.value == pwd2Inp.value) {
        if (code == temp) {
          for (k in users) {
            if (k == phoneInp.value) {
              alert("账号存在");
              return;
            }
          }
          alert("注册成功")
          users[phoneInp.value] = pwd1Inp.value;
          closeReg();
        } else {
          alert("验证码错误");
        }
      } else {
        alert("两次密码不相等");
        // console.log(pwd1Inp, pwd2Inp);
      }
    } else {
      alert("密码不合法");
    }
  } else {
    alert("用户名不合法");
  }
}

/**
 * 轮播图
 */
function addBannerchange() {
  changeBannerImg(0);
  timer = setInterval(() => {
    changeBannerImg(++bannerIndex % bannerArr.length);
  }, 3000);
  banner.addEventListener("mouseover", () => {
    clearInterval(timer);
  });
  banner.addEventListener("mouseout", () => {
    timer = setInterval(() => {
      changeBannerImg(++bannerIndex % bannerArr.length);
    }, 3000);
  });
}

/**
 * 修改图片
 * @param {*} index 图片下标
 */
function changeBannerImg(index) {
  // console.log(index);
  if (index < bannerDot.length && index >= 0) {
    bannerDot.forEach((item) => {
      item.className = "";
    });
  }
  bannerDot[index].className = "active";
  bannerImg.src = bannerArr[index];
}

/**
 * 选择图片
 */
function addChooseImg() {
  bannerDot.forEach((item) => {
    item.addEventListener("click", function () {
      let index = this.getAttribute("id");
      bannerIndex = index;
      changeBannerImg(bannerIndex);
    });
  });
}

/**
 * 搜索事件绑定
 */
function addSearch() {
  searchInp.addEventListener("input", () => {
    searchList.innerHTML = "";
    let val = searchInp.value;
    nowPlaying.forEach((item) => {
      if (item.title.startsWith(val) && val != "") {
        searchList.style.display = "block";
        let li = document.createElement("li");
        li.innerHTML = item.title;
        li.setAttribute("data-id", item.id);
        searchList.appendChild(li);
        // console.log(searchList);
      } else if (val == "") {
        searchList.style.display = "none";
      }
    });
  });
}

/**
 * 绑定选择的搜索结果
 */
function addChooseResult() {
  searchList.onclick = function (e) {
    let ele = e.target;
    searchInp.value = ele.innerText;
    selectId = ele.getAttribute("data-id");
    searchList.style.display = "none";
  };
}

/**
 * 绑定搜索按钮
 */
function addSearchBtn() {
  searchBtn.addEventListener("click", () => {
    if (selectId != undefined) {
      location.href = "detail.html?id=" + selectId;
    }
  });
}
