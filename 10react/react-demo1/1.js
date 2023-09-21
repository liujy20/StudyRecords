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

function getMaxNumber1(array, k, m) {
  // 将数组按照降序排列
  const sortedArray = array.sort((a, b) => b - a);

  // 获取第 k 大的数字和第 m 大的数字
  const kthLargest = sortedArray[k - 1];
  const mthLargest = sortedArray[m - 1];

  // 计算总和
  const sum = kthLargest + mthLargest;
console.log(sum);
  return sum;
}
getMaxNumber1(arr, 1, 3);