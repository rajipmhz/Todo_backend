const express = require("express");
const { createSubtaskController, getSubtasksController, updateSubtaskController, deleteSubtaskController } = require("../controller/subtaskController");
const isProtected = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const { createSubtaskSchema, updateSubtaskSchema } = require("../validators/subtaskValidator");
const router = express.Router();

router.use(isProtected)
router.post("/:todoId/subtasks",validate(createSubtaskSchema), createSubtaskController);
router.get("/:todoId/subtasks", getSubtasksController);
router.put("/subtasks/:id",validate(updateSubtaskSchema), updateSubtaskController);
router.delete("/subtasks/:id", deleteSubtaskController);

module.exports = router;