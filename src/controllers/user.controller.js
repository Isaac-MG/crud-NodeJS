const User = require('../models/user.model');


//Mostramos todos los usarios de BD
const findAll = (req, res) => {
    User.find().then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Error al obtener la lista de usuarios'
        });
    });
};

//Crear y almacenar un nuevo usuario
const create = (req, res) => {
    //Validamos la peticion
    if(!req.body) {
        return res.status(400).send({
            message: 'Por favor llene todos los campos requeridos'
        });
    }

    //Creamos un usuario nuevo
    const user = new User({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        phone : req.body.phone
    });

    //Guardamos el usuario en la BD
    user.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message : err || 'Error al crear un nuevo usuario'
        });
    });
};