import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_f8KdmA6k.mjs';
import { manifest } from './manifest_CHfcgGsC.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/addevents.astro.mjs');
const _page2 = () => import('./pages/addguest.astro.mjs');
const _page3 = () => import('./pages/changespassword/_token_.astro.mjs');
const _page4 = () => import('./pages/dashboard.astro.mjs');
const _page5 = () => import('./pages/eventmanagement.astro.mjs');
const _page6 = () => import('./pages/login.astro.mjs');
const _page7 = () => import('./pages/recoverpassword.astro.mjs');
const _page8 = () => import('./pages/registro.astro.mjs');
const _page9 = () => import('./pages/verify/_token_.astro.mjs');
const _page10 = () => import('./pages/verifyguest/_token_.astro.mjs');
const _page11 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["../../node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/addevents.astro", _page1],
    ["src/pages/addGuest.astro", _page2],
    ["src/pages/changesPassword/[token].astro", _page3],
    ["src/pages/dashboard.astro", _page4],
    ["src/pages/eventManagement.astro", _page5],
    ["src/pages/login.astro", _page6],
    ["src/pages/recoverPassword.astro", _page7],
    ["src/pages/registro.astro", _page8],
    ["src/pages/verify/[token].astro", _page9],
    ["src/pages/verifyGuest/[token].astro", _page10],
    ["src/pages/index.astro", _page11]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "middleware",
    "client": "file:///C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/dist/client/",
    "server": "file:///C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro",
    "experimentalStaticHeaders": false
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
