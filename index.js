import express from 'express';
import userRoutes from './routes/user';  

const app = express();

app.use(express.json());
app.use(cors());

app.use("/usuario", userRoutes);

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
