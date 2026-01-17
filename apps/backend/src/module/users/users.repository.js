import db from '../../db/index.js';
import { ErrorWithStatus } from '../../utils/errorTypes.js';

const getAll = async () => {
  const response = await db.query('SELECT * FROM usuarios');
  return response.rows;
};

const addOne = async (payload) => {
  const response = await db.query(
    `
    INSERT INTO usuarios (name, email, passwordHash)
    VALUES ($1, $2, $3) RETURNING *
  `,
    [payload.name, payload.email, payload.passwordHash],
  );
  return response.rows[0];
};

const verifyOne = async (payload) => {
  const response = await db.query(
    `
    UPDATE usuarios
    SET verify_email = true
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


const findByEmail = async (payload) => {
  const response = await db.query(
    `
    SELECT * FROM usuarios
    WHERE email = $1
  `,
    [payload.email],
  );
  return response.rows[0];
};


const usersRepository = { addOne, getAll, verifyOne, findByEmail};

export default usersRepository;
