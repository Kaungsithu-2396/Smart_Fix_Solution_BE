const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const serviceItemRoutes = require("./routes/serviceItemRoutes");
const technicianRoutes = require("./routes/technicianRoutes");
const multer = require("multer");
const upload = multer();
const PORT = process.env.PORT || 4000;

const errorHandler = require("../backend/middleware/errorHandler");
const app = express();
const connectDB = require("./config/db_config");

connectDB();
app.use(upload.any());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/serviceItems", serviceItemRoutes);
app.use("/api/v1/technicians", technicianRoutes);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`app is running on ${PORT}`);
});
// const uploadProduct_Img = upload.single("product_img");
// module.exports = uploadProduct_Img;
