const dao = require('../dao/docenteDao');
const dto = require('../dto/docenteDto');

exports.createDocente = async (req, res) => {
  try {
    const payload = req.validatedBody || req.body;
    try {
      const docente = await dao.create(payload);
      return res.status(201).json({ ok: true, docente });
    } catch (err) {
      if (err.code === '23505') return res.status(400).json({ ok: false, error: 'Correo ya existe' });
      throw err;
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Error al crear docente' });
  }
};

exports.listDocentes = async (req, res) => {
  try {
    const filters = { especialidad: req.query.especialidad, q: req.query.q };
    const docentes = await dao.findAll(filters);
    res.json({ ok: true, docentes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Error al listar docentes' });
  }
};

exports.getDocenteById = async (req, res) => {
  try {
    const { id } = req.params;
    const docente = await dao.findById(id);
    if (!docente) return res.status(404).json({ ok: false, error: 'Docente no encontrado' });
    res.json({ ok: true, docente });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Error al obtener docente' });
  }
};

exports.updateDocente = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.validatedBody || req.body;
    try {
      const updated = await dao.update(id, payload);
      if (!updated) return res.status(404).json({ ok: false, error: 'Docente no encontrado' });
      return res.json({ ok: true, docente: updated });
    } catch (err) {
      if (err.code === '23505') return res.status(400).json({ ok: false, error: 'Correo ya existe' });
      throw err;
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Error al actualizar docente' });
  }
};

exports.deleteDocente = async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await dao.remove(id);
    if (!removed) return res.status(404).json({ ok: false, error: 'Docente no encontrado' });
    res.json({ ok: true, message: 'Docente eliminado', docente: removed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Error al eliminar docente' });
  }
};

exports.averageExperience = async (req, res) => {
  try {
    const especialidad = req.query.especialidad;
    const stats = await dao.averageExperience(especialidad);
    res.json({ ok: true, average: stats.average, count: stats.count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Error al calcular promedio' });
  }
};
