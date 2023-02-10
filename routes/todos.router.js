const express = require("express");
const { default: mongoose } = require("mongoose");
const { findById } = require("../models/todo");
const router = express.Router();
const Todo = require("../models/todo");

router.get("/", (req, res) => {
  res.send("todo router");
});

router.post("/todos", async (req, res) => {
  const { value } = req.body;
  const maxOrderByUserId = await Todo.findOne().sort("-order").exec();
  //sort("-order") === sort({ order : -1 }) , descending(내림차순)
  const order = maxOrderByUserId ? maxOrderByUserId.order + 1 : 1;
  // maxOrder 있을 때 + order 1, 없을 때(첫번째 등록 시) 그냥 1
  const todo = new Todo({ value, order });
  await todo.save();
  res.send({ todo });
});

router.get("/todos", async (req, res) => {
  const todos = await Todo.find().sort("-order").exec();
  //sort order descending
  res.send({ todos });
});

router.patch("/todos/:todoId", async (req, res) => {
  const { todoId } = req.params;
  const { order, value, done } = req.body;

  const currentToDo = await Todo.findById(todoId);
  if (!currentToDo) {
    return res.status(400).json({ err: "Nothing To Do" });
  }
  if (order) {
    //order 가 있으면 순서 변경
    const targetTodo = await Todo.findOne({ order }).exec();
    if (targetTodo) {
      targetTodo.order = currentToDo.order;
      await targetTodo.save();
    } // 순서 변경된 값 또한 변경해줘야 할 것.
    currentToDo.order = order;
  } else if (value) {
    currentToDo.value = value;
  } else if (done !== undefined) {
    currentToDo.doneAt = done ? new Date() : null;
  }

  await currentToDo.save();
  res.send({});
});

router.delete("/todos/:todoId", async (req, res) => {
  const { todoId } = req.params;
  const todo = await Todo.findByIdAndDelete({ _id: todoId });
  res.send({ todo });
});

module.exports = router;
