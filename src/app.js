import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";

//configuration information about origin
const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
//configuration information about response in json
app.use(express.json( { limit : '16kb' }));
//configuration information about url way of encoding
app.use(express.urlencoded( { extended: false } ) );
//configuration information about taking static assets(images) from yor public folder
app.use(express.static("public"));
app.use(cookieParser());










export { app };