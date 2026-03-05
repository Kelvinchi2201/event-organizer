import db from '../../db/index.js';
import { ErrorWithStatus } from '../../utils/errorTypes.js';

const getAllComments = async () => {
    const response = await db.query('SELECT * FROM comentarios');
    return response.rows;
};

const addOneComment = async (payload) => {
    const response = await db.query(
        `INSERT INTO comentarios ( contenido, usuarios_id, events_id )
        VALUES ($1, $2, $3) RETURNING *
        `,
        [payload.contenido, payload.usuariosId, payload.eventsId]
    );
    return response.rows[0];
};