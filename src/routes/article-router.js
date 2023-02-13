const {Router} = require("express");
const  ArticleController = require("../controllers/ArticleController.js")

const routerArticle = Router();


// routerArticle.get("/", articleController )
routerArticle.post("/crear",ArticleController.create )




module.exports = {routerArticle}