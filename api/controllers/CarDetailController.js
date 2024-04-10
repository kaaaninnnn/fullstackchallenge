const express = require("express");
const app = express();
const CarDetailModel = require("../models/CarDetailModel");

app.get("/car/list", async (req, res) => {
  try {
    const results = await CarDetailModel.findAll({ order: [["id", "DESC"]] });
    res.send({ message: "success", results: results });
  } catch (e) {
    res.statusCode = 500;
    res.send({ message: e.message });
  }
});

app.post("/car/insert", async (req, res) => {
  try {
    await CarDetailModel.create(req.body);
    res.send({ message: "success" });
  } catch (e) {
    res.statusCode = 500;
    res.send({ message: e.message });
  }
});

app.delete("/car/delete/:id", async (req, res) => {
  try {
    await CarDetailModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send({ message: "success" });
  } catch (e) {
    res.statusCode = 500;
    res.send({ message: e.message });
  }
});

app.post("/car/edit", async (req, res) => {
  try {
    await CarDetailModel.update(req.body, {
      where: {
        id: req.body.id,
      },
    });
    res.send({ message: "success" });
  } catch (e) {
    res.statusCode = 500;
    res.send({ message: e.message });
  }
});

module.exports = app;
