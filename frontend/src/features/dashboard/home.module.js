import { atom } from "nanostores";
import { createNotification } from "../notifications/notificiation.js";
import { BACK_ENDPOINT } from "../../config/endpoints.js";
import ky from "ky";

 const BASE_URL_EVENTS = `${BACK_ENDPOINT}/api/events`;
 const BASE_URL_GUESTS = `${BACK_ENDPOINT}/api/guest`;

 let eventsArray = []
 export const events = atom(eventsArray);



 const getEventsListForHome = async () => {
    const eventsData = await ky.get(`${BASE_URL_EVENTS}`, { credentials: 'include' }).json();
    return eventsData;
 }

 const getGuestsByEventId = async (userId) => {
   const guestsData = await ky.get(`${BASE_URL_GUESTS}/events/${userId}`, {credentials: 'include'}).json();
   return guestsData
 }


 export default { getEventsListForHome, getGuestsByEventId };
