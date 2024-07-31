const router = require("express").Router();
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = require("../config/aws-connection");
const { Version } = require("../models");

router.get("/", async (req, res) => {
    try {
        const versionData = await Version.findAll({
            order: [["date_created", "DESC"]]
        });
        const versions = versionData.map(version => version.get({ plain: true }));
        for (let v of versions) {
            const command = new GetObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `home-page/${v.file_name}`
            });
            const img_url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
            v.img_url = img_url;
        }
        res.render("home-page", { versions });
    } catch (error) {
        console.log("ERROR occurs while fetching version images\n", error);
        res.status(500).json({ message: "Internal error" });
    }
});

router.get("/heroes-intro", async (req, res) => {
    try {
        const imgUrlArray = [];
        const heroTypes = ["inf", "cav", "arc", "mag"];
        for (let heroType of heroTypes) {
            const command = new GetObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `heroes-intro/${heroType}-intro.webp`
            });
            const heroImg = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
            imgUrlArray.push(heroImg);
        }
        res.status(200).json(imgUrlArray);
    } catch (error) {
        console.log("ERROR occurs while fetching hero introduction images\n", error);
        res.status(500).json({ message: "Internal error" });
    }
});

module.exports = router;