const {Router} = require("express");
const  ArticleController = require("../controllers/ArticleController.js")

const routerArticle = Router();


routerArticle.get("/", ArticleController.getAll )
routerArticle.get("/:id", ArticleController.getById )
routerArticle.post("/create",ArticleController.create )




module.exports = {routerArticle}