var C='hayatim-v1';
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(['./','index.html','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png'])}));self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(function(m){
    var n=fetch(e.request).then(function(r){
      if(r&&(r.ok||r.type==='opaque')){var cp=r.clone();caches.open(C).then(function(c){c.put(e.request,cp)})}
      return r}).catch(function(){return m});
    return m||n}))});
