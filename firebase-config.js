/* ============================================================
   Firebase 설정 파일  ★★★ 여기만 회원님 값으로 교체하세요 ★★★
   ------------------------------------------------------------
   1) https://console.firebase.google.com 접속 → "프로젝트 추가"
   2) 좌측 톱니바퀴(프로젝트 설정) → "내 앱" → 웹앱(</>) 추가
   3) 표시되는 firebaseConfig 값을 아래에 그대로 붙여넣기
   4) 좌측 메뉴 "빌드 > Authentication" → 시작하기 → Google 로그인 사용 설정
   5) 좌측 메뉴 "빌드 > Firestore Database" → 데이터베이스 만들기(프로덕션/테스트)
   ------------------------------------------------------------
   ※ 아래 값이 "여기에..." 그대로면 클라우드 동기화는 꺼지고
     기기 내 저장(localStorage)만 동작합니다. (앱은 그래도 잘 작동)
   ============================================================ */
window.FIREBASE_CONFIG = {
  apiKey:            "여기에-apiKey",
  authDomain:        "여기에-프로젝트.firebaseapp.com",
  projectId:         "여기에-projectId",
  storageBucket:     "여기에-프로젝트.appspot.com",
  messagingSenderId: "여기에-senderId",
  appId:             "여기에-appId"
};
