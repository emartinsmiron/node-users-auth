const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

exports.signup = async (req, res, next) => {
    const user = await User.find({ email: req.body.email }).exec();
    if (user.length > 0) {
        return res.status(409).json({message: 'Email already registered'});
    } else {
        bcrypt
            .hash(req.body.password, 5, (err, hash) => {
                if (err) {
                    return res.status(500).json({message: 'Error Encrypting Password'});
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        email: req.body.email,
                        profilePhoto: req.file.path,
                        password: hash
                    });
                    user
                        .save()
                        .then(result => {
                            console.log(result);
                            res
                                .status(200)
                                .json({
                                    message: 'Handling post users',
                                    createdUser: result
                                });
                        })
                        .catch(err => res.status(500));
                }
            });
    }
}

exports.login = async (req, res, next) => {
   const user = await User.find({ email: req.body.email }).exec()
        
    if(user.length < 1){
        return res.status(404).json({message: 'Could not find user'});
    } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
            if(err){
                return res.status.json({message: 'Error Decrypting Password'});
            } else if(result){
                const token = jwt.sign({
                    message: user[0].email,
                    id: user[0]._id
                }, 'secret', {
                    expiresIn: "1h"
                });
                return res.status(200).json({
                    message: 'Auth successfull',
                    token: token
                });
            } else {
                return res.status(401).json({message: 'Auth failed'});
            }
        });
    }
}

exports.findAllUsers = async (req, res, next) => {
    const user  = await User.find().select('name email profilePhoto').exec()
    res.status(200).json({users: user});
}

exports.updateUser = async (req, res, next) => {
    const user = await User.update({ _id: req.body._id }, {
        $set: {
            name: req.body.name,
            email: req.body.email
        }
    }).exec();

    res
        .status(200)
        .json({
            message: 'Handling post users',
            createdUser: user
        });
}

exports.deleteUserById = async (req, res, next) => {
    const userId = req.params.userId;
    const user = await User.remove({ _id: userId });
    res
        .status(200)
        .json({
            message: 'User deleted',
            user: user
        });
}