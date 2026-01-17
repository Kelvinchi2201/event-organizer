import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_DdhIxf7_.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_DtEbwW5F.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$token = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Verify" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen flex flex-col justify-center px-4 max-w-7xl mx-auto md:items-center md:w-[70%] lg:flex-row"> <div class="flex flex-col gap-4"> <p id="verify-text" class="text-pink-700 text-2xl justify-center items-center md:text-2xl lg:text-2xl">Verificando</p> <p class="flex justify-center text-pink-700 text-2xl items-center md:text-2xl lg:text-2xl">dale click para continuar </p> <a href="/login" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-700 hover:bg-pink-800
     disabled:cursor-not-allowed dark:bg-pink-800 dark:hover:bg-pink-700 dark:focus:ring-pink-800 dark:disabled:bg-gray-600 transition-colors duration-200">iniciar sesion</a> </div> </main> ` })} ${renderScript($$result, "C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/pages/verify/[token].astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/pages/verify/[token].astro", void 0);

const $$file = "C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/pages/verify/[token].astro";
const $$url = "/verify/[token]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$token,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
