import db from '../../db/index.js';
import { ErrorWithStatus } from '../../utils/errorTypes.js';


const getAll = async () => {
  const response = await db.query('SELECT * FROM indicaciones');
  return response.rows;
};


const addOneIndications = async (payload) => {
  const response = await db.query(
    `
    INSERT INTO indicaciones (titulo, descripcion, events_id)
    VALUES ($1, $2, $3) RETURNING *
  `,
    [payload.titulo, payload.descripcion, payload.events_id],
  );
  return response.rows[0];
 
  
};


const deleteIndicationsById = async (id) => {
  const response = await db.query(
    `
    DELETE FROM indicaciones
    WHERE id = $1 RETURNING *
  `,
    [id],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'El evento fue no encontrado');
  }
  return response.rows[0];
};

const updateIndicationsById = async (id, payload) => {
  const response = await db.query(
    `
    UPDATE indicaciones
    SET titulo = $1, descripcion = $2, fecha_publicacion = NOW()
    WHERE id = $3
    RETURNING *
  `,
    [payload.titulo, payload.descripcion, id],
  );
  if (response.rowCount === 0) {
    throw new ErrorWithStatus(404, 'El evento fue no encontrado');
  }
  return response.rows[0];
};


export default { getAll, addOneIndications, deleteIndicationsById, updateIndicationsById};
