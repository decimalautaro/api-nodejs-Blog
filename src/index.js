import express from "express"
import {connect} from "mongoose"

const app = express()


const PORT = process.env.PORT;
const NAME_DB = process.env.NAME_DB;

const run = async ()=>{
    await connect("mongodb://localhost:27017/" + NAME_DB)
    console.log("conexion a la db exitosa.")


    app.listen(PORT, ()=>{
        console.log("servidor escuchando en puerto 3000")
    })
}

run().catch((err)=> console.log(err))