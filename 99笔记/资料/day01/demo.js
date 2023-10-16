//Vue3采用Proxy实现响应式原理
let obj = {id:1,name:"xiaowang"}

function show(obj,key,value){
    Object.defineProperty(obj,key,{
        get:function(){
            console.log("get");
            return value
        },
        set:function(val){
            console.log("set");
            value = val
        }
    })
}

// show(obj,"name",obj["name"])

//手动的进行一个属性一个属性劫持
Object.keys(obj).forEach(key=>{
    show(obj,key,obj[key])
})

console.log(obj.id);
console.log(obj.name);


