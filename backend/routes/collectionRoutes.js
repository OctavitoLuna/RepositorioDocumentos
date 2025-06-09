const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');

/**
 * @swagger
 * tags:
 *   name: Collections
 *   description: Operations related to collections
 */

/**
 * @swagger
 * /collections:
 *   post:
 *     summary: Create a new collection
 *     tags: [Collections]
 *     requestBody:
 *       description: Data to create a new collection
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Collection created successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/', collectionController.createCollection);

/**
 * @swagger
 * /collections/user/{userId}:
 *   get:
 *     summary: Get all collections by user ID
 *     tags: [Collections]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user to get the collections for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of collections for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Collection'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/user/:userId', collectionController.getCollectionsByUser);

/**
 * @swagger
 * /collections/{id}:
 *   get:
 *     summary: Get details of a collection by ID
 *     tags: [Collections]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the collection to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Collection details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Collection'
 *       404:
 *         description: Collection not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', collectionController.getCollectionById);

/**
 * @swagger
 * /collections/{id}:
 *   put:
 *     summary: Update an existing collection by ID
 *     tags: [Collections]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the collection to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Data to update the collection
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Collection updated successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Collection not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', collectionController.updateCollection);

/**
 * @swagger
 * /collections/{id}:
 *   delete:
 *     summary: Delete a collection by ID
 *     tags: [Collections]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the collection to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Collection deleted successfully
 *       404:
 *         description: Collection not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', collectionController.deleteCollection);

/**
 * @swagger
 * /collections/{id}/documentos:
 *   post:
 *     summary: Add a document to a collection
 *     tags: [Collections]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the collection to add a document to
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Document data to be added to the collection
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               documentId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Document added to the collection successfully
 *       404:
 *         description: Collection or document not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/:id/documentos', collectionController.addDocumentToCollection);

/**
 * @swagger
 * /collections/{id}/documentos/{docId}:
 *   delete:
 *     summary: Remove a document from a collection
 *     tags: [Collections]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the collection
 *         schema:
 *           type: string
 *       - name: docId
 *         in: path
 *         required: true
 *         description: The ID of the document to remove
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Document removed from the collection successfully
 *       404:
 *         description: Collection or document not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id/documentos/:docId', collectionController.removeDocumentFromCollection);

module.exports = router;
