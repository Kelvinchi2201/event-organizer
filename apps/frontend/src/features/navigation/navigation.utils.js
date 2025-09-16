/** * @typedef Link
  * @type {object}
  * @property {'link' | 'button'} type El tipo de link
  * @property {string} text Lo que va dentro del link
  * @property {string | null} path El href del link
  * @property {function | null} handler La funcion del boton
*/

import AuthModule from "../auth/auth.module.js";

/**
 * @param {string} pathname La url actual.
 * @returns {Link[]}
 */
export const getLinks = (pathname) => {
  /** @type {Link[]} */
  let links = [];

  if (pathname.startsWith('/addevents')) {
    links.push({
      type: 'button', 
      text: 'Cerrar sesion', 
      handler: async () => {
        await AuthModule.logoutUser();
        location.replace('/');
      }
    });
    links.push({text: 'Invitaciones', path:'/addGuest'});
    links.push({text: 'Home', path:'/dashboard'});
  } else if (pathname.startsWith('/addGuest')) {
    links.push({
      type: 'button', 
      text: 'Cerrar sesion', 
      handler: async () => {
        await AuthModule.logoutUser();
        location.replace('/');
      }
    });
    links.push({text: 'Crear Eventos', path:'/addevents'});
    links.push({text: 'Home', path:'/dashboard'});
  } else if (pathname.startsWith('/dashboard')) {
    links.push({
      type: 'button', 
      text: 'Cerrar sesion', 
      handler: async () => {
        await AuthModule.logoutUser();
        location.replace('/');
      }
    });
    links.push({text: 'Crear Eventos', path:'/addevents'});
    links.push({text: 'Invitaciones', path:'/addGuest'});
  } else if (pathname === '/login' || pathname === '/registro' || pathname === '/') {
    links.push({text: 'Inicia sesion', path:'/login'});
    links.push({text: 'Registrate', path:'/registro'});
  } else {
    // Caso por si la ruta no coincide con ninguna de las anteriores
    // Puedes dejarlo vacío o agregar enlaces predeterminados
  }

  return links;
};