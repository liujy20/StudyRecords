let num: number = 120;
console.log(num.toFixed(2));

let bool: boolean = false;
console.log(bool);

let n: null = null;

let un: undefined = undefined;

let arr: number[] = [1, 2, 3];
let arr1: Array<number> = [1, 2, 3];

let arr3: (number | string)[] = [1, 2, "abc"];

// 声明
function fn1(a: number, b: number): number {
  return a + b;
}
// 表达式
const fn2 = (a: number, b: number): number => {
  return a + b;
};
// 类型别名用于表达式
type FnType = (ta: number, tb: number) => number;
const fn3: FnType = (a, b) => {
  return a + b;
};

// 继承
interface IPreson {
  name: string;
  age: number;
}

interface IStudent extends IPreson {
  sayhi: (content: string) => void;
}

const s1: IStudent = {
  name: "xwg",
  age: 13,
  sayhi(content) {
    console.log(content);
  },
};

s1.sayhi("hello");

// type实现继承
type Preson = {
  name: string;
  age: number;
};

type Student = {
  sayhi: (content: string) => void;
} & Preson;

const s2: Student = {
  name: "xwg",
  age: 13,
  sayhi(content) {
    console.log(content);
  },
};
s2.sayhi("hello");

const s = "123";
console.log(s);

export {};
