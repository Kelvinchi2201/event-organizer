import { e as createComponent, m as maybeRenderHead, l as renderScript, r as renderTemplate, f as createAstro, h as addAttribute, p as renderHead, k as renderComponent, o as renderSlot } from './astro/server_DdhIxf7_.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                            */

const $$Navigation = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<nav class="bg-pink-700 fixed top-0 left-0 right-0 z-50" data-astro-cid-b765ucrq> <div class="max-w-7xl mx-auto h-16 flex items-center justify-between pr-8 pl-8" data-astro-cid-b765ucrq> <div class="flex items-center gap-2 h-full" data-astro-cid-b765ucrq> <h2 class="text-sm md:text-2xl text-white font-bold" data-astro-cid-b765ucrq>EOrganizer</h2> </div> <div class="flex items-center gap-4 " data-astro-cid-b765ucrq> <div id="menu-items" class="absolute top-16 left-0 w-full bg-pink-700 p-4 flex flex-col gap-4 md:relative md:top-auto md:left-auto md:w-auto md:bg-transparent md:p-0 md:flex-row md:flex md:items-center" data-astro-cid-b765ucrq></div> <div id="nav-user-container" data-astro-cid-b765ucrq> <p id="nav-user-name" class="text-white text-xs md:text-sm font-bold " data-astro-cid-b765ucrq></p> </div> <button id="mobile-menu-btn" class="md:hidden flex items-center justify-center p-1 rounded-md text-white" data-astro-cid-b765ucrq> <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 
0 24 24" stroke-width="1.5" stroke="currentColor" data-astro-cid-b765ucrq> <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 12h16.5m-16.5 5.25h16.5" data-astro-cid-b765ucrq></path> </svg> </button> </div> </div> </nav> ${renderScript($$result, "C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/features/navigation/Navigation.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/features/navigation/Navigation.astro", void 0);

const $$Notification = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="notification" class="fixed p-4 top-4 right-4 rounded-2xl z-[60] hidden"> <p id="notification-title">Error</p> <p id="notification-description">Hubo un error obteniendo los contactos</p> </div>`;
}, "C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/features/notifications/Notification.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body class="pt-16" data-astro-cid-sckkx6r4> ${renderComponent($$result, "Notification", $$Notification, { "data-astro-cid-sckkx6r4": true })} ${renderComponent($$result, "Navigation", $$Navigation, { "data-astro-cid-sckkx6r4": true })} ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
