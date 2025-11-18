const db = require('../db');

async function create(doc) {
  const sql = `INSERT INTO docentes (nombres, apellidos, correo, especialidad, anos_experiencia)
    VALUES ($1,$2,$3,$4,$5) RETURNING *`;
  const params = [doc.nombres, doc.apellidos, doc.correo, doc.especialidad, doc.anos_experiencia];
  const result = await db.query(sql, params);
  return result.rows[0];
}

async function findAll(filters = {}) {
  let base = 'SELECT * FROM docentes';
  const where = [];
  const params = [];
  if (filters.especialidad) {
    params.push(filters.especialidad);
    where.push(`especialidad = $${params.length}`);
  }
  if (filters.q) {
    params.push(`%${filters.q}%`);
    where.push(`(nombres ILIKE $${params.length} OR apellidos ILIKE $${params.length} OR correo ILIKE $${params.length})`);
  }
  const sql = where.length ? `${base} WHERE ${where.join(' AND ')}` : base;
  const result = await db.query(sql, params);
  return result.rows;
}

async function findById(id) {
  const result = await db.query('SELECT * FROM docentes WHERE id = $1', [id]);
  return result.rows[0] || null;
}

async function update(id, doc) {
  // Build dynamic update to allow partial updates
  const sets = [];
  const params = [];
  let idx = 1;
  for (const key of ['nombres','apellidos','correo','especialidad','anos_experiencia']) {
    if (doc[key] !== undefined) {
      params.push(doc[key]);
      sets.push(`${key} = $${idx}`);
      idx++;
    }
  }
  if (sets.length === 0) return await findById(id); // nothing to update
  params.push(id);
  const sql = `UPDATE docentes SET ${sets.join(', ')} WHERE id = $${idx} RETURNING *`;
  const result = await db.query(sql, params);
  return result.rows[0] || null;
}

async function remove(id) {
  const result = await db.query('DELETE FROM docentes WHERE id = $1 RETURNING *', [id]);
  return result.rows[0] || null;
}

async function averageExperience(especialidad) {
  let sql = 'SELECT AVG(anos_experiencia) as average, COUNT(*) as count FROM docentes';
  const params = [];
  if (especialidad) {
    params.push(especialidad);
    sql += ` WHERE especialidad = $1`;
  }
  const result = await db.query(sql, params);
  const avg = result.rows[0].average !== null ? parseFloat(result.rows[0].average) : null;
  return { average: avg, count: parseInt(result.rows[0].count, 10) };
}

module.exports = { create, findAll, findById, update, remove, averageExperience };
