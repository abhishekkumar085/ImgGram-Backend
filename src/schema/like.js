import mongoose from "mongoose";

const likeSchmema=new mongoose.Schema({
    onModel:{
        type:String,
        required:true,
        enum:['Post,Comment']

    },
    likeableId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:'onModel'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
})

const Like=mongoose.model('Like',likeSchmema);

export default Like;