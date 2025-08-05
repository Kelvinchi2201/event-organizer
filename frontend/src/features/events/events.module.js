import { atom } from "nanostores";
import { createNotification } from "../notifications/notificiation.js";
import { BACK_ENDPOINT } from "../../config/endpoints.js";
import ky from "ky";
const BASE_URL = `${BACK_ENDPOINT}/api/contacts`;


/** 
  * @typedef Contact
  * @type {object}
  * @property {string} id El id del contacto
  * @property {string} name El nombre del contacto
  * @property {string} phone El numero del contacto
*/

/** @type {Contact[]} */
let eventsArray = [];
export const contacts = atom(eventsArray);






const addEvent = async (eventToCreate) => {
  try {
    const contactCreated = await ky.post(BASE_URL, {json: eventToCreate, credentials: 'include'}).json();
    createNotification({title: 'Evento creado!',type: 'success'});
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