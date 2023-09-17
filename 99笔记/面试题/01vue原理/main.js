class Vue {
  constructor(options) {
    this.$options = options;
    this.$el = options.el;
    this.$data = options.data();

    // 劫持$data上的属性
    new Observer(this.$data);
    // 劫持this上的属性
    this.proxy();
    // 渲染数据
    new Complier(this.$el, this.$data);
  }

  // 挂载$data属性到this上方便访问
  proxy() {
    Object.keys(this.$data).forEach((key) => {
      Object.defineProperty(this, key, {
        get() {
          console.log(`vue get ${key}`);
          return this.$data[key];
        },
        set(val) {
          console.log(`vue set ${key} = ${val}`);
          this.$data[key] = val;
        },
      });
    });
  }
}

// data数据劫持
class Observer {
  constructor(data) {
    this.data = data;
    this.work();
  }

  defineProperty(data, key, value) {
    const dep = new Dep();
    Object.defineProperty(data, key, {
      get() {
        if (Dep.target) {
          dep.subs.push(Dep.target);
        }
        console.log(`observer get ${key}`);
        return value;
      },
      set(val) {
        console.log(`observere set ${key} = ${val}`);
        value = val;
        dep.notify();
      },
    });
  }

  work() {
    Object.keys(this.data).forEach((key) => {
      this.defineProperty(this.data, key, this.data[key]);
    });
  }
}

// 渲染数据
// 需要使用发布订阅模式 每次只更新获取过data值的标签
class Complier {
  constructor(el, data) {
    this.el = document.querySelector(el);
    this.data = data;

    this.complier();
  }
  complier() {
    // 遍历查询所有使用{{}}的标签
    // 获取key后修改innerHTML的值
    [...this.el.children].forEach((item) => {
      const res = item.innerHTML.match(/\{\{([\w]+)\}\}/);
      if (res) {
        const key = res[1];
        const render = () => {
          item.innerHTML = this.data[key];
        };
        new Watcher(render);
      }
    });
  }
}

// 订阅者
class Watcher {
  constructor(callback) {
    // 创建watch时把watch挂载到Dep上
    Dep.target = this;
    this.callback = callback;
    // 函数执行时调用get,添加watch进Dep的watch列表
    this.update();
    // 移除watch
    Dep.target = null;
  }
  update() {
    this.callback();
  }
}

class Dep {
  constructor() {
    // 存放watch
    this.subs = [];
  }
  // 通知订阅者
  notify() {
    this.subs.forEach((watch) => {
      watch.update();
    });
  }
}
