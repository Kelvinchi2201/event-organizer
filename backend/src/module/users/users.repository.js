import db from '../../db/index.js';

const getAll = async () => {
  const response = await db.query('SELECT * FROM usuarios');
  return response.rows;
};

const addOne = async (payload) => {
  const response = await db.query(
    `
    INSERT INTO usuarios (email, passwordHash)
    VALUES ($1, $2) RETURNING *
  `,
    [payload.email, payload.passwordHash],
  );
  return response.rows[0];
};

const usersRepository = { addOne, getAll };

export default usersRepository;
