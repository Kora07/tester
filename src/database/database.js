const {connect} = require("mongoose");

const database = async(URL) => {
    try {
        await connect(URL);
        console.log("Connected to database successfully");
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = database;