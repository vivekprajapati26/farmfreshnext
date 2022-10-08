import mongoose from "mongoose";

const productSchema = new mongoose.Schema (


    {
        name:  {type: String , required: true },
        subname: {type: String },
        slug:{type: String , required: true , unique: true },
        category:{ type: String , required:true },
        subcategory:{ type: String , required:true },
        image:{ type: String , required:true },
        price:{ type: Number , required:true },
        priceperunit:{ type: Number , required:true },
        dqty:{ type: String , required:true },
        countInStock :{type: Number , required: true , default: 10000},
        description:{type: String , required : true},

    },
    {
        timestamps: true,
    }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;