const router = require("express").Router();

router.use("/", (req, res) => {
    res.render("home-page");
})

module.exports = router;