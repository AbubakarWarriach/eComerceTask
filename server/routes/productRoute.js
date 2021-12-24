const app = require("express");
const route = app.Router();
const {addProduct, fetchProducts, fetchProduct, sendEmail} = require('../controler/productControler');
route.get("/user_email/:email", sendEmail);
route.post("/add_product", addProduct);
route.get("/fetch_products/:page", fetchProducts);
route.get("/fetch_product/:id", fetchProduct);
module.exports = route;