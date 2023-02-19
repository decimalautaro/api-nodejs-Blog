const { Schema, model } = require("mongoose")

const ArticleSchema = Schema({
    title: {
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    image:{
        type: String,
        default: "default.png"
    }
},
    {
        timestamps: true,
    }
)

module.exports = model ("Article", ArticleSchema)