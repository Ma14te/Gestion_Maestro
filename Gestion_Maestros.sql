-- Crear la tabla Docente
CREATE TABLE docentes (
    id SERIAL PRIMARY KEY,           -- Identificador único autoincremental
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    correo VARCHAR(150) UNIQUE NOT NULL, -- El correo no se debe repetir
    especialidad VARCHAR(100) NOT NULL,
    anos_experiencia INTEGER CHECK (anos_experiencia >= 0) -- Evita números negativos
);

INSERT INTO docentes (nombres, apellidos, correo, especialidad, anos_experiencia) VALUES
('Juan', 'Pérez', 'juan.perez@example.com', 'Matemáticas', 5),
('Maria', 'Gómez', 'maria.gomez@example.com', 'Literatura', 12),
('Carlos', 'López', 'carlos.lopez@example.com', 'Matemáticas', 8),
('Ana', 'Martínez', 'ana.martinez@example.com', 'Ciencias', 3),
('Luis', 'Rodríguez', 'luis.rodriguez@example.com', 'Historia', 15),
('Elena', 'Torres', 'elena.torres@example.com', 'Matemáticas', 2);