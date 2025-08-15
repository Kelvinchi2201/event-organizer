import { atom } from "nanostores";
import { createNotification } from "../notifications/notificiation.js";
import { BACK_ENDPOINT } from "../../config/endpoints.js";
import ky from "ky";
 const BASE_URL = `${BACK_ENDPOINT}/api/guest`




/** 
  * @typedef Guests
  * @type {object}
  * @property {string} guest_name El nombre del inivtado
  * @property {number} events_id el id del evento al que pertenece el invitado
  * @property {string} guest_email El email del del invitado
  * @property {string} indications las indicaciones del invitado (son opcionales)
*/

/** @type {Guests[]} */
let  guestsArray = [];
export const guests = atom(guestsArray);


/** 
  * Agrega un contacto.
  * @param {object} guestToSend El nuevo invitado a agregar
  * @param {string} guestToSend.guest_name El nombre del invitado
  * @param {number} guestToSend.events_id El id del evento al que pertence el invitado
  * @param {string} guestToSend.guest_email El email del coontacto
  * @param {string} guestToSend.indications las indicaciones del invitado (son opcionales)
*/

const addGuestTolist = async (guestToSend) => {
   
        const newGuest = {
                guest_name: guestToSend.guest_name,
                events_id: guestToSend.events_id,
                guest_email: guestToSend.guest_email,
                indications: guestToSend.indications || ''
            }; 
         guests.set(guests.get().concat(newGuest));
        
        createNotification({
            title: 'invitado agregado a la lista',
            type: 'success'
        })
}


const sendGuestList = async () =>{
    const guestsTosend = guests.get();

    if (guestsTosend.length === 0) {
        createNotification({
            title: 'La lista está vacía',
            description: 'Agrega al menos un invitado para enviar.',
            type: 'info' 
        });
        return;
    }
    try { 
        const response = await ky.post(BASE_URL, {
            json: guestsTosend,
            credentials: 'include'
        });
         createNotification({title: 'Invitaciones enviadas', type: 'success'});
         guests.set([]); 
    
        
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

export default {
    addGuestTolist,
    sendGuestList
 }