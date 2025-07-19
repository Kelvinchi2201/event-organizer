import indicationsRepository from "./indications.repository.js";
import express from 'express';
import { 
   createIndicationRouteSchema,
   deleteIndicationRouteSchema, 
   updateIndicationsRouteSchema
  } from "./indications.routes.schemas.js";


const indicationsRouter = express.Router()

indicationsRouter.get('/', async (req, res) => {
  const indications = await indicationsRepository.getAll();
  res.json(indications);
});

indicationsRouter.post('/', async (req, res) => {
    const body = createIndicationRouteSchema.body.parse(req.body);
  const newindication = await indicationsRepository.addOneIndications(body);
  res.json(newindication);
})

indicationsRouter.delete('/:id', async (req, res) => {
  const params = deleteIndicationRouteSchema.params.parse(req.params)
   console.log('PARAMS', params);
  const indicationDeleted = await indicationsRepository.deleteIndicationsById(params.id);
  console.log('EVENTO ELIMINADO', indicationDeleted);

  res.json(indicationDeleted);
});

indicationsRouter.put('/:id', async (req, res) => {
  const body = updateIndicationsRouteSchema.body.parse(req.body);
  const params = updateIndicationsRouteSchema.params.parse(req.params);
  const updateEvents = await indicationsRepository.updateIndicationsById(params.id, body);
  res.json(updateEvents);

})

export default indicationsRouter;