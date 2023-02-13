import { Schema, model } from 'mongoose'

const ArticleSchema = Schema({
    title: {
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
       
    },
    image:{
        type: String,
        default: "default.png"
    }
})

module.exports = model ("Article", ArticleSchema)