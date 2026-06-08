# 맨처음 토익 RC · 학습앱

Part 5·6 문법(13개 유닛) + Part 7 독해(3개 유닛, 책 원문 지문 이미지 포함)를 **문제 풀이 중심**으로 학습하는 웹앱입니다.
태블릿/폰 어디서든 접속하고, 구글 로그인 시 **진도·오답·북마크가 실시간으로 기기 간 동기화**됩니다.

## 주요 기능
- 📚 **유닛별 학습** — 문법 핵심 정리 + 객관식 문제(즉시 정답 확인 + 한글 해설)
- ⏱️ **실전 모의고사** — 랜덤 출제 + 제한시간 타이머 + 자동 채점
- 📝 **오답노트** — 틀린 문제만 모아 다시 풀기
- ⭐ **북마크** — 중요 문제 저장
- 📊 **학습 통계** — 유닛별 진도/정답률, 모의고사 기록
- ☁️ **실시간 동기화** — 구글 로그인(Firebase Firestore)
- 📱 **PWA** — 홈 화면에 앱처럼 설치, 오프라인 사용

---

## 🚀 배포 가이드 (3단계, 약 15분)

### 1단계 · Firebase 설정 (구글 클라우드 저장)
1. https://console.firebase.google.com 접속 → **프로젝트 추가** (이름 예: `toeic-rc`)
2. 프로젝트 화면에서 웹 아이콘 **`</>`** 클릭 → 앱 등록 → 표시되는 **firebaseConfig** 값 복사
3. 이 폴더의 **`firebase-config.js`** 파일을 열어 복사한 값으로 교체
4. 좌측 메뉴 **빌드 > Authentication** → 시작하기 → **Sign-in method** 탭 → **Google** 사용 설정
5. 좌측 메뉴 **빌드 > Firestore Database** → **데이터베이스 만들기** (위치 선택 후 생성)
6. Firestore의 **규칙(Rules)** 탭에 아래를 붙여넣고 게시:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{uid} {
         allow read, write: if request.auth != null && request.auth.uid == uid;
       }
     }
   }
   ```
   > 이렇게 하면 각자 본인 데이터만 읽고 쓸 수 있습니다.

### 2단계 · GitHub Pages 배포 (URL 만들기)
1. GitHub에서 새 저장소(repo) 생성 (예: `toeic-rc`, Public)
2. 이 **`토익RC앱` 폴더 안에서** 터미널을 열고:
   ```bash
   git init
   git add .
   git commit -m "맨처음 토익 RC 학습앱"
   git branch -M main
   git remote add origin https://github.com/<내아이디>/toeic-rc.git
   git push -u origin main
   ```
3. GitHub 저장소 → **Settings > Pages** → Source를 **`main` 브랜치 / `/ (root)`** 로 지정 후 저장
4. 1~2분 뒤 생성된 주소로 접속: **`https://<내아이디>.github.io/toeic-rc/`**

### 3단계 · Firebase에 도메인 허용 (로그인 작동)
1. Firebase 콘솔 → **Authentication > Settings > 승인된 도메인(Authorized domains)**
2. **`<내아이디>.github.io`** 추가
   > 이 단계를 빼먹으면 구글 로그인이 막힙니다.

---

## 📱 태블릿에 앱으로 설치하기
1. 태블릿 브라우저(Chrome/Safari)로 위 GitHub Pages 주소 접속
2. **Chrome**: 메뉴(⋮) → "홈 화면에 추가" / **Safari**: 공유 → "홈 화면에 추가"
3. 홈 화면 아이콘으로 앱처럼 실행 → 구글 로그인하면 폰과 자동 동기화

---

## 📂 파일 구성
| 파일 | 설명 |
|---|---|
| `index.html` | 앱 진입점 |
| `style.css` | 디자인 |
| `data.js` | **모든 학습 콘텐츠**(문법 정리 + 문제 + 해설) |
| `img/` | **책 원문 Part 7 지문 이미지**(편지·공지·광고·일정표·채팅·이중/삼중 지문) |
| `app.js` | 화면/문제풀이 로직 |
| `cloud.js` | Firebase 실시간 동기화 |
| `firebase-config.js` | **← 회원님 Firebase 값 입력** |
| `manifest.webmanifest`, `sw.js`, `icon-*.png` | PWA(설치/오프라인) |

## 📝 콘텐츠 추가/수정
`data.js`의 각 유닛 `questions` 배열에 문항을 추가하면 됩니다.
형식: `{ q:"문제", choices:["A","B","C","D"], answer:정답index(0~3), kr:"해설", vocab:"어휘" }`

> 콘텐츠를 바꾼 뒤에는 `sw.js` 상단의 `CACHE = "toeic-rc-v1"`의 버전을 `v2` 등으로 올린 뒤
> 다시 `git push` 하면 모든 기기에서 최신본이 반영됩니다.

---
*Firebase를 설정하지 않아도 앱은 정상 작동하며, 데이터는 해당 기기에만 저장됩니다.*
