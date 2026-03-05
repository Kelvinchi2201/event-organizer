import db from '../../db/index.js';
import { ErrorWithStatus } from '../../utils/errorTypes.js';

const getAllComments = async () => {
    const response = await db.query('SELECT * FROM comentarios');
    return response.rows;
};
