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

const deleteCommentById = async (id) => {
    const response = await db.query(
        `DELETE FROM comentarios
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );
    return response.rows[0];
};

const updateCommentsById = async (id, payload) => {
    const response = await db.query(
        `UPDATE comentarios
        SET contenido = $1
        WHERE id = $2
        RETURNING *
        `,
        [payload.contenido, id]
    );
    return response.rows[0];
};

const commentsRepository = { getAllComments, addOneComment, deleteCommentById, updateCommentsById};

export default commentsRepository;

