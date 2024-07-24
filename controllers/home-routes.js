const router = require("express").Router();
const s3Client = require("../config/aws-connection");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const VERSION_ARRAY = ["version_1-27", "version_1-26", "version_1-25"];

router.use("/", async (req, res) => {
    const versions = []
    for (let v of VERSION_ARRAY) {
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `home-page/${v}`
        });
        const img_url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        const version = {
            patch: v,
            img_url: img_url
        }
        versions.push(version);
    }
    res.render("home-page", {versions});
})

module.exports = router;