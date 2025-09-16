import express from 'express';
import eventsRepository from './events.repository.js';
import {
    createEventsRouteSchema,
    deleteEventsRouteSchema,
    updateEventsRouteSchema,
    getEventsByIdRouteSchema,
} from './events.routes.schemas.js';
import upload from '../../middleware/multer.config.js';
import supabase from '../../middleware/supabase.config.js';
import path from 'path';

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

eventsRouter.post('/', upload.single('portada'), async (req, res, next) => {
  try {
    // Aquí es donde multer ya ha procesado la solicitud y ha añadido los campos
    // de texto del FormData a `req.body`.
    // La validación de Zod ahora debe procesar este `req.body`
    const body = createEventsRouteSchema.body.parse(req.body);
    
    // El resto de tu lógica para subir a Supabase y guardar en la base de datos
    // ya es correcta y no necesita cambios adicionales.
    let portadaUrl = null;

    if (req.file) {
      const file = req.file;
      const fileName = `cover-${Date.now()}${path.extname(file.originalname)}`;
      
      const { data, error } = await supabase.storage
        .from('eventos-portada')
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        throw error;
      }

      const { data: publicUrlData } = supabase.storage
        .from('eventos-portada')
        .getPublicUrl(fileName);
        
      portadaUrl = publicUrlData.publicUrl;
    }
    
    const eventData = {
      ...body,
      portada_url: portadaUrl,
    };
    
    const newEvent = await eventsRepository.addOneEvents(eventData);
    res.status(201).json(newEvent);

  } catch (error) {
    next(error); 
  }
});

eventsRouter.delete('/:id', async (req, res) => {
  const params = deleteEventsRouteSchema.params.parse(req.params)
   console.log('PARAMS', params);
  const eventsDeleted = await eventsRepository.deleteEventsById(params.id);
  console.log('EVENTO ELIMINADO', eventsDeleted);

  res.json(eventsDeleted);
});

eventsRouter.patch('/:id', upload.single('portada'), async (req, res, next) => {
  try {
    // Si se sube un nuevo archivo, usamos esa URL en su lugar.
    if (req.file) {
      const file = req.file;
      const fileName = `cover-${Date.now()}${path.extname(file.originalname)}`;
      const { data, error } = await supabase.storage
        .from('eventos-portada')
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        throw error;
      }

      const { data: publicUrlData } = supabase.storage
        .from('eventos-portada')
        .getPublicUrl(fileName);

      req.body.portada_url = publicUrlData.publicUrl;
    } else {
      // Si no se sube un archivo, nos aseguramos de que portada_url no esté en el body para que se omita en el esquema de Zod.
      delete req.body.portada_url;
    }
    const body = updateEventsRouteSchema.body.parse(req.body);

    const { id } = updateEventsRouteSchema.params.parse(req.params);
    const updatedEvent = await eventsRepository.updateEventsById(id, body);
    res.json(updatedEvent);
  } catch (error) {
    next(error);
  }
});







export default eventsRouter;