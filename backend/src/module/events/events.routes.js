import express from 'express';
import eventsRepository from './events.repository.js';
import {
    createEventsRouteSchema,
    deleteEventsRouteSchema,
    updateEventsRouteSchema,
    getEventsByIdRouteSchema,
} from './events.routes.schemas.js';

const eventsRouter = express.Router()


eventsRouter.get('/', async (req, res) => {
  const events = await eventsRepository.getAll();
  res.json(events);
});
eventsRouter.get('/events/:usuarios_id', async (req, res, next) => {

    const params = getEventsByIdRouteSchema.params.parse(req.params);
    const events = await eventsRepository.getEventsById(params.usuarios_id);
    res.json(events);
  
    
   
});

eventsRouter.post('/', async (req, res) => {
  const body = createEventsRouteSchema.body.parse(req.body);
  const newEvent = await eventsRepository.addOneEvents(body);
  res.json(newEvent);
});

eventsRouter.delete('/:id', async (req, res) => {
  const params = deleteEventsRouteSchema.params.parse(req.params)
   console.log('PARAMS', params);
  const eventsDeleted = await eventsRepository.deleteEventsById(params.id);
  console.log('EVENTO ELIMINADO', eventsDeleted);

  res.json(eventsDeleted);
});

eventsRouter.put('/:id', async (req, res) => {
  const body = updateEventsRouteSchema.body.parse(req.body);
  const params = updateEventsRouteSchema.params.parse(req.params);
  const updateEvents = await eventsRepository.updateEventsById(params.id, body);
  res.json(updateEvents);

})






export default eventsRouter;