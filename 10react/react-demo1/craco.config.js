const CracoLessPlugin = require("craco-less")
const path=require('path')
module.exports = {
    webpack:{
        alias:{
            "@":path.resolve(__dirname,'src')
        }
    },
    plugins: [
        { plugin: CracoLessPlugin }
    ]
}
