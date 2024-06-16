import Menu from '../models/menu.js';
import Dish from '../models/dish.js';
import { CreateMenuSchema } from '../validations/app.validation.js';

const registerMenu = async (req, res) => {
    try {
        // Validate the request body
        const { error } = CreateMenuSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: "error",
                message: error.details[0].message,
            });
        }

        // Extract data from request body
        const { restaurant } = req.body;

        // Create a new Menu instance
        const menu = new Menu({
            restaurant,
        });

        // Save the menu to the database
        await menu.save();

        // Log success message and send response
        console.log("Menu registered successfully");
        return res.status(201).json({
            status: "success",
            message: "Menu registered successfully",
            data: menu,
        });
    } catch (error) {
        // Log the error and send response
        console.error("Error registering menu:", error.message);
        return res.status(500).json({
            status: "error",
            message: "An error occurred while registering the menu",
        });
    }
};

// const getMenu = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const menu = await Menu.findById(id).populate('restaurant');
//         if (!menu) {
//             return res.status(404).json({
//                 status: "error",
//                 message: "Menu not found",
//             });
//         }

//         return res.status(200).json({
//             status: "success",
//             data: menu,
//         });
//     } catch (error) {
//         console.error("Error fetching menu:", error.message);
//         return res.status(500).json({
//             status: "error",
//             message: "An error occurred while fetching the menu",
//         });
//     }
// };
const getDishesByMenuId = async (req, res) => {
    try {
        const { menuId } = req.params;

        // Retrieve all dishes with the specified menuId
        const dishes = await Dish.find({ menuId });

        // Separate dishes into food and drinks categories
        const foodDishes = dishes.filter(dish => dish.category === 'food');
        const drinkDishes = dishes.filter(dish => dish.category === 'drink');

        return res.status(200).json({
            status: "success",
            data: {
                food: foodDishes,
                drinks: drinkDishes
            }
        });
    } catch (error) {
        console.error("Error fetching dishes by menuId:", error.message);
        return res.status(500).json({
            status: "error",
            message: "An error occurred while fetching dishes",
        });
    }
};

const menuController ={
    registerMenu,
    // getMenu,
    getDishesByMenuId
}
export default menuController
