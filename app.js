/* ============ 맨처음 토익 RC 앱 로직 ============ */
(function(){
  "use strict";
  const C = window.COURSE;
  const LS_KEY = "toeic_rc_state_v1";

  /* ---------- 상태 저장 (localStorage + Firebase 동기화) ---------- */
  const DEFAULT = { answers:{}, bookmarks:{}, units:{}, totalSolved:0, totalCorrect:0, exams:[] };
  let state = load();
  function load(){
    try{ const s = JSON.parse(localStorage.getItem(LS_KEY)); return Object.assign({}, DEFAULT, s||{}); }
    catch(e){ return Object.assign({}, DEFAULT); }
  }
  function persistLocal(){ localStorage.setItem(LS_KEY, JSON.stringify(state)); }
  function save(){
    persistLocal();
    if(window.CloudSync && window.CloudSync.save) window.CloudSync.save(state);
  }

  // 원격(다른 기기) 상태를 로컬과 병합
  function syncPick(s){ return JSON.stringify({a:s.answers||{}, b:s.bookmarks||{}, e:s.exams||[]}); }
  function mergeState(local, remote){
    const out = Object.assign({}, DEFAULT, local);
    // answers: 합집합 (양쪽 중복 시 로컬 우선)
    out.answers = Object.assign({}, remote.answers||{}, local.answers||{});
    // bookmarks: 합집합
    out.bookmarks = Object.assign({}, remote.bookmarks||{}, local.bookmarks||{});
    // exams: 합치고 중복 제거 후 최근 20개
    const seen=new Set(), ex=[];
    [].concat(remote.exams||[], local.exams||[]).forEach(e=>{
      const k=(e.date||"")+"|"+e.score+"|"+e.total;
      if(!seen.has(k)){ seen.add(k); ex.push(e); }
    });
    out.exams = ex.slice(0,20);
    return out;
  }

  // CloudSync ↔ app 연결 인터페이스
  window.App = {
    getState(){ return state; },
    applyRemoteState(remote){
      if(!remote) return;
      const merged = mergeState(state, remote);
      const changed = syncPick(merged) !== syncPick(remote);
      state = merged;
      persistLocal();
      if(!Q) rerender();           // 풀이 중이 아니면 화면 갱신
      // 병합 결과가 원격과 다르면 되돌려 써서 기기 간 수렴
      if(changed && window.CloudSync && window.CloudSync.save) window.CloudSync.save(state);
    }
  };

  /* ---------- 데이터 평탄화 ---------- */
  // 모든 유닛을 통일된 형태로
  const UNITS = []; // {id, part, partTag, no, title, subtitle, type, notes, items:[{qid,q,choices,answer,kr,vocab,passageHtml,passageTitle}]}
  function buildUnits(){
    [["g",C.parts56],["r",C.part7]].forEach(([tag,part])=>{
      part.units.forEach(u=>{
        const unit = { id:u.id, part:part.title, partTag:tag, no:u.no, title:u.title,
                       subtitle:u.subtitle, notes:u.notes||[], items:[] };
        if(u.questions){ // grammar
          unit.type="grammar";
          u.questions.forEach((q,i)=>{
            unit.items.push({ qid:`${u.id}-q${i}`, q:q.q, choices:q.choices, answer:q.answer,
                              kr:q.kr, vocab:q.vocab, passageHtml:null, passageTitle:null });
          });
        } else if(u.passages){ // reading
          unit.type="reading";
          u.passages.forEach((p,pi)=>{
            p.questions.forEach((q,qi)=>{
              unit.items.push({ qid:`${u.id}-p${pi}-q${qi}`, q:q.q, choices:q.choices, answer:q.answer,
                                kr:q.kr, vocab:q.vocab,
                                passageHtml: qi===0 ? (p.passage||null) : null, // 첫 문제에만 지문 표시
                                passageImg:  qi===0 ? (p.image||null) : null,   // 책 원문 이미지
                                passageTitle: qi===0 ? (p.kind+" — "+p.title) : null,
                                passageGroup: `${u.id}-p${pi}` });
            });
          });
        }
        UNITS.push(unit);
      });
    });
  }
  buildUnits();
  const ALL_ITEMS = UNITS.flatMap(u=>u.items.map(it=>({...it, unitId:u.id, unitNo:u.no, unitTitle:u.title})));
  const byId = {}; ALL_ITEMS.forEach(it=> byId[it.qid]=it);
  UNITS.forEach(u=> byId["__unit_"+u.id]=u);

  /* ---------- 유틸 ---------- */
  const $ = s=>document.querySelector(s);
  const app = $("#screen");
  const titleEl = $("#barTitle");
  const backBtn = $("#backBtn");
  const LAB = ["A","B","C","D"];
  function esc(s){ return (s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
  function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; }

  function unitProgress(u){
    const total=u.items.length;
    let solved=0, correct=0;
    u.items.forEach(it=>{ const a=state.answers[it.qid]; if(a){ solved++; if(a.correct) correct++; } });
    return {total, solved, correct, pct: total? Math.round(solved/total*100):0};
  }
  function globalProgress(){
    const total=ALL_ITEMS.length;
    const solved=Object.keys(state.answers).length;
    const correct=Object.values(state.answers).filter(a=>a.correct).length;
    return {total, solved, correct, pct: total?Math.round(solved/total*100):0,
            acc: solved? Math.round(correct/solved*100):0};
  }

  /* ---------- 라우팅 ---------- */
  let timerId=null;
  let CURRENT = null; // 현재 화면 재렌더용 thunk
  function rerender(){ try{ if(CURRENT) CURRENT(); }catch(e){ console.warn(e); } }
  function setBar(t, showBack){ titleEl.textContent=t; backBtn.classList.toggle("hidden", !showBack); }
  function clearTimer(){ if(timerId){ clearInterval(timerId); timerId=null; } }
  let backTarget=null;
  backBtn.onclick = ()=>{ if(backTarget) backTarget(); };

  function setTab(name){
    document.querySelectorAll("nav.tabbar button").forEach(b=>b.classList.toggle("active", b.dataset.tab===name));
  }

  /* ========== 화면: 홈 ========== */
  function viewHome(){
    CURRENT=viewHome;
    clearTimer(); setBar("맨처음 토익 RC", false); setTab("home"); backTarget=null;
    const g = globalProgress();
    const wrongCount = Object.entries(state.answers).filter(([,a])=>!a.correct).length;
    const bmCount = Object.keys(state.bookmarks).length;
    app.innerHTML = `
      <div class="hero fade">
        <h2>👋 오늘도 토익 RC 정복!</h2>
        <p>맨처음 토익 RC · Part 5·6 문법 + Part 7 독해</p>
        <div class="stat-row">
          <div class="stat"><b>${g.solved}</b><span>푼 문제</span></div>
          <div class="stat"><b>${g.acc}%</b><span>정답률</span></div>
          <div class="stat"><b>${g.pct}%</b><span>전체 진도</span></div>
        </div>
        <div class="progress-wrap" style="margin-top:14px;background:rgba(255,255,255,.25)">
          <div class="progress-bar" style="width:${g.pct}%"></div>
        </div>
      </div>

      ${syncCardHTML()}

      <div class="section-title">학습하기</div>
      <div class="menu-grid">
        <div class="menu-tile" data-go="study"><div class="ic">📚</div><b>유닛별 학습</b><small>문법 정리 + 문제풀이</small></div>
        <div class="menu-tile" data-go="exam"><div class="ic">⏱️</div><b>실전 모의고사</b><small>타이머 · 랜덤 출제</small></div>
        <div class="menu-tile" data-go="wrong"><div class="ic">📝</div><b>오답노트</b><small>틀린 문제 ${wrongCount}개</small></div>
        <div class="menu-tile" data-go="bookmark"><div class="ic">⭐</div><b>북마크</b><small>저장한 문제 ${bmCount}개</small></div>
      </div>

      <div class="section-title">빠른 시작</div>
      <div class="card">
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn" data-quick="grammar">문법 10문제 풀기</button>
          <button class="btn teal" data-quick="reading">독해 풀기</button>
          <button class="btn ghost" data-quick="all">전체 랜덤 20</button>
        </div>
      </div>`;
    wireSyncCard();
    app.querySelectorAll("[data-go]").forEach(el=> el.onclick=()=>{
      const g=el.dataset.go;
      if(g==="study") viewStudy();
      else if(g==="exam") viewExamSetup();
      else if(g==="wrong") viewWrong();
      else if(g==="bookmark") viewBookmark();
    });
    app.querySelectorAll("[data-quick]").forEach(el=> el.onclick=()=>{
      const k=el.dataset.quick;
      let pool;
      if(k==="grammar") pool=ALL_ITEMS.filter(i=>i.qid.includes("u0")||/u1[0-3]/.test(i.qid));
      else if(k==="reading") pool=ALL_ITEMS.filter(i=>i.qid.startsWith("u14")||i.qid.startsWith("u15"));
      else pool=ALL_ITEMS;
      pool = pool.filter(i=>i.passageGroup===undefined || i.passageHtml!==null ? true : true);
      const n = k==="all"?20:10;
      startQuiz(shuffle(pool).slice(0,n), {mode:"practice", title:"빠른 연습", back:viewHome});
    });
  }

  /* ========== 화면: 유닛 목록 ========== */
  function viewStudy(){
    CURRENT=viewStudy;
    clearTimer(); setBar("유닛별 학습", true); setTab("study"); backTarget=viewHome;
    let html="";
    [["g","PART 5·6 · 문법"],["r","PART 7 · 독해"]].forEach(([tag,label])=>{
      html+=`<div class="section-title">${label}</div>`;
      UNITS.filter(u=>u.partTag===tag).forEach(u=>{
        const p=unitProgress(u);
        html+=`<div class="unit-item" data-unit="${u.id}">
          <div class="unit-no">${u.no.replace('Unit ','U')}</div>
          <div class="unit-meta"><b>${esc(u.title)}</b><small>${esc(u.subtitle)} · ${u.items.length}문제</small></div>
          <div class="unit-badge">${p.solved}/${p.total}
            <div class="unit-mini"><i style="width:${p.pct}%"></i></div>
          </div>
        </div>`;
      });
    });
    app.innerHTML=`<div class="fade">${html}</div>`;
    app.querySelectorAll("[data-unit]").forEach(el=> el.onclick=()=>viewUnit(el.dataset.unit));
  }

  /* ========== 화면: 유닛 상세 (문법정리 + 시작) ========== */
  function viewUnit(uid){
    CURRENT=()=>viewUnit(uid);
    const u = byId["__unit_"+uid];
    clearTimer(); setBar(u.no, true); setTab("study"); backTarget=viewStudy;
    const p=unitProgress(u);
    let notes="";
    u.notes.forEach(n=>{
      notes+=`<div class="note-block"><h4>${esc(n.h)}</h4><ul>${n.items.map(i=>`<li>${i}</li>`).join("")}</ul></div>`;
    });
    app.innerHTML=`
      <div class="fade">
        <div class="card">
          <span class="part-tag ${u.partTag==='g'?'g':'r'}">${u.part}</span>
          <h2 style="margin:4px 0 2px;font-size:21px">${esc(u.title)}</h2>
          <div style="color:var(--sub);font-size:13px">${esc(u.subtitle)}</div>
          <div class="progress-wrap"><div class="progress-bar" style="width:${p.pct}%"></div></div>
          <div style="font-size:12px;color:var(--sub);margin-top:4px">${p.solved}/${p.total} 완료 · 정답 ${p.correct}개</div>
        </div>

        <div class="section-title">${u.type==='grammar'?'📘 문법 핵심 정리':'📘 풀이 전략'}</div>
        <div class="card">${notes||'<div class="empty">정리 없음</div>'}</div>

        <div class="btn-row">
          <button class="btn" id="startU">문제 풀기 (${u.items.length})</button>
          <button class="btn ghost" id="restartU">처음부터</button>
        </div>
      </div>`;
    $("#startU").onclick = ()=> startQuiz(u.items.slice(), {mode:"practice", title:u.no+" "+u.title, back:()=>viewUnit(uid)});
    $("#restartU").onclick = ()=>{
      u.items.forEach(it=> delete state.answers[it.qid]); save();
      startQuiz(u.items.slice(), {mode:"practice", title:u.no+" "+u.title, back:()=>viewUnit(uid)});
    };
  }

  /* ========== 퀴즈 엔진 ========== */
  let Q = null; // {items, idx, mode, picks:[], title, back, startTime}
  function startQuiz(items, opt){
    if(!items.length){ alert("문제가 없습니다."); return; }
    Q = { items, idx:0, mode:opt.mode, picks:new Array(items.length).fill(null),
          title:opt.title, back:opt.back, examSecs: opt.examSecs||0 };
    setTab(null);
    Q.examLeft = Q.examSecs;
    renderQ();
    if(Q.mode==="exam" && Q.examSecs>0) startExamTimer();
  }
  function fmtTime(sec){ const m=String(Math.floor(sec/60)).padStart(2,"0"), s=String(sec%60).padStart(2,"0"); return `${m}:${s}`; }
  function startExamTimer(){
    clearTimer();
    timerId=setInterval(()=>{
      Q.examLeft--; const t=$("#timer");
      if(t) t.textContent=fmtTime(Math.max(0,Q.examLeft));
      if(Q.examLeft<=0){ clearTimer(); finishQuiz(); }
    },1000);
  }

  function renderQ(){
    const it = Q.items[Q.idx];
    const isExam = Q.mode==="exam";
    setBar(Q.title, true); backTarget = ()=>{ if(confirm("풀이를 중단할까요? 진행상황은 저장됩니다.")){ clearTimer(); Q.back(); } };
    const picked = Q.picks[Q.idx];
    const answered = picked!==null;
    const bmOn = !!state.bookmarks[it.qid];

    let passage="";
    if(it.passageImg){
      passage=`<div class="passage">
        <div style="font-weight:700;color:var(--brand-d);margin-bottom:8px">📄 ${esc(it.passageTitle)} <span class="pill">책 원문</span></div>
        <img class="passage-img" src="${it.passageImg}" alt="지문 이미지" loading="lazy">
      </div>`;
    } else if(it.passageHtml){
      passage=`<div class="passage"><div style="font-weight:700;color:var(--brand-d);margin-bottom:8px">📄 ${esc(it.passageTitle)}</div>${it.passageHtml}</div>`;
    }
    const choices = it.choices.map((c,i)=>{
      let cls="choice";
      if(!isExam && answered){
        cls+=" disabled";
        if(i===it.answer) cls+=" correct";
        else if(i===picked) cls+=" wrong";
      } else if(picked===i){ cls+=" sel"; }
      return `<div class="${cls}" data-i="${i}"><span class="lab">${LAB[i]}</span><span>${esc(c)}</span></div>`;
    }).join("");

    let explain="";
    if(!isExam && answered){
      const ok = picked===it.answer;
      explain=`<div class="explain show">
        <div class="verdict ${ok?'ok':'no'}">${ok?'✅ 정답입니다!':'❌ 오답입니다'}</div>
        <div class="ans">정답: ${LAB[it.answer]}. ${esc(it.choices[it.answer])}</div>
        <div style="margin-top:6px">${esc(it.kr)}</div>
        ${it.vocab?`<div class="vocab">📌 ${esc(it.vocab)}</div>`:''}
      </div>`;
    }

    const progPct = Math.round((Q.idx+1)/Q.items.length*100);
    app.innerHTML=`
      <div class="fade">
        <div class="quiz-top">
          <div class="quiz-count"><span>${Q.idx+1}</span> / ${Q.items.length}</div>
          <button class="btn-bookmark ${bmOn?'on':''}" id="bm" title="북마크">${bmOn?'★':'☆'}</button>
          ${isExam?`<div class="timer" id="timer">${fmtTime(Math.max(0,Q.examLeft||Q.examSecs||0))}</div>`:''}
        </div>
        <div class="progress-wrap" style="margin-bottom:14px"><div class="progress-bar" style="width:${progPct}%"></div></div>
        <div class="card">
          ${passage}
          <div style="font-size:11px;color:var(--sub);margin-bottom:6px">${it.unitNo} · ${esc(it.unitTitle)}</div>
          <div class="q-text"><span class="q-num">Q${Q.idx+1}.</span>${esc(it.q)}</div>
          <div class="choices" id="choices">${choices}</div>
          ${explain}
        </div>
        <div class="btn-row">
          <button class="btn ghost" id="prev" ${Q.idx===0?'disabled':''}>← 이전</button>
          <button class="btn" id="next">${Q.idx===Q.items.length-1 ? (isExam?'제출하기':'결과 보기') : '다음 →'}</button>
        </div>
      </div>`;

    // 지문 이미지 확대/축소
    const pimg = app.querySelector(".passage-img");
    if(pimg) pimg.onclick = ()=> pimg.classList.toggle("zoom");

    // 보기 클릭
    app.querySelectorAll(".choice").forEach(el=>{
      el.onclick=()=>{
        const i=+el.dataset.i;
        if(!isExam && Q.picks[Q.idx]!==null) return; // 연습모드는 한번만
        Q.picks[Q.idx]=i;
        if(!isExam){
          // 정답 기록
          recordAnswer(it, i);
          renderQ();
        } else {
          app.querySelectorAll(".choice").forEach(c=>c.classList.remove("sel"));
          el.classList.add("sel");
        }
      };
    });
    $("#bm").onclick=()=>{
      if(state.bookmarks[it.qid]) delete state.bookmarks[it.qid];
      else state.bookmarks[it.qid]=1;
      save(); $("#bm").classList.toggle("on"); $("#bm").textContent=state.bookmarks[it.qid]?'★':'☆';
    };
    $("#prev").onclick=()=>{ if(Q.idx>0){ Q.idx--; renderQ(); } };
    $("#next").onclick=()=>{
      if(Q.idx===Q.items.length-1) finishQuiz();
      else { Q.idx++; renderQ(); }
    };
  }

  function recordAnswer(it, picked){
    const correct = picked===it.answer;
    state.answers[it.qid]={correct, picked};
    save();
  }

  function finishQuiz(){
    clearTimer();
    // 시험모드: 채점 기록
    if(Q.mode==="exam"){
      Q.items.forEach((it,i)=>{ if(Q.picks[i]!==null) recordAnswer(it, Q.picks[i]); });
    }
    let correct=0, answered=0;
    Q.items.forEach((it,i)=>{ if(Q.picks[i]!==null){ answered++; if(Q.picks[i]===it.answer) correct++; } });
    const total=Q.items.length;
    const score=Math.round(correct/total*100);
    if(Q.mode==="exam"){ state.exams.unshift({date:new Date().toLocaleString('ko-KR'), correct, total, score}); state.exams=state.exams.slice(0,20); save(); }

    let reviews="";
    Q.items.forEach((it,i)=>{
      const ok=Q.picks[i]===it.answer;
      const pick=Q.picks[i]===null?'무응답':`${LAB[Q.picks[i]]}. ${esc(it.choices[Q.picks[i]])}`;
      reviews+=`<div class="review-item">
        <div class="qn"><span class="tag-ox ${ok?'o':'x'}">${ok?'O':'X'}</span>Q${i+1}. ${esc(it.q)}</div>
        <div style="font-size:13px;color:var(--sub)">내 답: ${pick} ${ok?'':'· 정답: <b style="color:var(--good)">'+LAB[it.answer]+'. '+esc(it.choices[it.answer])+'</b>'}</div>
        ${ok?'':`<div style="font-size:13px;margin-top:4px;background:#f7f9fc;border-radius:8px;padding:8px">💡 ${esc(it.kr)}</div>`}
      </div>`;
    });
    const color = score>=80?'var(--good)':score>=50?'var(--warn)':'var(--bad)';
    setBar("결과", true); backTarget=Q.back; setTab(null);
    app.innerHTML=`
      <div class="fade">
        <div class="card">
          <div class="result-score">
            <div class="ring" style="background:conic-gradient(${color} ${score}%, #eef1f7 0)">
              <div style="width:108px;height:108px;border-radius:50%;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center">
                <div class="big" style="color:${color}">${score}</div>
                <div class="sub" style="font-size:12px">점</div>
              </div>
            </div>
            <div style="font-size:17px;font-weight:700">${correct} / ${total} 정답</div>
            <div class="sub">${score>=80?'훌륭해요! 🎉':score>=50?'잘하고 있어요! 💪':'복습이 필요해요 📖'}</div>
          </div>
        </div>
        <div class="section-title">문제별 리뷰</div>
        <div class="card">${reviews}</div>
        <div class="btn-row">
          <button class="btn ghost" id="retry">다시 풀기</button>
          <button class="btn" id="done">완료</button>
        </div>
      </div>`;
    $("#retry").onclick=()=> startQuiz(Q.items.slice(), {mode:Q.mode, title:Q.title, back:Q.back, examSecs:Q.examSecs});
    $("#done").onclick=()=> Q.back();
  }

  /* ========== 화면: 모의고사 설정 ========== */
  function viewExamSetup(){
    CURRENT=viewExamSetup;
    clearTimer(); setBar("실전 모의고사", true); setTab("exam"); backTarget=viewHome;
    app.innerHTML=`
      <div class="fade">
        <div class="card">
          <h2 style="margin:0 0 6px;font-size:19px">⏱️ 실전 모의고사</h2>
          <p style="color:var(--sub);margin:0 0 4px;font-size:14px">랜덤으로 출제되며 제한시간이 있습니다. 끝나면 한 번에 채점됩니다.</p>
        </div>
        <div class="section-title">문항 수 / 시간 선택</div>
        <div class="card">
          <div class="menu-grid">
            <div class="menu-tile" data-n="10" data-t="600"><div class="ic">🟢</div><b>10문제</b><small>10분 · 가볍게</small></div>
            <div class="menu-tile" data-n="20" data-t="1200"><div class="ic">🟡</div><b>20문제</b><small>20분 · 표준</small></div>
            <div class="menu-tile" data-n="30" data-t="1800"><div class="ic">🟠</div><b>30문제</b><small>30분 · 실전</small></div>
            <div class="menu-tile" data-n="50" data-t="3000"><div class="ic">🔴</div><b>50문제</b><small>50분 · 도전</small></div>
          </div>
        </div>
        <div class="section-title">범위</div>
        <div class="card">
          <label style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><input type="radio" name="scope" value="all" checked> 전체 (문법+독해)</label>
          <label style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><input type="radio" name="scope" value="g"> 문법만 (Part 5·6)</label>
          <label style="display:flex;align-items:center;gap:8px"><input type="radio" name="scope" value="r"> 독해만 (Part 7)</label>
        </div>
        ${state.exams.length?`<div class="section-title">최근 기록</div><div class="card">${
          state.exams.slice(0,5).map(e=>`<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--line);font-size:13px"><span>${e.date}</span><b style="color:${e.score>=80?'var(--good)':e.score>=50?'var(--warn)':'var(--bad)'}">${e.score}점 (${e.correct}/${e.total})</b></div>`).join("")
        }</div>`:''}
      </div>`;
    app.querySelectorAll("[data-n]").forEach(el=> el.onclick=()=>{
      const n=+el.dataset.n, t=+el.dataset.t;
      const scope=app.querySelector('input[name=scope]:checked').value;
      let pool = ALL_ITEMS;
      if(scope==="g") pool=ALL_ITEMS.filter(i=>byId["__unit_"+i.unitId] && UNITS.find(u=>u.id===i.unitId).partTag==="g");
      if(scope==="r") pool=ALL_ITEMS.filter(i=>UNITS.find(u=>u.id===i.unitId).partTag==="r");
      const items=shuffle(pool).slice(0, Math.min(n,pool.length));
      startQuiz(items, {mode:"exam", title:`모의고사 ${items.length}문항`, back:viewExamSetup, examSecs:t});
    });
  }

  /* ========== 화면: 오답노트 ========== */
  function viewWrong(){
    CURRENT=viewWrong;
    clearTimer(); setBar("오답노트", true); setTab(null); backTarget=viewHome;
    const wrong = ALL_ITEMS.filter(it=> state.answers[it.qid] && !state.answers[it.qid].correct);
    if(!wrong.length){ app.innerHTML=`<div class="empty fade"><span class="ic">🎉</span>틀린 문제가 없어요!<br><small>문제를 풀면 오답이 여기에 모입니다.</small></div>`; return; }
    let html=`<div class="card fade"><div style="display:flex;justify-content:space-between;align-items:center">
      <b>틀린 문제 ${wrong.length}개</b>
      <button class="btn teal" id="retryWrong">다시 풀기</button></div></div>`;
    wrong.forEach(it=>{
      const a=state.answers[it.qid];
      html+=`<div class="card fade">
        <div style="font-size:11px;color:var(--sub)">${it.unitNo} · ${esc(it.unitTitle)}</div>
        <div class="q-text" style="font-size:15px">${esc(it.q)}</div>
        <div style="font-size:13px;color:var(--bad)">✗ 내 답: ${LAB[a.picked]}. ${esc(it.choices[a.picked])}</div>
        <div style="font-size:13px;color:var(--good)">✓ 정답: ${LAB[it.answer]}. ${esc(it.choices[it.answer])}</div>
        <div style="font-size:13px;margin-top:6px;background:#f7f9fc;border-radius:8px;padding:8px">💡 ${esc(it.kr)}</div>
      </div>`;
    });
    app.innerHTML=html;
    $("#retryWrong").onclick=()=> startQuiz(shuffle(wrong), {mode:"practice", title:"오답 다시풀기", back:viewWrong});
  }

  /* ========== 화면: 북마크 ========== */
  function viewBookmark(){
    CURRENT=viewBookmark;
    clearTimer(); setBar("북마크", true); setTab(null); backTarget=viewHome;
    const bm = ALL_ITEMS.filter(it=> state.bookmarks[it.qid]);
    if(!bm.length){ app.innerHTML=`<div class="empty fade"><span class="ic">⭐</span>저장한 문제가 없어요.<br><small>문제 풀이 중 ☆ 버튼으로 저장하세요.</small></div>`; return; }
    let html=`<div class="card fade"><div style="display:flex;justify-content:space-between;align-items:center">
      <b>북마크 ${bm.length}개</b>
      <button class="btn" id="solveBm">모아 풀기</button></div></div>`;
    bm.forEach(it=>{
      html+=`<div class="card fade">
        <div style="font-size:11px;color:var(--sub)">${it.unitNo} · ${esc(it.unitTitle)}</div>
        <div class="q-text" style="font-size:15px">${esc(it.q)}</div>
        <div style="font-size:13px;color:var(--good)">✓ 정답: ${LAB[it.answer]}. ${esc(it.choices[it.answer])}</div>
        <div style="font-size:13px;margin-top:6px;color:var(--sub)">${esc(it.kr)}</div>
      </div>`;
    });
    app.innerHTML=html;
    $("#solveBm").onclick=()=> startQuiz(shuffle(bm), {mode:"practice", title:"북마크 풀기", back:viewBookmark});
  }

  /* ========== 화면: 통계 ========== */
  function viewStats(){
    CURRENT=viewStats;
    clearTimer(); setBar("학습 통계", true); setTab("stats"); backTarget=viewHome;
    const g=globalProgress();
    let unitRows="";
    UNITS.forEach(u=>{
      const p=unitProgress(u);
      unitRows+=`<div style="padding:8px 0;border-bottom:1px solid var(--line)">
        <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:3px">
          <span>${u.no} ${esc(u.title)}</span><b>${p.solved}/${p.total}</b></div>
        <div class="unit-mini" style="width:100%"><i style="width:${p.pct}%;background:${p.pct===100?'var(--good)':'var(--brand)'}"></i></div>
      </div>`;
    });
    app.innerHTML=`
      <div class="fade">
        <div class="hero">
          <h2 style="font-size:18px">📊 나의 학습 현황</h2>
          <div class="stat-row">
            <div class="stat"><b>${g.solved}</b><span>푼 문제</span></div>
            <div class="stat"><b>${g.correct}</b><span>맞은 문제</span></div>
            <div class="stat"><b>${g.acc}%</b><span>정답률</span></div>
          </div>
        </div>
        <div class="section-title">유닛별 진도 (${g.solved}/${g.total})</div>
        <div class="card">${unitRows}</div>
        <div class="section-title">모의고사 기록</div>
        <div class="card">${ state.exams.length? state.exams.map(e=>`<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--line);font-size:13px"><span>${e.date}</span><b style="color:${e.score>=80?'var(--good)':e.score>=50?'var(--warn)':'var(--bad)'}">${e.score}점 (${e.correct}/${e.total})</b></div>`).join("") : '<div class="empty" style="padding:20px">아직 기록이 없어요</div>'}</div>
        <div class="card" style="text-align:center">
          <button class="btn ghost" id="reset">학습 기록 초기화</button>
        </div>
      </div>`;
    $("#reset").onclick=()=>{ if(confirm("모든 학습 기록을 삭제할까요? 되돌릴 수 없습니다.")){ state=Object.assign({},DEFAULT,{answers:{},bookmarks:{},exams:[]}); save(); viewStats(); } };
  }

  /* ---------- 동기화 카드 ---------- */
  function syncCardHTML(){
    const cs = window.CloudSync;
    if(!cs || !cs.enabled){
      return `<div class="card" style="display:flex;align-items:center;gap:12px">
        <div style="font-size:24px">💾</div>
        <div style="flex:1"><b style="font-size:14px">기기에 저장 중</b>
          <div style="font-size:12px;color:var(--sub)">클라우드(Firebase) 미설정 — 이 기기에만 저장됩니다</div></div>
      </div>`;
    }
    const s = cs.status();
    if(s.mode==="cloud"){
      const photo = s.user && s.user.photoURL ? `<img src="${s.user.photoURL}" style="width:36px;height:36px;border-radius:50%">` : '<div style="font-size:24px">☁️</div>';
      return `<div class="card" style="display:flex;align-items:center;gap:12px">
        ${photo}
        <div style="flex:1"><b style="font-size:14px">✅ 실시간 동기화 중</b>
          <div style="font-size:12px;color:var(--sub)">${esc(s.user.displayName||s.user.email||"로그인됨")} · 기기 간 자동 저장</div></div>
        <button class="btn ghost" id="signOut" style="padding:8px 12px;font-size:13px">로그아웃</button>
      </div>`;
    }
    return `<div class="card" style="display:flex;align-items:center;gap:12px">
      <div style="font-size:24px">☁️</div>
      <div style="flex:1"><b style="font-size:14px">기기 간 동기화하기</b>
        <div style="font-size:12px;color:var(--sub)">구글 로그인하면 폰·태블릿 진도가 실시간 동기화됩니다</div></div>
      <button class="btn" id="signIn" style="padding:9px 14px;font-size:13px">구글 로그인</button>
    </div>`;
  }
  function wireSyncCard(){
    const si=$("#signIn"), so=$("#signOut");
    if(si) si.onclick=()=>{ if(window.CloudSync&&window.CloudSync.signIn) window.CloudSync.signIn(); };
    if(so) so.onclick=()=>{ if(window.CloudSync&&window.CloudSync.signOut) window.CloudSync.signOut(); };
  }
  // CloudSync 모듈이 늦게 로드되므로 폴링하여 연결
  (function wireCloud(){
    if(window.CloudSync){
      if(window.CloudSync.onStatus) window.CloudSync.onStatus(()=>{ if(CURRENT===viewHome) viewHome(); });
      if(CURRENT===viewHome) viewHome();
    } else setTimeout(wireCloud, 200);
  })();

  /* ---------- 탭바 ---------- */
  document.querySelectorAll("nav.tabbar button").forEach(b=> b.onclick=()=>{
    const t=b.dataset.tab;
    if(t==="home") viewHome();
    else if(t==="study") viewStudy();
    else if(t==="exam") viewExamSetup();
    else if(t==="stats") viewStats();
  });

  // 시작
  viewHome();
})();
