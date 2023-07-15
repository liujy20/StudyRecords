// 直接访问
function getPromise(url, method, data) {
  return new Promise(function (res, rej) {
    $.ajax({
      url,
      method,
      data,
      success: res,
      error: rej,
    });
  });
}
// 带权限访问
function getPromiseAuth(url, method, data) {
  let token = localStorage.getItem("token");
  console.log(token);
  if (!token) {
    location.href = "/html/login.html";
    alert("请先登录!");
    return;
  }
  return new Promise(function (res, rej) {
    $.ajax({
      url,
      method,
      data,
      headers: {
        Authorization: "Bearer " + token,
      },
      success: res,
      error: function(err){
        if(err.status==401){
          alert('无权限访问,请先登录')
          location.href='/html/login.html'
        }else{
          rej(err)
        }
      },
    });
  });
}
// 查询token用户信息
function getUserInfo(url,method,data){
  let token = localStorage.getItem("token");
  const user = $(".top span");
  if (!token) {
    user.text(`您好，请登录`);
    return;
  }
  return new Promise(function(res,rej){
    $.ajax({
      url,
      method,
      data,
      headers: {
        Authorization: "Bearer " + token,
      },
      success: function (data) {
        console.log(data);
        user.text(`您好，${data.data.phone}！`);
      },
      error: function (err) {
        if (err.status == 401) {
          user.text(`您好，请登录`);
        } else {
          rej(err);
        }
      },
    });
  })
}

// export { getPromise, getPromiseAuth,getUserInfo };
