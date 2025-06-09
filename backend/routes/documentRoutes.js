const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");

/**
 * @swagger
 * tags:
 *   name: Documents
 *   description: Operations related to documents
 */

/**
 * @swagger
 * /documents/search:
 *   get:
 *     summary: Search documents
 *     tags: [Documents]
 *     description: Search for documents based on query parameters
 *     parameters:
 *       - name: query
 *         in: query
 *         description: Search query for filtering documents
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of documents matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Document'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.get("/search", documentController.searchDocuments);

/**
 * @swagger
 * /documents:
 *   post:
 *     summary: Create a new document
 *     tags: [Documents]
 *     description: Creates a new document in the system
 *     requestBody:
 *       description: Document data to create a new document
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Document'
 *     responses:
 *       201:
 *         description: Document created successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post("/", documentController.createDocument);

/**
 * @swagger
 * /documents:
 *   get:
 *     summary: Get all documents
 *     tags: [Documents]
 *     description: Retrieve a list of all documents
 *     responses:
 *       200:
 *         description: List of all documents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Document'
 *       500:
 *         description: Internal Server Error
 */
router.get("/", documentController.getAllDocuments);

/**
 * @swagger
 * /documents/{id}:
 *   get:
 *     summary: Get a document by its ID
 *     tags: [Documents]
 *     description: Retrieve a specific document by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the document to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested document
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       404:
 *         description: Document not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/:id", documentController.getDocumentById);

/**
 * @swagger
 * /documents/{id}:
 *   put:
 *     summary: Update a document
 *     tags: [Documents]
 *     description: Update the details of a specific document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the document to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: The updated document data
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Document'
 *     responses:
 *       200:
 *         description: Document updated successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Document not found
 *       500:
 *         description: Internal Server Error
 */
router.put("/:id", documentController.updateDocument);

/**
 * @swagger
 * /documents/{id}:
 *   delete:
 *     summary: Delete a document by ID
 *     tags: [Documents]
 *     description: Delete a specific document by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the document to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Document deleted successfully
 *       404:
 *         description: Document not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/:id", documentController.deleteDocument);

/**
 * @swagger
 * /documents/{id}/rating:
 *   post:
 *     summary: Add or update the rating of a document
 *     tags: [Documents]
 *     description: Adds or updates the rating for a document by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the document to rate
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Rating data for the document
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *             properties:
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *     responses:
 *       200:
 *         description: Rating added/updated successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/:id/rating', documentController.rateDocument);

/**
 * @swagger
 * /documents/{id}/rating-summary:
 *   get:
 *     summary: Get the rating summary for a document
 *     tags: [Documents]
 *     description: Retrieve the average rating and total number of ratings for a document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the document to retrieve rating summary for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The rating summary for the document
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 averageRating:
 *                   type: number
 *                 totalRatings:
 *                   type: number
 *       404:
 *         description: Document not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id/rating-summary', documentController.getRatingSummary);

module.exports = router;
