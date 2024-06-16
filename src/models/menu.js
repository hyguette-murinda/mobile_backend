import mongoose, { Schema } from 'mongoose';
import Restaurant from './restaurant.js';
const menuSchema = new Schema({
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'restaurant',
        required: true,
    }
});

const Menu = mongoose.model('menu', menuSchema);
export default Menu;
