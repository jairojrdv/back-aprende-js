const express = require("express");
const Model = require("../models");
const router = express.Router();

router.get("/listar", 
async (req, res) => {
  users = await Model.find();
  res.send(users);
});
router.post("/cadastrar", async (req, res) => {
  console.log(req);
  const data = new Model({
    name: req.body.name,
    description: req.body.description,
    example: req.body.example,
    method_type: req.body.method_type,
  });
  try {
    const response = await data.save();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedUser = await Model.findByIdAndRemove(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Registro não encontrado" });
    }
    res.status(200).json({ message: "Registro excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir o registro" });
  }
});

module.exports = router;
