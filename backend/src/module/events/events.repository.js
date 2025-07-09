import db from '../../db/index.js';

const getAll = async () => {
  const response = await db.query('SELECT * FROM events');
  return response.rows;
};

const addOneEvents = async (payload) => {
  const response = await db.query(
    `
    INSERT INTO events (name, description, fecha_evento, hora_evento, usuarios_id)
    VALUES ($1, $2, $3, $4, $5) RETURNING *
  `,
    [payload.name, payload.description, payload.fecha_evento, payload.hora_evento, payload.usuarios_id],
  );
  return response.rows[0];
};

const updateEventsById = async (id, payload) => {
  const response = await db.query(
    `
    UPDATE evets
    SET name = $1, descriprion = $2, fecha_evento = $3, hora_evento = $4
    WHERE id = $5
    RETURNING *
  `,
    [payload.name, payload.description, payload.event_date, payload.event_time, id],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'El evento fue no encontrado');
  }
  return response.rows[0];
};

const deleteEventsById = async (id) => {
  const response = await db.query(
    `
    DELETE FROM evets
    WHERE id = $1 RETURNING *
  `,
    [id],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'El evento fue no encontrado');
  }
  return response.rows[0];
};

const eventsRepository = { addOneEvents, updateEventsById, deleteEventsById, getAll };

export default eventsRepository;