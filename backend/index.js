import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
//middleware...
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  Credentials: true,
};

app.use(cors(corsOptions));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is Running on the port ${PORT}`);
});

app.get("/home",(req,res)=>{
    return res.json({
        message:"Backend is working",
        success:true,
    })
});