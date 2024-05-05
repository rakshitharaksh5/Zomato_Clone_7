const { response } = require('express');
const User = require('../Model/userDB');

exports.postSignUp = (req, res) => {
    const { email, password, name } = req.body;

    const userObj = new User ({
        email,
        password,
        name
    });

    userObj.save()
        .then(response => {
            res.status(200).json({
                message: "user details saved successfully",
                signup: response
            })
        })
        .catch( err => {
            res.status(500).json({ error: err })
        })
}


exports.postLogin = (req , res) =>{
    const { email, password} = req.body;

    User.find({
        email,
        password
    }) 
    .then(response => {
        if(response.length > 0){
            res.status(200).json({
                message: "user details Fetched successfully",
                login: response,
                isAuthenticated: true
            })
        }else{
            res.status(200).json({
                message: "user details not found",
                login: response,
                isAuthenticated: false
            })
        }
    })
    .catch( err => {
        res.status(500).json({ error: err })
    })
}