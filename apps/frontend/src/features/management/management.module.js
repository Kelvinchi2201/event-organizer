import { atom } from "nanostores";
import { createNotification } from "../notifications/notificiation.js";
import { BACK_ENDPOINT } from "../../config/endpoints.js";
import ky from "ky";

 const BASE_URL_EVENTS = `${BACK_ENDPOINT}/api/events`;
 const BASE_URL_GUESTS = `${BACK_ENDPOINT}/api/guest`;

 let eventsArray = []
 export const events = atom(eventsArray);

 let guestsArray = []
 export const guests = atom(guestsArray);



 const getEventsListForHome = async () => {
   try {
     const eventsData = await ky.get(`${BASE_URL_EVENTS}`, { credentials: 'include' }).json();
     events.set(eventsData);
   } catch (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      location.replace('/login');
    }
    console.log(error);
    
   }
 };

  const getEventsListByUserId = async (userId) => {
   try {
     const eventsData = await ky.get(`${BASE_URL_EVENTS}/events/${userId}`, { credentials: 'include' }).json();
     events.set(eventsData);
   } catch (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      location.replace('/login');
    }
    console.log(error);
    
   }
 };

  const getGuestsListByEventId = async (event_Id) => {
    try {
        const guestsData = await ky.get(`${BASE_URL_GUESTS}/events/${event_Id}`, {credentials: 'include'}).json();
        guests.set(guestsData);
    } catch (error) {
        console.log(error);
        createNotification({
            title: 'Error al cargar invitados',
            description: 'No se pudo obtener la lista de invitados para este evento.',
            type: 'error'
        });
    }
 };


 

 const getGuestsByEventId = async (event_Id) => {
   const guestsData = await ky.get(`${BASE_URL_GUESTS}/events/${event_Id}/count`, {credentials: 'include'}).json();
   return guestsData
 };


 const getGuestsByUserId = async (userId) => {
   const eventsData = await ky.get(`${BASE_URL_EVENTS}/events/${userId}`, {credentials: 'include'}).json();
   return eventsData
 };


const updateEvents = async (eventToUpdate) => {
  const url = `${BASE_URL_EVENTS}/${eventToUpdate.id}`;
  try {
    const eventToUpdated = await ky.patch(url, {json: eventToUpdate}).json();
    events.set(events.get().map(event => {
      if (event.id === eventToUpdated.id) {
        return eventToUpdated;
      } else {
        return event;
      }
    }));
     createNotification({
      title: 'Evento actualizado',
      description: `${eventToUpdated.name}`,
      type: 'success'
    });
  } catch (error) {
    console.log(error);
    const errorData = await error.response.json();
    createNotification({
      title: 'Ups! Hubo un error',
      description: errorData.error,
      type: 'error'
    });
  }
};
const deleteEventById = async (eventId) => {
  const url = `${BASE_URL_EVENTS}/${eventId}`;
  try {
    const eventDeleted = await ky.delete(url, { credentials: 'include' });
    events.set(events.get().concat(eventDeleted));
    createNotification({
      title: 'Evento Eliminado',
      type:'success'
    })
} catch (error) {
  console.log(error);
  const errorData = await error.response.json();
  createNotification({
    title: 'Hubo un error al intentar eliminar el evento',
    description: errorData.error,
    type: 'error'
  })
  
}
};

const deleteGuestById = async (guestId) => {
  const url = `${BASE_URL_GUESTS}/${guestId}`;
  try {
    const guestDeleted = await ky.delete(url, { credentials: 'include' });
    guests.set(guests.get().concat(guestDeleted));
    createNotification({
      title: 'Invitado Eliminado',
      type:'success'
    })
} catch (error) {
  console.log(error);
  const errorData = await error.response.json();
  createNotification({
    title: 'Hubo un error al intentar eliminar al invitado',
    description: errorData.error,
    type: 'error'
  })
  
}
};

const updateGuest = async (guestToUpdate) => {
    const url = `${BASE_URL_GUESTS}/${guestToUpdate.id}`;
    try {
        const updatedGuest = await ky.patch(url, { json: guestToUpdate, credentials: 'include' }).json();
        guests.set(guests.get().map(guest => {
            if (guest.id === updatedGuest.id) {
                return updatedGuest;
            } else {
                return guest;
            }
          
        }));
        createNotification({
          title:'Invitado esdita correctamente',
          type:'success'
        })
      } catch (error) {
  console.log(error);
  const errorData = await error.response.json();
  createNotification({
    title: 'Hubo un error al intentar editar al invitado',
    description: errorData.error,
    type: 'error'
  })}
    };


 export default { 
  getEventsListForHome, 
  getGuestsByEventId, 
  updateEvents, 
  getGuestsByUserId, 
  getEventsListByUserId, 
  getGuestsListByEventId, 
  deleteGuestById, 
  updateGuest,
  deleteEventById 
};