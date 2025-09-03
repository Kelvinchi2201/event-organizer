import { atom } from "nanostores";
import { createNotification } from "../notifications/notificiation.js";
import { BACK_ENDPOINT } from "../../config/endpoints.js";
import ky from "ky";

 const BASE_URL_EVENTS = `${BACK_ENDPOINT}/api/events`;
 const BASE_URL_GUESTS = `${BACK_ENDPOINT}/api/guest`;

 let eventsArray = []
 export const events = atom(eventsArray);

 let guetsArray = []
 export const guets = atom(guetsArray);



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
 }

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
 }

  const getGuestsByEventIdForList = async (event_Id) => {
   const guestsData = await ky.get(`${BASE_URL_GUESTS}/events/${event_Id}/count`, {credentials: 'include'}).json();
   guets.set(guestsData)
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
    const eventToUpdated = await ky.put(url, {json: eventToUpdate}).json();
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
}
 


 export default { getEventsListForHome, getGuestsByEventId, updateEvents, getGuestsByUserId, getEventsListByUserId, getGuestsByEventIdForList };