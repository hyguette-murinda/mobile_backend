import expess from 'express'
import menuController from '../controllers/menu.controller.js';
const menuRouter = expess.Router()

/**
 * @swagger
 * /api/v1/menu/add:
 *   post:
 *     summary: Registers a new menu
 *     tags: [menu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               restaurant:
 *                 type: string
 *     responses:
 *       201:
 *         description: restaurant registered successfully
 *       400:
 *         description: Bad request
 */

menuRouter.post('/add', menuController.registerMenu);

/**
 * @swagger
 * /api/v1/menu/{menuId}/dishes:
 *   get:
 *     summary: Get all dishes with the specified menuId
 *     tags: [Dish]
 *     parameters:
 *       - in: path
 *         name: menuId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the menu to get dishes for
 *     responses:
 *       200:
 *         description: Dishes retrieved successfully
 *       500:
 *         description: Internal server error
 */
menuRouter.get('/:menuId/dishes', menuController.getDishesByMenuId);
export default menuRouter
