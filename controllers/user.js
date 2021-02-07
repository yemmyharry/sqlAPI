const models = require('../models')
const bcrypt =  require('bcrypt')
const jwt = require('jsonwebtoken')
const Joi = require('joi')



const schema = Joi.object({ name: Joi.string().min(6),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required() }); 


exports.signUp = (req, res, next) => {

    const email = req.body.email


    models.User.findOne({ where: { email: email}})
    .then((result) => {
        if(result){
            res.status(409).send({
                message: 'User already exists',
                error: true,
                data: result
            })
        }
        else{

    bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash)=>{
                        const user = {
                                name: req.body.name,
                                email: req.body.email,
                                password: hash
                            }
   
                           const validation = schema.validate(req.body);
                            if(validation.error){
                                return res.status(400).send({
                                    message: 'Validation failed.',
                                    error: validation
                                })
                            } 
                            else {
                                models.User.create(user)
                            .then(result => {
                                res.status(201).send({
                                    message: 'User created successfully',
                                    error: false,
                                    data: result
                                })
                            })
                            .catch(err => {
                                res.status(500).send({
                                    message: 'Failed to create user',
                                    error: true,
                                    data: err
                                })
                            }) 
                            }

                           
            })
    })
        }
    })
    .catch(err => {
        res.staus(500).send({
            message: err
        })
    })
    
}



exports.login = (req,res, next) => {

    models.User.findOne({where: { email: req.body.email}})
    .then((user) => {
        if(!user){
            res.status(401).send({
                message: "User does not exist."
            })
        }
        else{
            const validation = schema.validate(req.body);
            if(validation.error){
                return res.status(400).send({
                    message: 'Validation failed.',
                    error: validation
                })
            }
            else{
                   bcrypt.compare(req.body.password, user.password, (err, result)=>{
                if(result){
                    const token = jwt.sign({ 
                        email: user.email,
                        userId: user.id
                    }, process.env.SECRET , (err, token)=>{
                        res.status(200).send({
                            message: 'Authentication successful',
                            token: token
                        })

                    })
                }
                else {
                    res.status(404).send({
                        message: 'Authentication failed'
                    })
                }
            })  
            }
       
        }

    })
    .catch(err => {
        res.status(500).send({
            message: 'Failed to sign in',
            error: true,
            data: err
        })
    })
}