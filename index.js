const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const routeProtector = require("./middleware/authMiddleware");
const PORT = process.env.PORT || 4000;

const errorHandler = require("../backend/middleware/errorHandler");
const app = express();
const connectDB = require("./config/db_config");

connectDB();
app.use(express.json());
app.use("/api/v1/products", routeProtector, productRoutes);
app.use("/api/v1/users", userRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`app is running on ${PORT}`);
});
