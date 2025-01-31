import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },

        password: {
            type: String,
            required: [true, "Password is required"],
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", productSchema);

export default User;