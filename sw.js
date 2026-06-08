/* 서비스 워커 — 오프라인 캐시 (앱 셸) */
const CACHE = "toeic-rc-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./data.js",
  "./app.js",
  "./firebase-config.js",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./img/email.jpg",
  "./img/memo.jpg",
  "./img/ad.jpg",
  "./img/schedule.jpg",
  "./img/chat.jpg",
  "./img/double.jpg",
  "./img/triple.jpg"
];

self.addEventListener("install", (e)=>{
  e.waitUntil(caches.open(CACHE).then(c=> c.addAll(ASSETS)).then(()=> self.skipWaiting()));
});

self.addEventListener("activate", (e)=>{
  e.waitUntil(
    caches.keys().then(keys=> Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=> self.clients.claim())
  );
});

self.addEventListener("fetch", (e)=>{
  const req = e.request;
  if(req.method !== "GET") return;
  const url = new URL(req.url);
  // 같은 출처(앱 파일)만 캐시 처리. Firebase 등 외부요청은 네트워크로.
  if(url.origin !== self.location.origin) return;
  e.respondWith(
    caches.match(req).then(cached=>{
      const net = fetch(req).then(res=>{
        if(res && res.status===200){
          const copy = res.clone();
          caches.open(CACHE).then(c=> c.put(req, copy));
        }
        return res;
      }).catch(()=> cached);
      return cached || net;
    })
  );
});
