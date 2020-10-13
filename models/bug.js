const mongoose = require('mongoose')

const bugSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },
    project: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        required: true
    },
    blameFile: {
        type: String,
        required: false
    },
    summary: {
        type: String,
        required: true
    },
    readout: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true,
        default: "open"
    },
    _owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
    {
        timestamps: true
    }
)
const Bug = mongoose.model('Bug', bugSchema)
module.exports = Bug
