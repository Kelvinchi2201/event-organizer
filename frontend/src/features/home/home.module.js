import { atom } from "nanostores";
import { createNotification } from "../notifications/notificiation.js";
import { BACK_ENDPOINT } from "../../config/endpoints.js";
import ky from "ky";
 const BASE_URL = `${BACK_ENDPOINT}/api/events`;

 const getEventsListForHome = async () => {
    const eventsData = await ky.get(`${BASE_URL}`, { credentials: 'include' }).json();
    return eventsData;
 }


 export default { getEventsListForHome };
