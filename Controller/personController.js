const { json } = require("express");
const Persons = require("../Model/person");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");

exports.getAllPersons = async (req, res) => {
    try {
        const data = await Persons.find();
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.createPerson = async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Persons(data);
        const response = await newPerson.save();

        const payload = {
            id: response.id,
            username: response.username
        }
        console.log(JSON.stringify(payload));

        const token = generateToken(payload);
        console.log("token", token);

        res.status(200).json({ response: response, token: token });
    } catch (error) {
        console.log("❌ Error in POST /person:", error.message);
        res.status(500).json({ err: "Internal Server Error" });
    }
};

exports.loginPerson = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await Persons.findOne({ username });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const payload = {
            id: user.id,
            username: user.username
        };

        const token = generateToken(payload);

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                username: user.username,
                name: user.name
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Login is not working" });
    }
};

exports.getPersonByWork = async (req, res) => {
    try {
        const workType = req.params.workType;
        if (["chef", "waiter", "manager"].includes(workType)) {
            const response = await Persons.find({ work: workType });
            res.status(200).json(response);
        } else {
            res.status(400).json({ error: "Invalid work type" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.updatePerson = async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedData = req.body;
        const response = await Persons.findByIdAndUpdate(personId, updatedData, {
            new: true,
            runValidators: true
        });

        if (!response) return res.status(404).json({ error: "Person Not Found" });

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.deletePerson = async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Persons.findByIdAndDelete(personId);

        if (!response) return res.status(404).json({ error: "Person not found" });

        res.status(200).json({ message: "Person Deleted Success!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// // Profile
exports.profile = async (req, res) => {
    try {
        const userData = req.user;
        console.log(userData);
        const userId = userData.id;
        const user = await Persons.findById(userId);
        res.status(200).json({ user });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}