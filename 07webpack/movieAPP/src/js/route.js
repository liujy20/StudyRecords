const pointName = decodeURI(location.search.split("?")[1].split("=")[1]);
let startPoint, endPoint;
const map = new BMapGL.Map("myMap");
map.centerAndZoom(pointName, 15);
map.enableScrollWheelZoom(true);

// 导航规则
let driving = new BMapGL.DrivingRoute(map, {
  renderOptions: { map: map, autoViewport: true },
});

// 获取电影院地址
var myGeo = new BMapGL.Geocoder();
// 将地址解析结果显示在地图上，并调整地图视野
myGeo.getPoint(
  pointName,
  function (point) {
    // map.addOverlay(new BMapGL.Marker(point));
    endPoint = point;
  },
  "成都市"
);

// 定位
var geolocation = new BMapGL.Geolocation();
geolocation.getCurrentPosition(function (r) {
  // map.addOverlay(new BMapGL.Marker(r.point));
  map.panTo(r.point);
  startPoint = r.point;

  driving.search(startPoint, endPoint);
});
