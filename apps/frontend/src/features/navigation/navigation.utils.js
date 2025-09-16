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

  // Se ha ajustado la condición para que sea más robusta y capture las rutas correctamente.
  if (pathname.startsWith('/addevents')) {
    links.push({
      type: 'button', 
      text: 'Cerrar sesion', 
      handler: async () => {
        await AuthModule.logoutUser();
        location.replace('/');
      }
    });
    // Se ha añadido la propiedad 'type' para mayor claridad.
    links.push({type: 'link', text: 'Invitaciones', path:'/addGuest'});
    links.push({type: 'link', text: 'Home', path:'/dashboard'});
  } else if (pathname.startsWith('/addGuest')) {
    links.push({
      type: 'button', 
      text: 'Cerrar sesion', 
      handler: async () => {
        await AuthModule.logoutUser();
        location.replace('/');
      }
    });
    // Se ha añadido la propiedad 'type' para mayor claridad.
    links.push({type: 'link', text: 'Crear Eventos', path:'/addevents'});
    links.push({type: 'link', text: 'Home', path:'/dashboard'});
  } else if (pathname.startsWith('/dashboard')) {
    links.push({
      type: 'button', 
      text: 'Cerrar sesion', 
      handler: async () => {
        await AuthModule.logoutUser();
        location.replace('/');
      }
    });
    // Se ha añadido la propiedad 'type' para mayor claridad.
    links.push({type: 'link', text: 'Crear Eventos', path:'/addevents'});
    links.push({type: 'link', text: 'Invitaciones', path:'/addGuest'});
  } else if (pathname === '/login' || pathname === '/registro' || pathname === '/') {
    // Se ha añadido la propiedad 'type' para mayor claridad.
    links.push({type: 'link', text: 'Inicia sesion', path:'/login'});
    links.push({type: 'link', text: 'Registrate', path:'/registro'});
  } else {
    // Caso por si la ruta no coincide con ninguna de las anteriores
    // Puedes dejarlo vacío o agregar enlaces predeterminados
  }

  return links;
};