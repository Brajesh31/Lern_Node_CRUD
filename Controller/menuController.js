const Menu = require("../Model/Menu");

exports.getAllMenus = async (req, res) => {
    try {
        const menuData = await Menu.find();
        console.log("MenuData is fetched");
        res.status(200).json(menuData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.createMenu = async (req, res) => {
    try {
        const menuDatas = req.body;
        const newMenu = new Menu(menuDatas);
        const response = await newMenu.save();
        res.status(200).json(response);
    } catch (error) {
        console.log("❌ Error in POST /menu:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getMenusByTaste = async (req, res) => {
    try {
        const tasteType = req.params.tasteType;
        if (["sweet", "spicy", "sour"].includes(tasteType)) {
            const response = await Menu.find({ taste: tasteType });
            res.status(200).json(response);
        } else {
            res.status(400).json({ error: "Invalid taste type" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.updateMenu = async (req, res) => {
    try {
        const menuId = req.params.id;
        const updatedData = req.body;
        const response = await Menu.findByIdAndUpdate(menuId, updatedData, {
            new: true,
            runValidators: true
        });

        if (!response) return res.status(400).json({ error: "Menu not found" });

        console.log("Menu Data is Updated");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
};

exports.deleteMenu = async (req, res) => {
    try {
        const menuID = req.params.id;
        const response = await Menu.findByIdAndDelete(menuID);

        if (!response) return res.status(404).json({ error: "Menu not found" });

        res.status(200).json({ message: "Menu Deleted Success!" });
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
};
