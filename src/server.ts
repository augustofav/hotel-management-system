import app from './app';

const PORT = process.env.PORT || 1000;

app.listen(PORT, () => {
    console.log(`Servidor do Projeto Final rodando na porta ${PORT}`);
});

// app.get('/aluno/:id', (req, res) =>{

//     res.send(`O id que preenchemos é ${req.params.id}`)
// })

// app.post('/aluno/', (req, res) =>{
//     const nome = req.body.nome;
//     const senha = req.body.senha;
//     res.send(`O nome que preenchemos é ${nome} e a senha é ${req.body.senha} o Email é ${req.body.email}`)
// })

// app.put('/aluno/:id', (req, res) =>{
//     const buscaID = req.parans.id;
//     const nome = req.body.nome;
//     const senha = req.body.senha;
//     res.send(`O nome que preenchemos é ${nome} e a senha é ${req.body.senha} o Email é ${req.body.email}`)
// })

// app.patch('/aluno/:id', (req, res) =>{
//     const buscaID = req.parans.id;
//     const nome = req.body.nome;
//     res.send(`O nome que preenchemos é ${nome}`)
// })

// app.delete('/aluno/:id', (req, res) =>{
//     const id = req.parans.id;
//     res.send(`O nome que preenchemos é ${nome}`)
// })




// app.get('/', (req, res) =>{
//     const nome = req.body.nome;
//     const senha = req.body.senha;
//     res.send(`O nome que preenchemos é ${nome} e a senha é ${req.body.senha} o Email é ${req.body.email}`)
// })
// app.get('/', (req, res) =>{
//     const nome = req.body.nome;
//     const senha = req.body.senha;
//     res.send(`O nome que preenchemos é ${nome} e a senha é ${req.body.senha} o Email é ${req.body.email}`)
// })
// app.get('/:id', (req, res) =>{
//     res.send(`O id que preenchemos é ${req.params.id}`)
// })

// app.get('/:nome', (req, res) =>{
//     res.send(`O nome que preenchemos é ${req.params.nome}`)
// })

// app.get('/:id/:nome', (req, res) =>{
//     const id = req.params.id;
//     const nome = req.params.nome;
//     res.send(`O id que preenchemos é ${id} e o nome é ${nome}`)
// })

// app.get('/', (req, res) =>{
//     const id = req.query.id;
//     res.send(`O id que preenchemos é ${id} e o nome é ${req.query.nome}`)
// })

// app.get('/', (req, res) =>{
//     const nome = req.headers.nome;
//     const id = req.headers.id;
//     res.send(`O nome que preenchemos é ${nome} e o id é ${req.headers.cpf}`)
// })

// app.post('/aluno', (req, res) =>{
//     try {
//         const id = req.body.id;
//         const nome = req.body.nome;
//         res.send(`Cadastro realizado com sucesso, as informações cadastradas são:`)    
//     } catch (error) {
//         res.send(`Ocorreu algum erro ao cadastrar o aluno, por favor tente novamente`)    
//     }
    
// })
