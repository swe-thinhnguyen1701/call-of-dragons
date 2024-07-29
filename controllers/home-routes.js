const router = require("express").Router();
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = require("../config/aws-connection");
const { Version } = require("../models");

router.get("/", async (req, res) => {
    const versionData = await Version.findAll({
        order: [["date_created", "DESC"]]
    });
    const versions = versionData.map(version => version.get({ plain: true }));
    // const versions = [];
    for (let v of versions) {
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `home-page/${v.file_name}`
        });
        const img_url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        v.img_url = img_url;
    }
    res.render("home-page", { versions });
})

module.exports = router;