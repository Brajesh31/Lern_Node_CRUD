const express = require("express");
const router = express.Router();
const menuController = require("../Controller/menuController");

router.get("/", menuController.getAllMenus);
router.post("/", menuController.createMenu);
router.get("/:tasteType", menuController.getMenusByTaste);
router.put("/:id", menuController.updateMenu);
router.delete("/:id", menuController.deleteMenu);

module.exports = router;
