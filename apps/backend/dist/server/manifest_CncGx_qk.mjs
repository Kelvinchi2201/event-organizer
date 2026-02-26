import 'kleur/colors';
import { q as decodeKey } from './chunks/astro/server_DdhIxf7_.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DwplQt5t.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/","cacheDir":"file:///C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/node_modules/.astro/","outDir":"file:///C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/dist/","srcDir":"file:///C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/","publicDir":"file:///C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/public/","buildClientDir":"file:///C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/dist/client/","buildServerDir":"file:///C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/dist/server/","adapterName":"@astrojs/node","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"addevents/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/addevents","isIndex":false,"type":"page","pattern":"^\\/addevents\\/?$","segments":[[{"content":"addevents","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/addevents.astro","pathname":"/addevents","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"addGuest/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/addguest","isIndex":false,"type":"page","pattern":"^\\/addGuest\\/?$","segments":[[{"content":"addGuest","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/addGuest.astro","pathname":"/addGuest","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"dashboard/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/dashboard","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard.astro","pathname":"/dashboard","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"eventManagement/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/eventmanagement","isIndex":false,"type":"page","pattern":"^\\/eventManagement\\/?$","segments":[[{"content":"eventManagement","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/eventManagement.astro","pathname":"/eventManagement","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"login/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"recoverPassword/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/recoverpassword","isIndex":false,"type":"page","pattern":"^\\/recoverPassword\\/?$","segments":[[{"content":"recoverPassword","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/recoverPassword.astro","pathname":"/recoverPassword","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"registro/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/registro","isIndex":false,"type":"page","pattern":"^\\/registro\\/?$","segments":[[{"content":"registro","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/registro.astro","pathname":"/registro","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"../../node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/addGuest.B36BnYg_.css"}],"routeData":{"route":"/changespassword/[token]","isIndex":false,"type":"page","pattern":"^\\/changesPassword\\/([^/]+?)\\/?$","segments":[[{"content":"changesPassword","dynamic":false,"spread":false}],[{"content":"token","dynamic":true,"spread":false}]],"params":["token"],"component":"src/pages/changesPassword/[token].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/addGuest.B36BnYg_.css"}],"routeData":{"route":"/verify/[token]","isIndex":false,"type":"page","pattern":"^\\/verify\\/([^/]+?)\\/?$","segments":[[{"content":"verify","dynamic":false,"spread":false}],[{"content":"token","dynamic":true,"spread":false}]],"params":["token"],"component":"src/pages/verify/[token].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/addGuest.B36BnYg_.css"}],"routeData":{"route":"/verifyguest/[token]","isIndex":false,"type":"page","pattern":"^\\/verifyGuest\\/([^/]+?)\\/?$","segments":[[{"content":"verifyGuest","dynamic":false,"spread":false}],[{"content":"token","dynamic":true,"spread":false}]],"params":["token"],"component":"src/pages/verifyGuest/[token].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/pages/addGuest.astro",{"propagation":"none","containsHead":true}],["C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/pages/addevents.astro",{"propagation":"none","containsHead":true}],["C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/pages/changesPassword/[token].astro",{"propagation":"none","containsHead":true}],["C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/pages/dashboard.astro",{"propagation":"none","containsHead":true}],["C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/pages/eventManagement.astro",{"propagation":"none","containsHead":true}],["C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/pages/login.astro",{"propagation":"none","containsHead":true}],["C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/pages/recoverPassword.astro",{"propagation":"none","containsHead":true}],["C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/pages/registro.astro",{"propagation":"none","containsHead":true}],["C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/pages/verify/[token].astro",{"propagation":"none","containsHead":true}],["C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/pages/verifyGuest/[token].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/addevents@_@astro":"pages/addevents.astro.mjs","\u0000@astro-page:src/pages/addGuest@_@astro":"pages/addguest.astro.mjs","\u0000@astro-page:src/pages/changesPassword/[token]@_@astro":"pages/changespassword/_token_.astro.mjs","\u0000@astro-page:src/pages/dashboard@_@astro":"pages/dashboard.astro.mjs","\u0000@astro-page:src/pages/eventManagement@_@astro":"pages/eventmanagement.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/recoverPassword@_@astro":"pages/recoverpassword.astro.mjs","\u0000@astro-page:src/pages/registro@_@astro":"pages/registro.astro.mjs","\u0000@astro-page:src/pages/verify/[token]@_@astro":"pages/verify/_token_.astro.mjs","\u0000@astro-page:src/pages/verifyGuest/[token]@_@astro":"pages/verifyguest/_token_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:../../node_modules/astro/dist/assets/endpoint/node@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CncGx_qk.mjs","C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_LbCBfwQ3.mjs","C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/pages/addevents.astro?astro&type=script&index=0&lang.ts":"_astro/addevents.astro_astro_type_script_index_0_lang.GRM7D0UT.js","C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/pages/changesPassword/[token].astro?astro&type=script&index=0&lang.ts":"_astro/_token_.astro_astro_type_script_index_0_lang.DhfMEkCp.js","C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/pages/login.astro?astro&type=script&index=0&lang.ts":"_astro/login.astro_astro_type_script_index_0_lang.CWEsQVeO.js","C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/pages/recoverPassword.astro?astro&type=script&index=0&lang.ts":"_astro/recoverPassword.astro_astro_type_script_index_0_lang.CWGgmJMp.js","C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/pages/registro.astro?astro&type=script&index=0&lang.ts":"_astro/registro.astro_astro_type_script_index_0_lang.Dg8aIhVh.js","C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/pages/verify/[token].astro?astro&type=script&index=0&lang.ts":"_astro/_token_.astro_astro_type_script_index_0_lang.jtooUjOC.js","C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/pages/verifyGuest/[token].astro?astro&type=script&index=0&lang.ts":"_astro/_token_.astro_astro_type_script_index_0_lang.D8Vm5Pug.js","C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/features/auth/AuthProtected.astro?astro&type=script&index=0&lang.ts":"_astro/AuthProtected.astro_astro_type_script_index_0_lang.ga8IHyyh.js","C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/features/Guest/CreateGuestForm.astro?astro&type=script&index=0&lang.ts":"_astro/CreateGuestForm.astro_astro_type_script_index_0_lang.D8OFerSs.js","C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/features/Guest/GuestList.astro?astro&type=script&index=0&lang.ts":"_astro/GuestList.astro_astro_type_script_index_0_lang.DNWl5a2f.js","C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/features/management/ManagementList.astro?astro&type=script&index=0&lang.ts":"_astro/ManagementList.astro_astro_type_script_index_0_lang.CfZ1m3Yo.js","C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/features/auth/AuthUnprotected.astro?astro&type=script&index=0&lang.ts":"_astro/AuthUnprotected.astro_astro_type_script_index_0_lang.DADTVMm2.js","C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/features/dashboard/HomeEventList.astro?astro&type=script&index=0&lang.ts":"_astro/HomeEventList.astro_astro_type_script_index_0_lang.BGxCMEDi.js","C:/Users/Kelvin/Desktop/Programacion/event-organizer-main/apps/frontend/src/features/navigation/Navigation.astro?astro&type=script&index=0&lang.ts":"_astro/Navigation.astro_astro_type_script_index_0_lang.BIyDfag6.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/ejemplo.C3w7OcFN.jpg","/_astro/addGuest.B36BnYg_.css","/favicon.svg","/_astro/addevents.astro_astro_type_script_index_0_lang.GRM7D0UT.js","/_astro/auth.module.BlJkjLy5.js","/_astro/AuthProtected.astro_astro_type_script_index_0_lang.ga8IHyyh.js","/_astro/AuthUnprotected.astro_astro_type_script_index_0_lang.DADTVMm2.js","/_astro/CreateGuestForm.astro_astro_type_script_index_0_lang.D8OFerSs.js","/_astro/guest.module.ekp1wVYU.js","/_astro/GuestList.astro_astro_type_script_index_0_lang.DNWl5a2f.js","/_astro/HomeEventList.astro_astro_type_script_index_0_lang.BGxCMEDi.js","/_astro/index.BXL97NTB.js","/_astro/index.CViUNx8d.js","/_astro/login.astro_astro_type_script_index_0_lang.CWEsQVeO.js","/_astro/ManagementList.astro_astro_type_script_index_0_lang.CfZ1m3Yo.js","/_astro/Navigation.astro_astro_type_script_index_0_lang.BIyDfag6.js","/_astro/notificiation.DEfUooIU.js","/_astro/recoverPassword.astro_astro_type_script_index_0_lang.CWGgmJMp.js","/_astro/registro.astro_astro_type_script_index_0_lang.Dg8aIhVh.js","/_astro/_token_.astro_astro_type_script_index_0_lang.D8Vm5Pug.js","/_astro/_token_.astro_astro_type_script_index_0_lang.DhfMEkCp.js","/_astro/_token_.astro_astro_type_script_index_0_lang.jtooUjOC.js","/addevents/index.html","/addGuest/index.html","/dashboard/index.html","/eventManagement/index.html","/login/index.html","/recoverPassword/index.html","/registro/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"UliDHhvQd1SU0MBOr8cInzp1a+/Dq848hTVPdo7G4ls=","sessionConfig":{"driver":"fs-lite","options":{"base":"C:\\Users\\Kelvin\\Desktop\\Programacion\\event-organizer-main\\apps\\frontend\\node_modules\\.astro\\sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
