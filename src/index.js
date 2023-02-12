import express from "express"
import {connect} from "mongoose"

const app = express()


const run = async ()=>{
    await connect("mongodb://localhost:27017/" + "blog")
    console.log("conexion a la db exitosa.")


    app.listen(3000, ()=>{
        console.log("servidor escuchando en puerto 3000")
    })
}


run().catch((err)=> console.log(err))