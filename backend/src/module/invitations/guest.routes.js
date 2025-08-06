import express from 'express'
import { createGuestRouteSchema } from "./guest.routes.schema.js";
import guestRepository from './guest.repository.js'

const guestRouter = express.Router()




guestRouter.post('/', async (req, res) => {
  const body = createGuestRouteSchema.body.parse(req.body);
  const newGuest = await guestRepository.addOneGuest(body);
  res.json(newGuest);
});


export default guestRouter;