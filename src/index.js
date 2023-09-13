import express from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import openApiConfiguration from "../docs/swagger.js";
import { routerArticle } from "./routes/article-router.js";
import { routerUser } from "./routes/user-router.js";
import dotenv from "dotenv";
import { run } from "./config/database.js";

if (!process.env.PORT) {
  dotenv.config();
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(openApiConfiguration));
app.use("/api/articles", routerArticle);
app.use("/api/users", routerUser);

const PORT = process.env.PORT;
const NAME_DB = process.env.NAME_DB;

run();

app.listen(PORT, () => {
  console.log(`Server listen in port:${PORT}`);
});
