const { Version } = require("../models");

const versionData = [
    {
        title: "Patch 1.25",
        img_url: "patch_1-25",
        date_created: "05/13/2024"
    },
    {
        title: "Patch 1.26",
        img_url: "patch_1-26",
        date_created: "06/19/2024"
    },
    {
        title: "Patch 1.27",
        img_url: "patch_1-27",
        date_created: "07/10/2024"
    }
];

const seedVersions = () => Version.bulkCreate(versionData);

module.exports = seedVersions;