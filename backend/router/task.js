const express = require("express");
const router = express.Router();
const fs = require('fs')



router.get("/data", (req, res) => {
  const dataBuffer = fs.readFileSync(__dirname + "/data.json");
  let data = JSON.parse(dataBuffer);
  res.json({ data });
});

router.post("/add", (req, res) => {
  const dataBuffer = fs.readFileSync(__dirname + "/data.json");
  let data = JSON.parse(dataBuffer)
  try {
    const { dataIndex, name } = req.body;
  let task = { name, completed: false }
    data[dataIndex].tasks.push(task)


    fs.writeFile(
      `${__dirname}/data.json`,
      JSON.stringify(data),
      (err) => {
        if (err) res.json({ err });
        res.json({ success: "Task added successfully!" });
      }
    );
  } catch (error) {
    res.json({ error });
  }
});

router.post("/delete", (req, res) => {
    const dataBuffer = fs.readFileSync(__dirname + "/data.json");
    let data = JSON.parse(dataBuffer);
  try {
    const { taskIndex, dataIndex } = req.body;
    const tasks = data[dataIndex].tasks.filter((_, index) => index != taskIndex);
    data[dataIndex].tasks = tasks

    

    fs.writeFile(`${__dirname}/data.json`, JSON.stringify(data), (err) => {
      // // Checking for errors
      if (err) res.json({ err });

      res.json({ success: "Task deleted successfully!" });
    })
  } catch (error) {
    res.json({ error });
  }
});

router.post("/completed", (req, res) => {
    const dataBuffer = fs.readFileSync(__dirname + "/data.json");
    let data = JSON.parse(dataBuffer);
  try {
    const { taskIndex, dataIndex } = req.body;
    data[dataIndex].tasks[taskIndex].completed = true

    fs.writeFile(`${__dirname}/data.json`, JSON.stringify(data), (err) => {
      // Checking for errors
      if (err) res.json({ err });

      res.json({ success: "Task marked completed successfully!" });
    });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
