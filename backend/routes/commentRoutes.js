const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Operations related to comments on documents
 */

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       description: Comment data to create a new comment
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - documento_id
 *               - comentario
 *             properties:
 *               documento_id:
 *                 type: string
 *                 description: ID of the document the comment belongs to
 *               comentario:
 *                 type: string
 *                 description: The content of the comment
 *               usuario_id:
 *                 type: string
 *                 description: ID of the user who is creating the comment
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Bad request, invalid data
 *       500:
 *         description: Internal Server Error
 */
router.post("/", commentController.createComment);

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: A list of all comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   comentario:
 *                     type: string
 *                   documento_id:
 *                     type: string
 *                   usuario_id:
 *                     type: string
 *       500:
 *         description: Error fetching comments
 */
router.get("/", commentController.getAllComments);

/**
 * @swagger
 * /comments/document/{documentId}:
 *   get:
 *     summary: Get comments by document ID
 *     tags: [Comments]
 *     parameters:
 *       - name: documentId
 *         in: path
 *         required: true
 *         description: The document ID to fetch comments for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of comments for the given document
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   comentario:
 *                     type: string
 *                   documento_id:
 *                     type: string
 *                   usuario_id:
 *                     type: string
 *       404:
 *         description: Document not found
 *       500:
 *         description: Error fetching comments for the document
 */
router.get("/document/:documentId", commentController.getCommentsByDocumentId);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the comment to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Error deleting comment
 */
router.delete("/:id", commentController.deleteComment);

module.exports = router;
