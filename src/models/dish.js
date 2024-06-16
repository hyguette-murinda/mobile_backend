import mongoose, { Schema } from 'mongoose';

const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    picture:{
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    category: {
        type: String,
        enum: ['food', 'drink'],
        required: true,
    },
    menuId: {
        type: Schema.Types.ObjectId,
        ref: 'Menu',
        required: true,
    }
});

const Dish = mongoose.model('Dish', dishSchema);
export default Dish;
