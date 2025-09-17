import db from './index.js';


const createUsersTable = async () => {
  await db.query('DROP TABLE IF EXISTS usuarios CASCADE');
  await db.query(`
    CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    passwordHash TEXT NOT NULL,
    verify_email BOOLEAN DEFAULT false
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
    description TEXT,
    fecha_evento DATE NOT NULL,
    hora_evento TIME,
    usuarios_id INTEGER NOT NULL,
    fecha_creacion TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    portada_url TEXT,

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
        fecha_envio TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        guest_name TEXT,
        guest_email TEXT NOT NULL,
        events_id INTEGER NOT NULL,
        indications TEXT,
        event_name TEXT,

        CONSTRAINT fk_events
            FOREIGN KEY(events_id)
            REFERENCES events(id)
            ON DELETE CASCADE
      )
    `);
    console.log('Tabla invitados creada');
};





const createTables = async () => {
  try {
    
    await createUsersTable();
    await createEventsTable();
    await createGuestsTable();
  

    console.log('Todas las tablas fueron creadas correctamente');
  } catch (error) {
    console.error('Error al crear las tablas:', error);
  } finally {
    
    process.exit();
  }
};


createTables();


