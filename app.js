require('dotenv').config();
const express = require('express');
const cors = require('cors');
const docentesRouter = require('./routes/docentes');
const logger = require('./middlewares/logger');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// --- INICIO: CAMBIO DE CONFIGURACIÓN CORS PARA DESARROLLO ---
// Permite peticiones desde cualquier origen ('*') para evitar errores de CORS.
// NOTA: En producción, se recomienda cambiar '*' por el dominio específico de tu frontend.
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true, 
}));
// --- FIN: CAMBIO DE CONFIGURACIÓN CORS PARA DESARROLLO ---

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => res.json({ ok: true, message: 'Gestor de Maestros API' }));
app.use('/api/docentes', docentesRouter);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});