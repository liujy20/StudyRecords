const multer = require('multer');
function filename(req, file, cb){
    const singfileArray = file.originalname.split('.');
        const fileExtension = singfileArray[singfileArray.length - 1];
        cb(null, singfileArray[0] + '-' + Date.now() + "." + fileExtension);
        console.log(file);
}
const storageToImages = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/')
    },
    filename: filename,
})
const storageToGoods = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/goods')
    },
    filename: filename,
})
const storageToShop = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/shop')
    },
    filename: filename,
})


module.exports.uploadToImages = multer({
    storage: storageToImages
})
module.exports.uploadToGoods = multer({
    storage: storageToGoods
})
module.exports.uploadToShop = multer({
    storage: storageToShop
})

// module.exports = {
//     uploadToImages,
//     uploadToGoods,
//     uploadToShop
// };


