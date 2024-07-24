const sequelize = require("../config/db-connection")
const seedVersions = require("./version-data");

const seedAll = async () => {
    try {
        await sequelize.sync({ force: true });
        await seedVersions();
        process.exit(0);
    } catch (error) {
        console.error("ERROR occurs while seeding data\n", error);
        process.exit(1);
    }
}

seedAll();