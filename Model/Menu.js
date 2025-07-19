const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    taste: {
        type: String,
        enum: ["sweet", "sour", "spicy"],
        required: true
    },
    is_drink: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        required: true
    }
});

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
