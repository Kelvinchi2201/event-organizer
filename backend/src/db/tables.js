import db from './index.js';


const createUsersTable = async () => {
  await db.query('DROP TABLE IF EXISTS usuarios CASCADE');
  await db.query(`
    CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    passwordHash TEXT NOT NULL
    )
  `);
  console.log('Tabla de usuarios creada');
};




const createEventsTable = async () => {
  await db.query('DROP TABLE IF EXISTS events CASCADE');
  await db.query(`
    CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    descripcion TEXT,
    fecha_evento DATE NOT NULL,
    hora_evento TIME,
    usuarios_id INTEGER NOT NULL,
    fecha_creacion TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_usuario
        FOREIGN KEY(usuarios_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE

    )
  `);
  console.log('Tabla de eventos creada');
};
const createGuestsTable = async () => {
    await db.query('DROP TABLE IF EXISTS invitados CASCADE');
    await db.query(`
      CREATE TABLE invitados (
        id SERIAL PRIMARY KEY,
        estado_asistencia BOOLEAN DEFAULT FALSE,
        fecha_respuesta TIMESTAMP WITH TIME ZONE,
        usuarios_id INTEGER NOT NULL,
        events_id INTEGER NOT NULL,

        CONSTRAINT fk_usuarios
            FOREIGN KEY(usuarios_id)
            REFERENCES usuarios(id)
            ON DELETE CASCADE,

        CONSTRAINT fk_events
            FOREIGN KEY(events_id)
            REFERENCES events(id)
            ON DELETE CASCADE
      )
    `);
    console.log('Tabla invitados creada');
};


const createIndicationsTable = async () => {
    await db.query('DROP TABLE IF EXISTS indicaciones CASCADE');
    await db.query(`
        CREATE TABLE indicaciones (
            id SERIAL PRIMARY KEY,
            titulo TEXT NOT NULL,
            descripcion TEXT,
            fecha_publicacion TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
            events_id INTEGER NOT NULL,

            CONSTRAINT fk_events
                FOREIGN KEY(events_id)
                REFERENCES events(id)
                ON DELETE CASCADE
        )
    `);
    console.log('Tabla indicaciones creada');
};




const createTables = async () => {
  try {
    
    await createUsersTable();
    await createEventsTable();
    await createGuestsTable();
    await createIndicationsTable();

    console.log('Todas las tablas fueron creadas correctamente');
  } catch (error) {
    console.error('Error al crear las tablas:', error);
  } finally {
    
    process.exit();
  }
};


createTables();


