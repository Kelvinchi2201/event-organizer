import express from 'express';
import commentsRepository from './comments.repository.js';
import { createCommentsRouteSchema, deleteCommentsRouteSchema, updateCommentsRouteSchema } from './comments.route.schemas.js';
import { endpoint } from '../../config/endpoints.js';
import { authenticateUser } from '../auth/auth.middlewares.js';

const commentsRouter = express.Router();

commentsRouter.post('/', async (req, res) => {
    const body = createCommentsRouteSchema.body.parse(req.body);
    const newComment = await commentsRepository.addOneComment(body);
    res.status(201).json(newComment);
});

