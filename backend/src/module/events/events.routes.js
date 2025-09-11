import express from 'express';
import eventsRepository from './events.repository.js';
import {
    createEventsRouteSchema,
    deleteEventsRouteSchema,
    updateEventsRouteSchema,
    getEventsByIdRouteSchema,
} from './events.routes.schemas.js';
import upload from '../../middleware/multer.config.js';

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
    // El campo 'portada' debe coincidir con el nombre del campo en el formulario del frontend
    const body = createEventsRouteSchema.body.parse(req.body);
    let portadaUrl = null;

    if (req.file) {
      // Si se subió un archivo, lo procesamos
      const file = req.file;
      const fileName = `cover-${Date.now()}${path.extname(file.originalname)}`;
     
      
      // Subir el archivo a Supabase Storage
      const { data, error } = await supabase.storage
        .from('eventos-portadas') // El nombre de tu bucket
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        throw error;
      }

      // Obtener la URL pública del archivo subido
      const { data: publicUrlData } = supabase.storage
        .from('eventos-portadas')
        .getPublicUrl(fileName);
        
      portadaUrl = publicUrlData.publicUrl;
    }
    
    // Añadimos la URL al objeto que se guardará en la base de datos
    const eventData = {
      ...body,
      portada_url: portadaUrl,
    };
    
    const newEvent = await eventsRepository.addOneEvents(eventData);
    res.status(201).json(newEvent);

  } catch (error) {
    next(error); // Pasa el error al manejador de errores global
  }
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