db.getCollection("meal").insert( {
    _id: ObjectId("612cae6f2c43000023001282"),
    mouth: "12",
    name: "包年套餐",
    normalPrice: NumberInt("120"),
    salePrice: NumberInt("45"),
    state: NumberInt("1"),
    type: NumberInt("1")
} );
db.getCollection("meal").insert( {
    _id: ObjectId("612caeab2c43000023001283"),
    mouth: 3,
    name: "季度套餐",
    normalPrice: NumberInt("54"),
    salePrice: NumberInt("18"),
    state: NumberInt("1"),
    type: NumberInt("0")
} );
db.getCollection("meal").insert( {
    _id: ObjectId("612caec32c43000023001284"),
    mouth: NumberInt("1"),
    name: "包月套餐",
    normalPrice: NumberInt("15"),
    salePrice: NumberInt("7"),
    state: NumberInt("1"),
    type: NumberInt("0")
} );
db.getCollection("meal").insert( {
    _id: ObjectId("612e590adfc0592e7c303c64"),
    mouth: NumberInt("12"),
    name: "连续包月套餐",
    normalPrice: NumberInt("150"),
    salePrice: NumberInt("90"),
    state: NumberInt("0"),
    type: NumberInt("0")
} );
db.getCollection("meal").insert( {
    _id: ObjectId("61381ddee5e7e03c84fa505f"),
    mouth: NumberInt("6"),
    name: "半年套餐",
    normalPrice: NumberInt("150"),
    salePrice: NumberInt("90"),
    state: NumberInt("1"),
    type: NumberInt("0")
} );
