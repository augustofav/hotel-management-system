import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import usuario from './routes/user';


dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: "application/vnd.api+json" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(cors());

app.use(usuario)



export default app;