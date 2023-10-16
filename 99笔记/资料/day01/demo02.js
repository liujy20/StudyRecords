let obj = {
    id:1,
    name:"xiaowang",
    classes:{
        id:2
    }
}

let proxyObj = new Proxy(obj,{
    get(target,key,receiver){
        console.log("get");
        //你要访问id,返回id对应值
        return target[key]
    },
    set(target,key,receiver){
        console.log("set");
        target[key] = receiver
    }
})

// proxyObj.name = "xiaofeifei"
// console.log(proxyObj);
// proxyObj.id = 2
// console.log(proxyObj);
// console.log(proxyObj.id);

proxyObj.classes.id = 3
console.log(proxyObj.classes.id);
