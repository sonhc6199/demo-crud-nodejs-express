const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ Connect successully!');
    }
    catch (error) {
        console.log('❌ Connect failed !');
        console.error(error);
    }
}

module.exports = { connect }