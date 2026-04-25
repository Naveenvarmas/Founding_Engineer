import express from "express";
import cors from "cors";
import collegeRoutes from "./routes/collegeRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());


 app.use("/api/colleges", collegeRoutes);

export default app;