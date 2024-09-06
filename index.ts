import express, { Express } from "express";
import * as database from "./config/database";
import dotenv from "dotenv";
import path from "path";
import methodOverride from "method-override"
// import bodyParser from "body-parser";

import adminRoutes from "./routes/admin/index.route";
import clientRoutes from "./routes/client/index.route";
import { systemConfig } from "./config/config";

dotenv.config();

database.connect();

const app: Express = express(); 
const port: number | string = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.use(methodOverride(`${__dirname}/public`));

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// tinyMCE
app.use(
    "/tinymce",
    express.static(path.join(__dirname, "node_modules", "tinymce"))
);

// app local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// adminRoutes
adminRoutes(app);

// clientRoutes
clientRoutes(app);


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});