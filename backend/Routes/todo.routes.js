import { Router } from "express";
import { addTodo, getTodos, updateTodo } from "../controllers/todo.controllers.js";

const router = Router();

router.route("/add").post(addTodo);
router.route("/get").get(getTodos);
router.route("/update/:id").patch(updateTodo)


export default router;