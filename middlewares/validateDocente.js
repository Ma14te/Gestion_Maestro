const dto = require('../dto/docenteDto');

function validateCreate(req, res, next) {
  const { valid, errors, data } = dto.validateCreate(req.body);
  if (!valid) return res.status(400).json({ ok: false, errors });
  req.validatedBody = data;
  next();
}

function validateUpdate(req, res, next) {
  const { valid, errors, data } = dto.validateUpdate(req.body);
  if (!valid) return res.status(400).json({ ok: false, errors });
  req.validatedBody = data;
  next();
}

module.exports = { validateCreate, validateUpdate };
