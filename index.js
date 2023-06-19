import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
// REGISTER
import { register } from "./controllers/auth.js";
// authRoutes
import authRoutes from "./routes/auth.js";
// import fileUpload from "express-fileupload";

import userRoutes from "./routes/users.js";
import postsRoutes from "./routes/posts.js";
import {spamInsert} from "./routes/postinsert.js";
// import multer from "multer";


// import userRouter from "./routes/user"

// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use("assets", express.static(path.join(__dirname, 'public/assets')))

// FILLE STORAGE
// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"public/assets");
//     },
//     filename:(req,file,cb)=>{
//         cd(null,file.originalname);
//     }
// })

// const upload = multer({storage})


// ROUTES WITH FILES
// upload.single("picture")
app.post("/auth/register",register)
// AUTH ROUTE
app.use("/auth", authRoutes);
app.use("/users",userRoutes);
app.use("/posts",postsRoutes);
app.post("/post/insert",spamInsert);




// MONGOOSE SETUP
const PORT = process.env.PORT || 6001;

const mongoose_connection_variable = async () => await mongoose.connect(process.env.MONGO_URL);

mongoose_connection_variable()
    .then(res => {
        app.listen(PORT,()=>console.log(`${res.connection.states['1']} \n PORT : ${PORT} `))
    })
    .catch(err => console.log(`caught the error: ${err}`))