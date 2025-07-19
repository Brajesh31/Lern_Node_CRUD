const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    work: {
        type: String,
        enum: ["chef", "waiter", "manager"],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    }
});

// Pre-save middleware to hash password
personSchema.pre("save", async function (next) {
    const person = this;

    // Only hash the password if it has been modified (or is new)
    if (!person.isModified("password")) return next();

    try {
        // Generate salt
        const salt = await bcrypt.genSalt(10);

        // Hash password 
        const hashedPassword = await bcrypt.hash(person.password, salt);

        // Override plain password with hashed password
        person.password = hashedPassword;
        next();
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

// Instance method to compare password
personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};

const Persons = mongoose.model("Persons", personSchema);
module.exports = Persons;