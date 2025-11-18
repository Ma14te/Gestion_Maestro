require('dotenv').config();
const db = require('./db');

(async () => {
  try {
    console.log('Probando conexión a la base de datos y leyendo hasta 5 filas de `docentes`...');
    const result = await db.query('SELECT * FROM docentes LIMIT 5');
    console.log('Filas recibidas:', result.rows.length);
    console.log(JSON.stringify(result.rows, null, 2));
    process.exit(0);
  } catch (err) {
    console.error('Error al consultar la base de datos:');
    console.error(err);
    process.exit(1);
  }
})();
