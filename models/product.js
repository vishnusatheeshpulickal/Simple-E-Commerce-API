const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  richDescription: { type: String, default: "" },
  brand: { type: String, default: "" },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  rating: { type: Number, default: 0 },
  isFeatured: Boolean,
  price: { type: Number, default: 0 },
  image: { type: String, default: "" },
  images: [{ type: String }],
  numberInStock: { type: Number, required: true, min: 0 },
  numReviews: { type: Number, default: 0 },
  dataCreated: { type: Date, default: Date.now },
});

exports.Product = mongoose.model("Product", productSchema);
