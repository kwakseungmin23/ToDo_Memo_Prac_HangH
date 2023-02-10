const express = require("express");

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.send("To Do Memo Practice");
});

app.use("/api", express.json(), router);

app.listen(8080, () => {
  console.log("server listening on port 8080");
});
