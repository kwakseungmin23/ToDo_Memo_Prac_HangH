const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

router.get("/", (req, res) => {
  res.send("todo router");
});

router.post("/todos", async (req, res) => {
  try {
    const { value } = req.body;
    const maxOrderByUserId = await Todo.findOne().sort("-order").exec();
    const order = maxOrderByUserId ? maxOrderByUserId.order + 1 : 1;
    // maxOrder 있을 때 + order 1, 없을 때 그냥 1
    const todo = new Todo({ value, order });
    await todo.save();
    res.send({ todo });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.message });
  }
});

module.exports = router;
