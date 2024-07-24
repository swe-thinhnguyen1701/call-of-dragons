const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");

const app = express();
const hbs = exphbs.create({});
const routes = require("./controllers/");
const sequelize = require("./config/db-connection");

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

const PORT = 3001;
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on:${PORT}`);
    });
})