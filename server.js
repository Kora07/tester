const express = require("express");
const app = express();
app.use(express.json());

const database = require("./src/database/database");
const User = require("./src/models/userModel")

require("dotenv").config({
    path: "./src/config/.env"
});

const port = process.env.PORT || 3000;
const databaseLink = process.env.URL;

app.listen(port, async () => {
    try {
        await database(databaseLink);
        console.log(`Server is running on port ${port}`);
    }
    catch (error) {
        console.log(error);
    }
})

// app.get("/user", (req, res) => {
//     res.send("Nah, I'd win")
// })

app.get("/user", async (request, response) => {
    try {
        const users = await User.find();
        response.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        response.status(500).json({
            message: "Server Error"
        })
    }
})

app.post("/users", async (request, response) => {
    try {
        const user = new User(request.body);
        await user.save();

        response.status(201).json({
            message: "user created successfully", user
        })
    }
    catch (error) {
        console.log(error)

        if (error.code)

        if (error.code === 11000) { 
            response.status(400).json({
                message: "name already exists", error
            })
        }
    }
})
