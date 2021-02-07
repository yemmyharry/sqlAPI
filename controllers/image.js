

exports.upload = (req, res, next)=>{
    if(req.file.filename){
        res.status(201).send({
            message: 'Image upload complete',
            url: req.file.filename
        })
    }
    else{
        res.status(500).send({
            message: 'Something went wrong'
        })
    }
}