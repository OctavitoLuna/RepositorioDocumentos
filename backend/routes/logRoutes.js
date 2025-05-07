const express = require("express");
const router = express.Router();
const logController = require("../controllers/logController");

// Crear un nuevo log
router.post("/", logController.createLog);

// Obtener todos los logs
router.get("/", logController.getAllLogs);

// Obtener logs por usuario ID
router.get("/user/:userId", logController.getLogsByUserId);

// Eliminar un log
router.delete("/:id", logController.deleteLog);

module.exports = router;
