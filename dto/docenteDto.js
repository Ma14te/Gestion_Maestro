function sanitizeString(v) {
  if (v === undefined || v === null) return v;
  return String(v).trim();
}

function toNumber(v) {
  if (v === undefined || v === null || v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function validateCreate(payload) {
  const errors = [];
  const nombres = sanitizeString(payload.nombres);
  const apellidos = sanitizeString(payload.apellidos);
  const correo = sanitizeString(payload.correo);
  const especialidad = sanitizeString(payload.especialidad);
  const anos_experiencia = toNumber(payload.anos_experiencia);

  if (!nombres) errors.push('nombres es requerido');
  if (!apellidos) errors.push('apellidos es requerido');
  if (!correo) errors.push('correo es requerido');
  if (!especialidad) errors.push('especialidad es requerido');
  if (anos_experiencia === null || anos_experiencia < 0 || !Number.isInteger(anos_experiencia)) errors.push('anos_experiencia debe ser entero >= 0');

  return {
    valid: errors.length === 0,
    errors,
    data: {
      nombres,
      apellidos,
      correo,
      especialidad,
      anos_experiencia
    }
  };
}

function validateUpdate(payload) {
  // For updates, allow partial fields but validate types when present
  const errors = [];
  const out = {};
  if (payload.nombres !== undefined) out.nombres = sanitizeString(payload.nombres);
  if (payload.apellidos !== undefined) out.apellidos = sanitizeString(payload.apellidos);
  if (payload.correo !== undefined) out.correo = sanitizeString(payload.correo);
  if (payload.especialidad !== undefined) out.especialidad = sanitizeString(payload.especialidad);
  if (payload.anos_experiencia !== undefined) {
    const n = toNumber(payload.anos_experiencia);
    if (n === null || n < 0 || !Number.isInteger(n)) errors.push('anos_experiencia debe ser entero >= 0');
    else out.anos_experiencia = n;
  }

  return {
    valid: errors.length === 0,
    errors,
    data: out
  };
}

module.exports = { validateCreate, validateUpdate };
