
import db from '../../db/index.js';
import { ErrorWithStatus } from '../../utils/errorTypes.js';



const getAll = async () => {
  const response = await db.query('SELECT * FROM invitados');
  return response.rows;
};

const countByEventId = async (events_id) => {
 const response = await db.query(
    `SELECT * FROM invitados WHERE events_id = $1`,
    [events_id]
  );
  return response.rowCount;
}

const getByEventId = async (events_id) => {
  const response = await db.query(
    `SELECT * FROM invitados WHERE events_id = $1`,
    [events_id]
  );
  return response.rows;
}

const addOneGuest = async (payload) => {
  const response = await db.query(
    `
    INSERT INTO invitados (guest_name, events_id, guest_email, indications, event_name)
    VALUES ($1, $2, $3, $4, $5) RETURNING *
  `,
    [payload.guest_name, payload.events_id, payload.guest_email, payload.indications, payload.event_name],
  );
  return response.rows[0];
};

const updateGuestById = async (id, payload) => {
  const response = await db.query(
    `
    UPDATE invitados
    SET indications = $1, guest_name = $2
    WHERE id = $3
    RETURNING *
  `,
    [payload.indications, payload.guest_name, id],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'El evento fue no encontrado');
  }
  return response.rows[0];
};


const verifyAttendance = async (payload) => {
  const response = await db.query(
    `
    UPDATE invitados
    SET estado_asistencia = true
    WHERE id = $1
    RETURNING *
  `,
    [payload.id],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(400, 'Token malformado');
  }
  return response.rows[0];
};

const deleteById = async (id) => {
  const response = await db.query(
     `DELETE FROM invitados
     WHERE id = $1 
     RETURNING *`,
     [id],
   );
    if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'El invitado fue no encontrado');
  }
  return response.rows[0];
  
}



const guestRepository = { getAll, addOneGuest, updateGuestById, verifyAttendance, getByEventId, countByEventId, deleteById };

export default guestRepository