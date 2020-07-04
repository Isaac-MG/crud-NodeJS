const express = require('express');
const router = express.Router();

//importamos al controlador
const userController = require('../controllers/user.controllers');

//Mostrar todos los usuarios
router.get('/', userController.findAll);

//Crear un nuevo usuario
router.post('/', userController.create);

//Mostrar un usuario en especifico
router.get('/:id', userController.findOne);

//Actualizar un usuario
router.put('/:id', userController.update);

//Borrra un usuario
router.delete('/:id', userController.remove);

module.exports = router;