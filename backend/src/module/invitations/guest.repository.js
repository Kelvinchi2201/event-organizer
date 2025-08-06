//TODO: iniciar el modulo de invitaciones 
import db from '../../db/index.js';
import { ErrorWithStatus } from '../../utils/errorTypes.js';



const getAll = async () => {
  const response = await db.query('SELECT * FROM events');
  return response.rows;
};

const addOneGuest = async (payload) => {
  const response = await db.query(
    `
    INSERT INTO invitados (guest_name, events_id, indications)
    VALUES ($1, $2, $3) RETURNING *
  `,
    [payload.guest_name, payload.events_id, payload.indications],
  );
  return response.rows[0];
};


const guestRepository = {addOneGuest};

export default guestRepository