const multer = require('multer')
// const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './uploads/')
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
})


const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }
    else{
        cb(new Error('Unsupported file type'), false)
    }
}

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
 })


 module.exports  = {
     upload: upload
 }