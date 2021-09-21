
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const config = require("../config")

exports.registerController = async(req,res) =>{
    const { firstName, lastName, email, password } = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const firstError = errors.array().map((error) => error.msg)[0];
        return res.status(422).json({
          errors: firstError,
        });
    } else {
        User.findOne({
            email,
          }).exec((err, doc) => {
            if (doc) {
              return res.status(400).json({
                errors: "Email is taken",
              });
            }
          });

          try {
           const hashpassword = await bcrypt.hash(password, 12);
           const newUser = await User.create({
               firstName,
               lastName,
               email,
               password: hashpassword
           });

           const token = jwt.sign(
            {...newUser},
            config.JWT_SECRET,
            {
              expiresIn: "1d",
            }
          );
           
           res.status(201).json({
               status: "success",
               data: {
                   user: newUser,
                   token: token
               }
           })
        } catch (e) {
            console.log(e)
            res.status(400).json({
                status: "fail"
            })
        }
    }
}

exports.loginController = async(req,res)=>{
    const {email,password} = req.body;
    try {
       const user = await User.findOne({email});

       if(!user){
           return res.status(404).json({
               status:'fail',
               message: "User not found"
           })
       }

      const isCorrect =  await bcrypt.compare(password, user.password);
      if(isCorrect){
        const token = jwt.sign(
            {...user},
            config.JWT_SECRET,
            {
              expiresIn: "1d",
            }
          );
          res.status(200).json({
              status:"success",
              data: {
                user: user,
                token: token
            }
          })
      }else{
          res.status(400).json({
              status:"fail",
              message: "Incorrect username or password"
          })
      }
    } catch (e) {
        res.status(400).json({
            status: "fail"
        })
    }
}