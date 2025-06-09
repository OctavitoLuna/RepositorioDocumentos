const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');

/**
 * @swagger
 * tags:
 *   name: Forum
 *   description: Operations related to forum categories and comments
 */

/**
 * @swagger
 * /forums/categories:
 *   get:
 *     summary: Get all forum categories
 *     tags: [Forum]
 *     responses:
 *       200:
 *         description: A list of all forum categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 description: Category name
 *       500:
 *         description: Internal server error
 */
router.get('/categories', forumController.getCategories);

/**
 * @swagger
 * /forums/comments/{categoria}:
 *   get:
 *     summary: Get all comments for a specific category
 *     tags: [Forum]
 *     parameters:
 *       - name: categoria
 *         in: path
 *         required: true
 *         description: Category name to filter comments
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of comments for the specified category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user:
 *                     type: string
 *                   comment:
 *                     type: string
 *       400:
 *         description: Invalid category name
 *       500:
 *         description: Internal server error
 */
router.get('/comments/:categoria', forumController.getCommentsByCategory);

/**
 * @swagger
 * /forums/comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Forum]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - categoria
 *               - comment
 *             properties:
 *               user:
 *                 type: string
 *                 description: Name of the user creating the comment
 *               categoria:
 *                 type: string
 *                 description: Category to which the comment belongs
 *               comment:
 *                 type: string
 *                 description: The comment content
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Bad request, missing or invalid fields
 *       500:
 *         description: Internal server error
 */
router.post('/comments', forumController.createComment);

module.exports = router;
