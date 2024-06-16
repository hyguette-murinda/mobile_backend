import express from 'express'
import restaurantController from "../controllers/restaurant.controller.js";
const restaurantRouter = express.Router()

/**
 * @swagger
 * /api/v1/restaurant/add:
 *   post:
 *     summary: Registers a new restaurant
 *     tags: [Restaurant]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: restaurant registered successfully
 *       400:
 *         description: Bad request
 */

restaurantRouter.post('/add', restaurantController.registerRestaurant)

/**
 * @swagger
 * /api/v1/restaurant/all:
 *   get:
 *     summary: Retrieves all restaurants
 *     tags: [Laptop]
 *     responses:
 *       200:
 *         description: A list of all restaurant
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   address:
 *                     type: string
 */
restaurantRouter.get('/all', restaurantController.getAllRestos)
/**
 * @swagger
 * /api/v1/restaurant/{restaurantId}/menus:
 *   get:
 *     summary: Get all menus for a restaurant
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the restaurant to get menus for
 *     responses:
 *       200:
 *         description: Menus retrieved successfully
 *       404:
 *         description: No menus found for the restaurant
 *       500:
 *         description: Internal server error
 */
restaurantRouter.get('/:restaurantId/menus', restaurantController.getAllMenus);
export default restaurantRouter