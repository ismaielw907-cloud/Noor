const CACHE="noor-v1";
const PRECACHE=["./","./index.html","./manifest.json"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(PRECACHE)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!CACHE).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{
if(e.request.method!"GET")return;
const h=new URL(e.request.url).hostname;
if(h.includes("alquran.cloud")||h.includes("aladhan.com")||h.includes("googleapis")||h.includes("gstatic")){
e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request)));
return}
e.respondWith(caches.match(e.request).then(h=>h||fetch(e.request)));
});

