const models = require('../models')
const Validator = require('fastest-validator')

exports.save = (req, res, next) => {
    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
        userId: req.userData.userId
    }
console.log(req.userData)
    const schema = {
        title:{
            type:"string",
            optional: false,
            max: "100"
        },
        content: {
            type:"string",
            optional: false,
            max: "500"
        },
        categoryId: {
             type: "number",
             optional: false
        }
    }

    const v = new Validator()
    const validationResponse = v.validate(post, schema)

    if(!validationResponse){
        return res.status(400).send({
            message: 'Validation failed.',
            error: validationResponse
        })
    }

    models.Category.findByPk(req.body.category_id)
    .then(result => {
        if(result !== null){
              models.Post.create(post)
    .then((result) => {
        res.status(201).send({
            message: 'Post created successfully',
            error: false,
            data: result
        })
    })
    .catch((err) => {
        res.status(500).send({
            message: 'Something went wrong',
            error: true,
            data: err
        })
    })
        }
        else{
            res.status(400).send({
                message: "Invalid Category ID"
            })
        }
    })

  
}


exports.show = (req, res, next) => {
    const id = req.params.id

    models.Post.findByPk(id)
    .then((result) => {
        if(result){
            res.status(200).send({
            message: result,
            error: false,
        })}
        else{
            res.status(404).send({message: `cannot find id ${id}` })
        }
    })
    .catch((err) => {
        res.status(500).send({
            message: 'Something went wrong',
            error: true,
            data: err
        })
    })
}


exports.index = (req, res, next) => {
    models.Post.findAll()
    .then((result) => {
        res.status(200).send({
            message: result,
            error: false,
        })
    })
    .catch((err) => {
        res.status(500).send({
            message: 'Something went wrong',
            error: true,
            data: err
        })
    })
}

exports.update = (req, res, next) => {
    const id = req.params.id

    const updatedPost = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id
    }

    const userId = req.userData.userId


    const schema = {
        title:{
            type:"string",
            optional: false,
            max: "100"
        },
        content: {
            type:"string",
            optional: false,
            max: "500"
        },
        categoryId: {
             type: "number",
             optional: false
        }
    }

    const v = new Validator()
    const validationResponse = v.validate(updatedPost, schema)

    if(!validationResponse){
        return res.status(400).send({
            message: 'Validation failed.',
            error: validationResponse
        })
    }


    models.Category.findByPk(req.body.category_id)
    .then(result => {
        if(result !== null){
         models.Post.update(updatedPost, {where: {id: id, userId: userId}})
    .then((result) => {
        if(result){
              res.status(200).send({
            message: 'Post updated successfully',
            error: false,
            data: result
        })  
        }
        else {
            res.status(404).send({
                message: `ID ${id} does not exist`
            })
        }
    
    })
    .catch((err) => {
        res.status(500).send({
            message: 'Something went wrong',
            error: true,
            data: err
        })
    })
        }
        else{
            res.status(400).send({
                message: "Invalid Category ID"
            })
        }
    })


  
}


exports.destroy = (req, res, next) => {
    const id = req.params.id
    const userId = req.userData.userId

    models.Post.destroy({where:{id: id, userId: userId}})
    .then((result) => {
        if(result){
            res.status(200).send({
          message: 'Post deleted successfully',
          error: false,
          data: result
      })  
      }
      else {
          res.status(404).send({
              message: `ID ${id} does not exist`
          })
      }
    })
    .catch((err)=>{
        res.status(500).send({
            message: 'Something went wrong',
            error: true,
            data: err
        })
    })
}

