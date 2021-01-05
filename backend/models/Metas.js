//Importar o mongose:
const mongoose = require('mongoose');

// Criando variavel para mongoose:
const { Schema } = mongoose;

const meta = new Schema({ 
    name: {
        type: String
    },
    descripition: {
        type: String
    },
    status: {
        type: String
    }
}, {
    timestamps: true
});

// Recurso para salvar requisição no Data Base:
mongoose.model("Meta", meta);