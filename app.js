require('dotenv').config();
const express = require('express');
const cors = require('cors');
const docentesRouter = require('./routes/docentes');
const logger = require('./middlewares/logger');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const frontendUrl = process.env.FRONTEND_URL;
const corsOptions = frontendUrl ? { origin: frontendUrl, credentials: true } : {};
app.use(cors(corsOptions));
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
