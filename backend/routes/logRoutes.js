const express = require("express");
const router = express.Router();
const logController = require("../controllers/logController");

/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: Operations related to logs
 */

/**
 * @swagger
 * /logs:
 *   post:
 *     summary: Create a new log
 *     tags: [Logs]
 *     requestBody:
 *       description: Log data to create a new log
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - action
 *               - userId
 *               - description
 *             properties:
 *               action:
 *                 type: string
 *               userId:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Log created successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post("/", logController.createLog);

/**
 * @swagger
 * /logs:
 *   get:
 *     summary: Get all logs
 *     tags: [Logs]
 *     responses:
 *       200:
 *         description: A list of logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   action:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   description:
 *                     type: string
 *       500:
 *         description: Internal Server Error
 */
router.get("/", logController.getAllLogs);

/**
 * @swagger
 * /logs/user/{userId}:
 *   get:
 *     summary: Get logs by user ID
 *     tags: [Logs]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The user ID to get logs for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of logs for the specified user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   action:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   description:
 *                     type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/user/:userId", logController.getLogsByUserId);

/**
 * @swagger
 * /logs/{id}:
 *   delete:
 *     summary: Delete a log by ID
 *     tags: [Logs]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The log ID to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Log deleted successfully
 *       404:
 *         description: Log not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/:id", logController.deleteLog);

module.exports = router;
