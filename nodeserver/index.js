const express = require("express");

const server = express();
const cors = require('cors')
const mongoose = require("mongoose")

const bodyparser = require("body-parser");

main().catch(err => console.log(err))
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/form');
    console.log("database connected successfully")
}

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
})

const User = mongoose.model('User', userSchema);

server.use(cors());
server.use(bodyparser.json())
server.post('/demo', async (req, res) => {

    let user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    const doc = await user.save()
    console.log(doc)
    res.send(doc);
})


server.get("/demo", async (req, res) => {
    const docs = await User.find({});
    res.json(docs)
})




server.listen(8000, () => {
    console.log("server is running");
})