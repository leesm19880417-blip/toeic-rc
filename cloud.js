/* ============================================================
   cloud.js — Firebase 구글 로그인 + Firestore 실시간 동기화
   app.js 와는 window.CloudSync / window.App 으로 연결된다.
   설정값이 비어있으면(placeholder) 자동으로 비활성화되어
   앱은 localStorage 만으로 정상 동작한다.
   ============================================================ */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect,
         getRedirectResult, onAuthStateChanged, signOut }
  from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, setDoc, onSnapshot }
  from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const cfg = window.FIREBASE_CONFIG || {};
const configured = cfg.apiKey && !String(cfg.apiKey).startsWith("여기에");

const CloudSync = {
  enabled: configured,
  user: null,
  _db: null, _auth: null, _unsub: null, _saveTimer: null, _listeners: [],
  onStatus(cb){ this._listeners.push(cb); },
  _emit(){ this._listeners.forEach(cb=>cb(this.status())); },
  status(){
    if(!this.enabled) return { mode:"local", text:"기기 저장(클라우드 미설정)" };
    if(this.user) return { mode:"cloud", text:"동기화 중 · "+(this.user.displayName||this.user.email||"로그인됨"), user:this.user };
    return { mode:"signedout", text:"로그인하면 기기 간 동기화" };
  }
};

if(!configured){
  console.info("[CloudSync] Firebase 미설정 → localStorage 모드로 동작합니다.");
  window.CloudSync = CloudSync;
} else {
  try {
    const fbApp = initializeApp(cfg);
    const auth = getAuth(fbApp);
    const db = getFirestore(fbApp);
    CloudSync._auth = auth; CloudSync._db = db;

    const provider = new GoogleAuthProvider();

    CloudSync.signIn = async function(){
      try { await signInWithPopup(auth, provider); }
      catch(e){
        console.warn("[CloudSync] 팝업 로그인 실패, 리디렉트 시도:", e.code);
        try { await signInWithRedirect(auth, provider); }
        catch(e2){ alert("로그인 실패: "+(e2.message||e2.code)); }
      }
    };
    CloudSync.signOut = async function(){ await signOut(auth); };

    // 리디렉트 복귀 처리
    getRedirectResult(auth).catch(()=>{});

    // 클라우드로 저장 (디바운스)
    CloudSync.save = function(stateObj){
      if(!CloudSync.user) return;
      clearTimeout(CloudSync._saveTimer);
      CloudSync._saveTimer = setTimeout(async ()=>{
        try {
          const ref = doc(db, "users", CloudSync.user.uid);
          await setDoc(ref, { data: stateObj, updatedAt: Date.now() }, { merge:true });
        } catch(e){ console.warn("[CloudSync] 저장 실패:", e.message); }
      }, 700);
    };

    onAuthStateChanged(auth, (user)=>{
      CloudSync.user = user || null;
      // 이전 구독 해제
      if(CloudSync._unsub){ CloudSync._unsub(); CloudSync._unsub=null; }
      if(user){
        const ref = doc(db, "users", user.uid);
        CloudSync._unsub = onSnapshot(ref, (snap)=>{
          // 자신이 방금 쓴 echo 는 무시 (무한루프 방지)
          if(snap.metadata.hasPendingWrites) return;
          if(snap.exists()){
            const remote = snap.data().data;
            if(remote && window.App) window.App.applyRemoteState(remote);
          } else {
            // 원격 문서가 없으면 현재 로컬 상태를 업로드(최초 동기화)
            if(window.App){ CloudSync.save(window.App.getState()); }
          }
        }, (err)=> console.warn("[CloudSync] 구독 오류:", err.message));
      }
      CloudSync._emit();
    });

    window.CloudSync = CloudSync;
  } catch(e){
    console.error("[CloudSync] 초기화 실패 → localStorage 모드:", e);
    CloudSync.enabled = false;
    window.CloudSync = CloudSync;
  }
}
