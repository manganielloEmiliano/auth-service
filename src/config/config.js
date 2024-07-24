
require('dotenv').config();

module.exports = {
    PORT: process.env.PORT ,
    MONGO_URI: String(process.env.MONGO_URL),
    DB_NAME: process.env.DB_NAME,
    jwtSecret: process.env.JWT_SEED  
    
};
