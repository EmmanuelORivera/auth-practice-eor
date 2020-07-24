const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "GET auth" });
});

router.post("/signup", (req, res) => {
  console.log(req.body.username);
  res.json({ message: "POST auth/signup" });
});

module.exports = router;
