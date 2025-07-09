import express from 'express';
import eventsRepository from './events.repository.js';
import {
    createEventsRouteSchema,
    deleteEventsRouteSchema,
    updateEventsRouteSchema 
} from './events.routes.schemas.js';

const eventsRouter = express.Router()


eventsRouter.get('/', async (req, res) => {
  const events = await eventsRepository.getAll();
  res.json(events);
});

eventsRouter.post('/', async (req, res) => {
  const body = createEventsRouteSchema.body.parse(req.body);
  const newEvent = await eventsRepository.addOneEvents(body);
  res.json(newEvent);
});


export default eventsRouter;