import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
dotenv.config({});

const app = express();
//middleware...
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT||3000;

// API'S
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is Running on the port ${PORT}`);
});

app.get("/home",(req,res)=>{
    return res.json({
        message:"Backend is working",
        success:true,
    })
});