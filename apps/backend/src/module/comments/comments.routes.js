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

commentsRouter.get('/', async (req, res) => {
    const comments = await commentsRepository.getAllComments();
    res.status(200).json(comments);

});

commentsRouter.delete('/:id', async (req, res) => {
    const params = deleteCommentsRouteSchema.params.parse(req.params);
    const deletedComment = await commentsRepository.deleteCommentById(params.id);
    res.status(200).json(deletedComment);
});


commentsRouter.patch('/:id', async (req, res) => {
    const params = updateCommentsRouteSchema.params.parse(req.params);
    const body = updateCommentsRouteSchema.body.parse(req.body);
    const updatedComment = await commentsRepository.updateCommentsById(params.id, body);
    res.status(200).json(updatedComment);
});


export default commentsRouter;