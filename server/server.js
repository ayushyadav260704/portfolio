import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

//routes imports
import projectRoutes from './routes/projectRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

//load environmental variables
dotenv.config();

//initialize database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//mount api routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// Health check route
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "API is operational",
    });
});

// Centralized Error Handler (must be after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in development mode on port ${PORT}`);
});