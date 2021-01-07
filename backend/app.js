// Incluir Express:
const express = require('express');

// Incluir Mongodb:
const mongoose = require('mongoose');

// Importar cors:
const cors = require('cors');

// excutando a função Express:
const app = express();

// Configurar a aplicação para receber dados formato json:
app.use(express.json());

// Configurar mirror:
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Authorization, Content-Type")
    app.use(cors());
    next();
});

// Incluir requisição:
require("./models/Metas");
const Meta = mongoose.model('Meta');

// Realizando a conecção com o banco de dados:
mongoose.connect("mongodb://localhost/myapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected with your Database')
}).catch((error) => {
    console.error("Not connected" + error)
});


// Criar rotas de acesso por meio protocolo HTTP:
// Lsitar todas as Metas:
app.get('/metas', async (req, res) => {
    await Meta.find({}).then((metas) => {
        return res.json({
            error: false,
            metas
        });
    }).catch((error) => {
        return res.status(400).json({
            error: true,
            message: "Não foi encontrado registro algum"
        });
    });
});

app.post('/metas', async (req, res) => {

    await sleep(3000);

    function sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    await Meta.create(req.body, (error) => {
        if (error) return res.status(400).json({
            error: true,
            message: "Erro: Não houve sucesso ao cadastrar a Meta!"
        });
    });
    return res.json({
        error: false,
        message: "Meta cadastrada com sucesso!"
    })
});

//! Run Application:
app.listen(8080, () => {
    console.log("Server Init port 8080: http://localhost:8080");
});