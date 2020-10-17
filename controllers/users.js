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
            res.json({userIndex: users})
        }catch(error) {
            res.json({userIndex: error})
        }
    },
    //creates new user
    newUser: async (req, res, next) => {
        try {
            const newUser = await new User(req.body)
            const user = await newUser.save()
            res.json({newUser: user})
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
            //!!!!postman shows the result as the original but changes are made!!!!
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
            //!!!!postman shows the result as the original but changes are made!!!!
            res.status(200).json({patchUser: result})
        }catch(error){
            res.json({patchUser: error})
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const removedUser = await User.deleteOne({_id:req.params.userId})
            res.status(200).json({removedUser: "Deleted the user"})
        }catch(error){
            res.json({deleteUser: error})
        }
    },
//============================//
//     User => Bug forum      //
//============================//
//this only grabs the reference ID of each bug through the user.
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
    },

    //this get route grabs the ID of bugs that correlated with the user(However if somebody had access to the ID of another users bug it can be retrieved to their side.) Might be a validation thing or perhaps I can do something like the deleteUserBugById and do a check.
    getUserBugById: async (req, res, next) => {
        // const userId = req.params.userId
        const bugId = req.params.bugId
        // const user = await User.findById(userId)
        const bug = await Bug.findById(bugId)
        try{
            res.status(200).json({ getUserBugById: bug})
        }catch(error){
            res.json({ getUserBugById: error})
        }
    },

    deleteUserBugById: async(req, res, next) => {
        const bugId = req.params.bugId
        const bug = await Bug.findById(bugId)
        if(!bug) {
            return res.status(404).json({deleteUserBugById: "Bug doesn't exist" })
        }
        const ownerId = bug._owner
        const owner = await User.findById(ownerId)
        try {
            await bug.remove()
            owner._bug.pull(bug)
            await owner.save()
            res.status(200).json({deleteUserBugById: "destroyed that file"})
        }catch(error){
            res.json({deleteUserBugById: error})
        }
    }
}
