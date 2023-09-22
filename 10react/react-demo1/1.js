let arr = [1, 3, 4, 5, 4, 6];
function getMaxNumber(array, k, m) {
  let map = new Map();
  array.forEach((item) => {
    if (!map.has(item)) {
      map.set(item, 1);
    } else {
      map.set(item, map.get(item) + 1);
    }
  });
  let list = Array.from(map.keys()).sort().reverse();
  console.log(map, list);
  let sum =
    list[k - 1] * map.get(list[k - 1]) + list[m - 1] * map.get(list[m - 1]);
  console.log(sum);
}
getMaxNumber(arr, 1, 3);