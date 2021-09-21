const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    MONGODB_URL:process.env.MONGODB_URL || 'MONGODB_URL',
    JWT_SECRET: process.env.JWT_SECRET || 'JWT_SECRET',
    PORT: process.env.PORT || 1100,
}