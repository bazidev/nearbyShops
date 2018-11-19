import mongoose from 'mongoose';
const Schema = mongoose.Schema;
let Shop = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    image : { 
        data: Buffer, 
        contentType: String 
    }

    // likes and dislikes to add after deciding the proper type of relation
});
