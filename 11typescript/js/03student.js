"use strict";
const students = [
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
function findMaxAge(stu) {
    let ages = stu.map((item) => item.age);
    let maxAge = Math.max.apply(ages, ages);
    let student = stu.find((item) => item.age === maxAge);
    return student;
}
function classCount(stu) {
    let countList = [];
    stu.forEach((item) => {
        let classItem = countList.find((val) => {
            return val.id === item.classes.id;
        });
        if (classItem) {
            classItem.count++;
        }
        else {
            countList.push(Object.assign(Object.assign({}, item.classes), { count: 1 }));
        }
    });
    return countList;
}
// console.log(classCount(students));
function encryption(id, stu) {
    let res = "";
    stu.forEach((item) => {
        if (id === item.id) {
            res = item.phone.replace(/(\d{4})\d{4}(\d{3})/, "$1****$2");
        }
    });
    return res || "";
}
console.log(encryption(2, students));
