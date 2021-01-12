const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const Company = require('../models/company');
const Student = require('../models/student');

const saltRounds = 10;

router.post('/login', async (req, res, next) => {
    const {
        role, email, password,
    } = req.body;
    let user;
    if (role === 'company') {
        user = await Company.findOne({email}).populate({
            path: 'marathons',
            populate: {
                path: 'tasks',
                populate: {path: 'task', populate: {path: 'answers feedbacks', populate: {path: 'student'}}}
            }
        });
    } else {
        user = await Student.findOne({email}).populate({
            path: 'marathons',
            populate: {
                path: 'tasks',
                populate: {path: 'task', populate: {path: 'answers feedbacks', populate: {path: 'student'}}}
            }
        });
    }
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({success: true, user});
    }
    if (user) {
        res.json({success: false, message: 'wrong password'});
    } else {
        res.json({success: false, message: 'no such user'});
    }
});

router.post('/signup', async (req, res, next) => {
    const {
        role, username, email, password,
    } = req.body;
    let user;
    if (role === 'company') {
        const {company} = req.body;
        if (await Company.findOne({username}) && await Company.findOne({email})) {
            res.json({success: false, message: 'have such user'})
        }
        user = await new Company({
            username,
            email,
            password: await bcrypt.hash(password, saltRounds),
            company,
            marathons: [],
        }).populate({
            path: 'marathons',
            populate: {
                path: 'tasks',
                populate: {path: 'task', populate: {path: 'answers feedbacks', populate: {path: 'student'}}}
            }
        });
    } else {
        const {tlg} = req.body;
        if (await Student.findOne({username}) && await Student.findOne({email})) {
            res.json({success: false, message: 'have such user'})
        }
        user = await new Student({
            username,
            email,
            password: await bcrypt.hash(password, saltRounds),
            tlg,
            marathons: [],
        }).populate({
            path: 'marathons',
            populate: {
                path: 'tasks',
                populate: {path: 'task', populate: {path: 'answers feedbacks', populate: {path: 'student'}}}
            }
        });
    }
    await user.save();
    res.json({success: true, user}).status(200)
});

module.exports = router;

