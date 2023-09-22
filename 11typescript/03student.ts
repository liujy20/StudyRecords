interface IClasses {
  id: number;
  name: string;
}

interface IUser {
  id: number;
  name: string;
  phone: string;
  age: number;
  classes: IClasses;
}

const students: IUser[] = [
  {
    id: 1,
    name: "xiaowang",
    phone: "13112341234",
    age: 23,
    classes: { id: 1, name: "web34" },
  },
  {
    id: 2,
    name: "xiaofei",
    phone: "13212341234",
    age: 24,
    classes: { id: 2, name: "web33" },
  },
  {
    id: 3,
    name: "xiaoliu",
    phone: "13312341234",
    age: 25,
    classes: { id: 2, name: "web33" },
  },
];

function findMaxAge(stu: IUser[]): IUser | undefined {
  let ages = stu.map((item) => item.age);
  let maxAge = Math.max.apply(ages, ages);
  let student = stu.find((item) => item.age === maxAge);
  return student;
}

interface ICount {
  id: number;
  name: string;
  count: number;
}
function classCount(stu: IUser[]): ICount[] | undefined {
  let countList: ICount[] = [];
  stu.forEach((item) => {
    let classItem = countList.find((val) => {
      return val.id === item.classes.id;
    });
    if (classItem) {
      classItem.count++;
    } else {
      countList.push({ ...item.classes, count: 1 });
    }
  });
  return countList;
}
// console.log(classCount(students));

function encryption(id: number, stu: IUser[]): string {
  let res:string=''
  stu.forEach((item) => {
    if (id === item.id) {
      res = item.phone.replace(
        /(\d{4})\d{4}(\d{3})/,
        "$1****$2"
      );
    }
  });
  return res||"";
}
console.log(encryption(2,students));
