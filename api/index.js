import express from 'express';

import cors from 'cors';

const app = express();

app.use(express.json())
app.use(cors())


const PORT = process.env.PORT || 1000;

app.listen(PORT, () => {
    console.log(`Servidor do Projeto Final rodando na porta ${PORT}`);
});