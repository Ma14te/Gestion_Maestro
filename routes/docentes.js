const express = require('express');
const router = express.Router();
const controller = require('../controllers/docentesController');
const { validateCreate, validateUpdate } = require('../middlewares/validateDocente');

router.post('/', validateCreate, controller.createDocente);
router.get('/', controller.listDocentes);
router.get('/average', controller.averageExperience);
router.get('/:id', controller.getDocenteById);
router.put('/:id', validateUpdate, controller.updateDocente);
router.delete('/:id', controller.deleteDocente);

module.exports = router;
