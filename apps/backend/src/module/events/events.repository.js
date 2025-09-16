import db from '../../db/index.js';
import { ErrorWithStatus } from '../../utils/errorTypes.js';

const getAll = async () => {
  const response = await db.query('SELECT * FROM events');
  return response.rows;
};

const getEventsById = async (usuarios_id) => {
  const response = await db.query(
    `
    SELECT * FROM events
    WHERE usuarios_id = $1
    `,
    [usuarios_id]
  );
  return response.rows;
};

const addOneEvents = async (payload) => {
  const response = await db.query(
    `
    INSERT INTO events (name, description, fecha_evento, hora_evento,  portada_url, usuarios_id)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
  `,
    [payload.name, 
      payload.description, 
      payload.fecha_evento, 
      payload.hora_evento, 
      payload.portada_url, 
      payload.usuarios_id],
  );
  return response.rows[0];
};

const updateEventsById = async (id, payload) => {
  let query = `
    UPDATE events
    SET name = $1, description = $2, fecha_evento = $3, hora_evento = $4
    WHERE id = $5
    RETURNING *
  `;
  let values = [
    payload.name, 
    payload.description, 
    payload.fecha_evento, 
    payload.hora_evento, 
    id
  ];

  // Agrega la portada solo si se proporciona en el payload
  if (payload.portada_url !== undefined) {
    query = `
      UPDATE events
      SET name = $1, description = $2, fecha_evento = $3, hora_evento = $4, portada_url = $5
      WHERE id = $6
      RETURNING *
    `;
    values = [
      payload.name, 
      payload.description, 
      payload.fecha_evento, 
      payload.hora_evento, 
      payload.portada_url, 
      id
    ];
  }
  
  const response = await db.query(query, values);
  
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'El evento no fue encontrado');
  }
  return response.rows[0];
};

const deleteEventsById = async (id) => {
  const response = await db.query(
    `
    DELETE FROM events
    WHERE id = $1 RETURNING *
  `,
    [id],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'El evento fue no encontrado');
  }
  return response.rows[0];
};

const eventsRepository = { addOneEvents, updateEventsById, deleteEventsById, getAll, getEventsById };

export default eventsRepository;