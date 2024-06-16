import mongoose, {Schema} from "mongoose";

const restaurantSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    }
});

const Restaurant = mongoose.model("restaurant", restaurantSchema);
export default Restaurant