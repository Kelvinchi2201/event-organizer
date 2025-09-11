import { atom } from "nanostores";
import { createNotification } from "../notifications/notificiation.js";
import { BACK_ENDPOINT } from "../../config/endpoints.js";
import ky from "ky";

 const BASE_URL_EVENTS = `${BACK_ENDPOINT}/api/events`;
 const BASE_URL_GUESTS = `${BACK_ENDPOINT}/api/guest`;

 let eventsArray = []
 export const events = atom(eventsArray);



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

 const getGuestsByEventId = async (event_Id) => {
   const guestsData = await ky.get(`${BASE_URL_GUESTS}/events/${event_Id}/count`, {credentials: 'include'}).json();
   return guestsData
 };

 


 export default { getEventsListForHome, getGuestsByEventId };
