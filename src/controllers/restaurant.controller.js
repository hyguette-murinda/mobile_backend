import Restaurant from "../models/restaurant.js";
import { CreateRestaurantSchema } from "../validations/app.validation.js";
import Menu from "../models/menu.js";

const registerRestaurant = async (req, res) => {
  try {
    const { error } = CreateRestaurantSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.details[0].message,
      });
    }
    const {name, address} = req.body;
    const resto = new Restaurant({
        name,
        address
    })
    await resto.save()
    console.log("restaurant registered")
    return res.status(201).json({
        status: "success",
        message: "restaurant registered successfully",
        data: resto
    })
}catch(error){
    console.log(error.message)
}
}

const getAllRestos = async (req, res) =>{
    try{
        const restos = await Restaurant.find()
        return res.status(200).json({
            status: "success",
            data: restos
        })
    }catch(error){
        console.log(error.message)
    }
}

const getAllMenus = async (req, res) => {
    try {
        const { restaurantId } = req.params;

        const menus = await Menu.find({ restaurant: restaurantId }).populate('restaurant');
        if (!menus || menus.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No menus found for this restaurant",
            });
        }

        return res.status(200).json({
            status: "success",
            data: menus,
        });
    } catch (error) {
        console.error("Error fetching menus:", error.message);
        return res.status(500).json({
            status: "error",
            message: "An error occurred while fetching the menus",
        });
    }
};


const restaurantController = {
    registerRestaurant,
    getAllRestos,
    getAllMenus
}
export default restaurantController;