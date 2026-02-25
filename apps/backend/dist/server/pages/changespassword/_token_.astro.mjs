import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_DdhIxf7_.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_BYDXmZ_p.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$token = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Verify" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen flex flex-col justify-center px-4 max-w-7xl mx-auto md:items-center md:w-[70%] lg:flex-row"> <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6"> <div class="text-center"> <h1 class="text-3xl font-bold text-gray-900">
Cambia la contraseña de tu cuenta
</h1> </div> <form class="space-y-6" id="change-password-form"> <div> <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label> <input type="password" name="password" id="password" placeholder="'Mínimo 6 caracteres, 1 letra, 1 número y 1 símbolo." class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500" required> </div> <div> <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirmar contraseña</label> <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500" required> </div> <div class="flex items-center flex-col gap-2"> <div> <button id="button-change-password" type="submit" disabled class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-700 hover:bg-pink-800
            disabled:cursor-not-allowed dark:bg-pink-800 dark:hover:bg-pink-700 dark:focus:ring-pink-800 dark:disabled:bg-gray-600 transition-colors duration-200">
Cambiar contraseña
</button> </div> </div></form> </div></main> ` })} ${renderScript($$result, "C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/pages/changesPassword/[token].astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/pages/changesPassword/[token].astro", void 0);

const $$file = "C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/pages/changesPassword/[token].astro";
const $$url = "/changesPassword/[token]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$token,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
