import { Router } from "express";
import { addTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todo.controllers.js";

const router = Router();

router.route("/add").post(addTodo);
router.route("/get").get(getTodos);
router.route("/update/:id").patch(updateTodo);
router.route("/delete/:id").delete(deleteTodo);


export default router;