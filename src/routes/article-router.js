const {Router} = require("express");
const  ArticleController = require("../controllers/ArticleController.js")

const routerArticle = Router();


routerArticle.get("/", ArticleController.getAll )
routerArticle.get("/:id", ArticleController.getById )
routerArticle.post("/create",ArticleController.create )
routerArticle.delete("/delete/:id",ArticleController.remove )
routerArticle.put("/edit/:id",ArticleController.edit )




module.exports = {routerArticle}