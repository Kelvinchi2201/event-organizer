import express from 'express'
import { createGuestRouteSchema, createIndicationsRouteSchema } from "./guest.routes.schema.js";
import guestRepository from './guest.repository.js'

const guestRouter = express.Router()




guestRouter.post('/', async (req, res) => {
  const body = createGuestRouteSchema.body.parse(req.body);
  const newGuest = await guestRepository.addOneGuest(body);
  res.json(newGuest);
});

guestRouter.patch('/:id', async (req, res) => {
  const body = createIndicationsRouteSchema.body.parse(req.body);
  const params = createIndicationsRouteSchema.params.parse(req.params);
  const addIndications = await guestRepository.addIndicationsById(params.id, body);
  res.json(addIndications);
})


export default guestRouter;