import { atom } from "nanostores";
import { createNotification } from "../notifications/notificiation.js";
import { BACK_ENDPOINT } from "../../config/endpoints.js";
import ky from "ky";
 const BASE_URL = `${BACK_ENDPOINT}/api/guest`

const LOCAL_STORAGE_KEY = 'guests_list';

const loadFromLocalStorage = () => {
  const storedGuests = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (storedGuests) {
    
    return JSON.parse(storedGuests).map(guest => ({
      ...guest,
      events_id: Number(guest.events_id) 
    }));
  }
  return [];
};
// NUEVO: Función para guardar invitados en localStorage
const saveToLocalStorage = (guests) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(guests));
};

/** * @typedef Guests
  * @type {object}
  * @property {string} guest_name El nombre del inivtado
  * @property {number} events_id el id del evento al que pertenece el invitado
  * @property {string} guest_email El email del del invitado
  * @property {string} indications las indicaciones del invitado (son opcionales)
  * @property {string} event_name el nombre del evento
*/

/** @type {Guests[]} */
let guestsArray = loadFromLocalStorage();
export const guests = atom(guestsArray);

/** * Agrega un contacto.
  * @param {object} guestToSend El nuevo invitado a agregar
  * @param {string} guestToSend.guest_name El nombre del invitado
  * @param {number} guestToSend.events_id El id del evento al que pertence el invitado
  * @param {string} guestToSend.guest_email El email del coontacto
  * @param {string} guestToSend.indications las indicaciones del invitado (son opcionales)
  * @param {string} guestToSend.event_name el nombre del evento
*/

const getGuestListByEventId = async (eventId) => {
    const guestData = await ky.get(`${BASE_URL}/events/${eventId}`,
        { credentials: 'include' }
    ).json();
    guests.set(guestData)
};

const getLocalGuestList = () => {
    return guests.get();
}

const addGuestTolist = (guestToSend) => {
   
        const newGuest = {
                temp_id: crypto.randomUUID(),
                guest_name: guestToSend.guest_name,
                events_id: Number(guestToSend.events_id),
                guest_email: guestToSend.guest_email,
                indications: guestToSend.indications || '',
                // Aquí se agrega el nombre del evento para guardarlo localmente
                event_name: guestToSend.event_name
            }; 
         
         const updatedGuests = [...guests.get(), newGuest];
         guests.set(updatedGuests);
         saveToLocalStorage(updatedGuests);
        
        createNotification({
            title: 'invitado agregado a la lista',
            type: 'success'
        })
};



const removeGuestFromList = (guestIdToRemove) => {
    const updatedGuests = guests.get().filter(guest => guest.temp_id !== guestIdToRemove);
    guests.set(updatedGuests);
    saveToLocalStorage(updatedGuests);
    createNotification({ 
        title: "Invitado eliminado de la lista",
        type: "success" 
    });
};


const updatedGuestList = (guestToUpdate) => {
    const updatedGuests = guests.get().map(guest => 
        guest.temp_id === guestToUpdate.temp_id ? guestToUpdate : guest
    );
    guests.set(updatedGuests);
    saveToLocalStorage(updatedGuests);
    createNotification({ 
        title: "Invitado actualizado", 
        type: "success" 
    });
};


const sendGuestList = async () =>{
    // Se debe enviar el nombre del evento y las indicaciones junto con la lista de invitados
    const guestsToSend = guests.get();

    if (guestsToSend.length === 0) {
        createNotification({
            title: 'La lista está vacía',
            description: 'Agrega al menos un invitado para enviar.',
            type: 'info' 
        });
        return;
    }
    try { 
        // Agregamos el nombre del evento y las indicaciones al JSON que se envía
        const response = await ky.post(BASE_URL, {
            json: guestsToSend,
            credentials: 'include'
        });
         createNotification({
            title: 'Invitaciones enviadas',
            type: 'success'
        });
         guests.set([]); 
         saveToLocalStorage([]);
    
        
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
    sendGuestList,
    removeGuestFromList,
    updatedGuestList,
    getLocalGuestList,
    saveToLocalStorage
 }