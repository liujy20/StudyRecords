db.getCollection("admins").insert( {
    _id: ObjectId("61132f3ab30c00004d003602"),
    account: "zhangsan",
    password: "123456",
    realname: "张三疯",
    status: 1,
    telephone: "13324567899"
} );
db.getCollection("admins").insert( {
    _id: ObjectId("6113448db30c00004d003603"),
    account: "lisi",
    password: "123456",
    realname: "刘备",
    status: 1,
    telephone: "13232323232"
} );
