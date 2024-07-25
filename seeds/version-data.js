const { Version } = require("../models");

const versionData = [
    {
        title: "Patch 1.25",
        file_name: "version_1-25",
        date_created: "05/13/2024"
    },
    {
        title: "Patch 1.26",
        file_name: "version_1-26",
        date_created: "06/19/2024"
    },
    {
        title: "Patch 1.27",
        file_name: "version_1-27",
        date_created: "07/10/2024"
    }
];

const seedVersions = () => Version.bulkCreate(versionData);

module.exports = seedVersions;