const User = require('../models/user.model');
const { use } = require('../routes/user.routes');


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

//Buscar un usuario por ID
const findOne = (req, res) => {
    User.findById(req.params.id).then( user => {
        if(!user) {
            return res.status(404).send({
                message: `No se encontro el usuario con el id: ${req.params.id}`
            });
        }
        res.send(user);
    }).catch( err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message : `No se encontro el usuario con el id: ${req.params.id}`
            });
        }
        return res.status(500).send({
            message:`Error al obtner el usuario con el id: ${req.params.id}`
        });
    });
};

//Actualizar usuario
const update = (req, res) => {
    //Validamos la peticion
    if(!req.body) {
        return res.status(400).send({
            message: 'Por favor llene todos los campos'
        })
    }

    //Actualizamos el usuario
    User.findByIdAndUpdate(req.params.id, {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone
    }, {new: true}).then(user => {
        if(!user) {
            return res.status(404).send({
                message: `No se encontro el usuario con id: ${req.body.id}`
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: `No se encontro el usuario con el id: ${req.body.id}`
            });
        }

        return res.status(500).send({
            message: `Error al actualizar el usuario con el id: ${req.body.id}`
        });
    });
};

//Eliminar usuario por id
const remove = (req, res) => {
    User.findByIdAndRemove(req.body.id).then(user => {
        if(!user) {
            return res.status(404).send({
                message: `No se encontro el usuario con el id: ${req.body.id}`
            });
        }
        res.send({message : 'Usuario eliminado exitosamente'});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'Not Found') {
            return res.status(404).send({
                message: `No se encontro el usuario con el id: ${req.body.id}`
            });
        }
        return res.status(500).send({
            message: `Error al eliminar el usuario con el id ${req.body.id}`
        });
    });
};

module.exports = {
    findAll,
    create,
    findOne,
    update,
    remove
}