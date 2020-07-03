const express = require('express');
const bodyParser = require('body-parser');
//Chalk nos ayudara a dar color a los mensajes de consola
const chalk = require('chalk');
const success = chalk.bold.green;
const error = chalk.bold.red;

const dbConfig = require('./config/db.config');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 4040;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

//Configuración de la BD
mongoose.Promise = global.Promise;

//Conexión a la BD
mongoose.connect (dbConfig.url, {
    useNewUrlParser: true
}).then( () => {
    console.log(success('Conexión a la base de datos exitosa'));
}).catch( err => {
    console.log(error('Error al conectarse a la base de datos: ', err));
    process.exit();
});

//Ruta por defecto, esta es la respuyesta que se vera en el navegador
app.get('/', (req, res) => {
    res.json({'message': 'El servidor esta en linea'})
})

app.listen(port, () => {
    //Mostramos el mensaje en color verde y mostramos el puerto usado
    console.log(success(`El servidor esta escuchando por el puerto ${port}`))
})