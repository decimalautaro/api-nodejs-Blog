const express = require("express")
const {connect} = require('mongoose')
const cors = require("cors")
require('dotenv').config();

const {routerArticle} = require("./routes/article-router.js")


const app = express()


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.use ("/api/articles", routerArticle)



const PORT = process.env.PORT;
const NAME_DB = process.env.NAME_DB;

const run = async ()=>{
    await connect("mongodb://localhost:27017/" + NAME_DB)
    console.log("conexion a la db exitosa.")
}

run().catch((err)=> console.log(err))


app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en: http://localhost:${PORT}`)
})
