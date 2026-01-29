const express = require("express");
const isProtected = require("../middleware/authMiddleware");
const { createTodoController, getTodoController, updateTodoController, deleteTodoController } = require("../controller/todoController");
const { createTodoSchema, updateTodoSchema } = require("../validators/todoValidator");
const validate = require("../middleware/validate");
const router = express.Router();

router.use(isProtected);

router.post("/",validate(createTodoSchema),createTodoController);
router.get("/",getTodoController);
router.put("/:id", validate(updateTodoSchema),updateTodoController);
router.delete("/:id",deleteTodoController)

module.exports=router;