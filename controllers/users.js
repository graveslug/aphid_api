const User = require('../models/user')
const Bug = require('../models/bug')

module.exports = {
//============================//
//        User                //
//============================//
    //finds user
    index: async (req, res, next) => {
        try {
            const users = await User.find({})
            res.json({userIndex: userFound})
        }catch(error) {
            res.json({userIndex: error})
        }
    },
    //creates new user
    newUser: async (req, res, next) => {
        try {
            const newUser = await new User(req.body)
            const user = await newUser.save()
            res.json({newUser: userPost})
        } catch(error) {
            res.json({newUser: error})
        }
    },

    getUser: async (req, res, next) => {
        try{
            const user = await User.findById(req.params.userId)
            res.json({getUser: user})
        } catch(error){
            res.json({getUser: error})
        }
    },
    //!!!TODO!!! Enforce all updates to replace user
    putUser: async (req, res, next) => {
        const replaceUser = req.params.userId
        const newUser = req.body
        try {
            const result = await User.findByIdAndUpdate(replaceUser, newUser)
            res.status(200).json({putUser: result})
        }catch(error){
            res.json({putUser: error})
        }
    },

    patchUser: async (req, res, next) => {
        const patchUser = req.params.userId
        const newUser = req.body
        try {
            const result = await User.findByIdAndUpdate(patchUser, newUser)
            res.status(200).json({patchUser: result})
        }catch(error){
            res.json({patchUser: error})
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const removedUser = User.remove({_id:req.params.userId})
            res.status(200).json({deleteUser: "You've removed this user"})
        }catch(error){
            res.json({deleteUser: error})
        }
    },
//============================//
//     User => Bug forum      //
//============================//
    getUserBug: async (req, res, next) => {
        const userId = req.params.userId
        const user = await User.findById(userId)
        try{
            res.status(200).json(user._bug)
        }catch(error){
            res.json({getBug: error})
        }
    },

    newUserBug: async (req, res, next) => {
        const userId = req.params.userId
        const newBug = new Bug(req.body)
        const user = await User.findById(userId)
        try {
            newBug._owner = user
            await newBug.save()
            user._bug.push(newBug)
            await user.save()
            res.status(200).json({ newUserBug: newBug })
        }catch(error) {
            res.json({ newUserBug: error })
        }
    }

}
