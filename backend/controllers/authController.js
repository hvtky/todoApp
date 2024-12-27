const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
require('dotenv').config({path: './.env'});

exports.register = async (req, res) => {
    console.log('register')
    const {name, email, password} = req.body;
    const hashedPassword =  await bcrypt.hash(password, 10);
    await User.create({name: name, email: email, password: hashedPassword}, (err, result) => {
        if(typeof result === 'String') {
            if(result.includes("Email đã tồn tại") || result.includes("Tạo tài khoản thất bại")) return res.status(400).send(result)
        }
        if(err) return res.status(500).send(err);
        res.status(201).send(result);
    })
}
exports.login = async (req, res) => {
    const {email, password} = req.body;
    await User.findByEmail(email, (err, user) => {
        if(user == false) return res.status(404).send('User not found');
        else if(user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if(err) return res.status(500).send(err);
                if(!result) return res.status(401).send('Invalid credentials');
                const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
                res.status(200).send({token: token});
            })
        }else return res.status(500).send(err);
    })
}
exports.info = async (req, res) => {
    console.log('info')
    console.log(req.query.email)
    await User.findByEmail(req.query.email, (err, user) => {
        if(err) return res.status(500).send(err);
        if(!user) return res.status(404).send('User not found');
        res.status(200).send(user);
    });

}