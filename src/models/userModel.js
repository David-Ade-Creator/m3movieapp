const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        require:[true, "User must have a firstname"],
    },
    lastName:{
        type: String,
        require:[true, "User must have a lastname"],
    },
    email:{
        type: String,
        require:[true, "User must have an email"],
        unique: true,
    },
    password:{
        type: String,
        require:[true, "User must have a password"],
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;