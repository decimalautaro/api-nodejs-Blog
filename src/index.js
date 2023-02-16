const express = require("express");
const {connect} = require('mongoose');
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const openApiConfiguration = require("../docs/swagger")
const {routerArticle} = require("./routes/article-router.js");
const { routerUser } = require("./routes/user-router");

require('dotenv').config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use("/api/documentation", swaggerUI.serve, swaggerUI.setup(openApiConfiguration));
app.use ("/api/articles", routerArticle);
app.use("/api/users", routerUser)



const PORT = process.env.PORT;
const NAME_DB = process.env.NAME_DB;

const run = async ()=>{
    await connect("mongodb://localhost:27017/" + NAME_DB);
    console.log("conexion a la db exitosa.");
}

run().catch((err)=> console.log(err));


app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en: http://localhost:${PORT}`);
})
