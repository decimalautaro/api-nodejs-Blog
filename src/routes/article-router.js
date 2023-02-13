const {Router} = require("express");
const  ArticleController = require("../controllers/ArticleController.js")

const routerArticle = Router();


routerArticle.get("/:ultimos?", ArticleController.getAll )
routerArticle.post("/crear",ArticleController.create )




module.exports = {routerArticle}