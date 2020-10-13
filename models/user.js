const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        _bugs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Bug"
            }
        ]
    }
)
const user = mongoose.model('User', userSchema)
module.exports = User