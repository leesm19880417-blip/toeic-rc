/* ============================================================
   맨처음 토익 RC - 학습 데이터
   책 커리큘럼(PART 5·6 문법 13유닛 + PART 7 독해 2유닛) 기반
   각 문항: q(문제), choices(보기 4개), answer(정답 index 0~3),
            kr(한글 해설), vocab(어휘, 선택)
   ============================================================ */

const COURSE = {
  parts56: {
    id: "p56",
    title: "PART 5·6 · 문법",
    desc: "단문 공란 채우기 / 장문 공란 채우기",
    units: [
      /* ---------------- Unit 01 문장의 구조 ---------------- */
      {
        id: "u01", no: "Unit 01", title: "문장의 구조", subtitle: "Sentence Structure",
        notes: [
          { h: "문장의 5요소", items: [
            "주어(S) + 동사(V) 가 문장의 핵심. 여기에 목적어(O)·보어(C)·수식어(M)가 붙는다.",
            "주어/목적어 자리 → <b>명사(구)</b>, 보어 자리 → <b>명사 또는 형용사</b>, 수식어 → 부사·전치사구." ] },
          { h: "1형식 S+V (완전자동사)", items: [
            "동사만으로 의미 완성. work, arrive, happen, occur, rise, exist 등.",
            "뒤에 목적어가 오지 않고 부사·전치사구가 붙는다. (예: The store <b>opens</b> at nine.)" ] },
          { h: "2형식 S+V+C (불완전자동사)", items: [
            "be, become, remain, stay, seem, appear, look, sound, feel + <b>보어</b>.",
            "보어 자리에는 <b>형용사</b>나 명사가 온다. 부사는 올 수 없다! (예: The plan looks <b>good</b>.)" ] },
          { h: "3형식 S+V+O", items: [
            "타동사 + 목적어(명사). discuss, consider, approach 등은 전치사 없이 바로 목적어.",
            "목적어 자리에는 명사·동명사·to부정사·명사절이 온다." ] },
          { h: "4형식 / 5형식", items: [
            "4형식 S+V+IO(간접목적어)+DO(직접목적어): give, send, offer, award, grant.",
            "5형식 S+V+O+OC(목적격보어): make, keep, find, consider, name + O + 형용사/명사." ] }
        ],
        questions: [
          { q: "The new shopping mall ------- in the downtown area last month.", choices: ["opened","opens","opening","to open"], answer: 0,
            kr: "last month(과거)이므로 과거시제 동사 opened. open은 1형식 자동사로 주어 뒤에 바로 온다.", vocab: "downtown 시내 / area 지역" },
          { q: "The financial report looks ------- after the recent revisions.", choices: ["accurately","accuracy","accurate","accurately"], answer: 2,
            kr: "look은 2형식 동사로 보어 자리에 형용사가 온다. 부사 accurately는 불가. accurate(정확한).", vocab: "revision 수정" },
          { q: "All employees must ------- the new safety guidelines carefully.", choices: ["comply","review","arrive","happen"], answer: 1,
            kr: "뒤에 목적어 the guidelines가 있으므로 타동사 review가 필요. comply는 자동사(comply with).", vocab: "guideline 지침" },
          { q: "The manager ------- the staff a detailed schedule for the event.", choices: ["gave","arrived","remained","occurred"], answer: 0,
            kr: "the staff(IO) + a schedule(DO) 형태의 4형식. give가 정답.", vocab: "detailed 상세한" },
          { q: "The board found the proposal -------.", choices: ["accept","acceptance","acceptable","accepting"], answer: 2,
            kr: "5형식 find + O + OC(형용사). 목적격보어 자리에 형용사 acceptable.", vocab: "acceptable 받아들일 만한" },
          { q: "Sales of the product ------- significantly during the holiday season.", choices: ["increased","increasing","to increase","increase"], answer: 0,
            kr: "주어 Sales에 대한 동사 자리, 과거시제 increased. increase는 자동사로 쓰여 1형식.", vocab: "significantly 상당히" },
          { q: "The committee will ------- the budget proposal at the next meeting.", choices: ["discuss about","discuss","discussion","discussing"], answer: 1,
            kr: "discuss는 타동사로 전치사 about 없이 바로 목적어를 취한다. (discuss the proposal)", vocab: "budget 예산" },
          { q: "The renovation made the office space much more -------.", choices: ["functionally","function","functional","functions"], answer: 2,
            kr: "make + O + OC(형용사) 5형식. 목적격보어 자리에 형용사 functional.", vocab: "renovation 개조" },
          { q: "Customer complaints ------- after the new policy was introduced.", choices: ["decreased","decrease them","were decreased it","decreasing"], answer: 0,
            kr: "decrease는 자동사로 쓰여 목적어 없이 1형식. 과거시제 decreased.", vocab: "complaint 불만" },
          { q: "The training session will help employees ------- more productive.", choices: ["become","becoming","becomes","to becoming"], answer: 0,
            kr: "help + O + (to) 동사원형. become은 2형식 동사로 뒤에 형용사 보어(productive).", vocab: "productive 생산적인" }
        ]
      },
      /* ---------------- Unit 02 명사와 대명사 ---------------- */
      {
        id: "u02", no: "Unit 02", title: "명사와 대명사", subtitle: "Nouns & Pronouns",
        notes: [
          { h: "명사의 자리", items: [
            "주어·목적어·보어·전치사의 목적어 자리는 명사.",
            "관사(a/an/the)·형용사·소유격 <b>뒤</b>, 전치사 뒤는 명사 자리.",
            "어미로 명사 식별: -tion, -ment, -ness, -ity, -ance, -ence, -er/-or(사람)." ] },
          { h: "가산 vs 불가산", items: [
            "가산명사 단수는 반드시 한정사(a/the/소유격) 필요. 복수는 -s.",
            "불가산명사(information, equipment, advice, furniture)는 a(n)·복수형 불가." ] },
          { h: "인칭대명사", items: [
            "주격(I,he), 목적격(me,him), 소유격(my,his)+명사, 소유대명사(mine,his), 재귀(myself).",
            "소유격 뒤에는 반드시 명사. 전치사·타동사 뒤는 목적격." ] },
          { h: "재귀대명사 / 부정대명사", items: [
            "주어=목적어일 때 재귀대명사. by oneself(혼자서).",
            "some(긍정문)/any(부정·의문문), other/another/the other, each/every(+단수)." ] }
        ],
        questions: [
          { q: "The company announced a significant ------- in quarterly profits.", choices: ["increase","increasing","increased","increasingly"], answer: 0,
            kr: "관사 a + 형용사 뒤 명사 자리. increase(증가)는 명사로도 쓰인다.", vocab: "quarterly 분기의" },
          { q: "Please submit ------- application before the deadline.", choices: ["you","your","yours","yourself"], answer: 1,
            kr: "명사 application 앞이므로 소유격 your.", vocab: "deadline 마감" },
          { q: "The technicians completed the installation by -------.", choices: ["them","they","themselves","their"], answer: 2,
            kr: "by oneself(스스로/직접) 관용표현. 주어 technicians와 일치하는 재귀대명사 themselves.", vocab: "installation 설치" },
          { q: "All visitors must wear a badge for -------.", choices: ["identify","identification","identified","identifies"], answer: 1,
            kr: "전치사 for 뒤 명사 자리. identification(신분확인).", vocab: "badge 명찰" },
          { q: "The manager praised ------- for the successful project.", choices: ["we","our","us","ours"], answer: 2,
            kr: "타동사 praised의 목적어 자리 → 목적격 us.", vocab: "praise 칭찬하다" },
          { q: "We could not find ------- information about the new policy.", choices: ["many","much","few","a number of"], answer: 1,
            kr: "information은 불가산명사. 불가산 수식은 much. (many/few/a number of는 가산복수)", vocab: "policy 정책" },
          { q: "Each of the employees ------- responsible for submitting a report.", choices: ["are","is","were","have"], answer: 1,
            kr: "each는 단수 취급 → 단수동사 is.", vocab: "responsible 책임 있는" },
          { q: "The two proposals are similar, but ------- is more cost-effective.", choices: ["another","other","one","the other"], answer: 3,
            kr: "둘 중 나머지 하나 → the other. (two 중 하나는 one, 나머지는 the other)", vocab: "cost-effective 비용효율적인" },
          { q: "If you have ------- questions, please contact the help desk.", choices: ["some","any","much","a little"], answer: 1,
            kr: "조건/부정/의문문에서는 any. questions는 가산복수.", vocab: "contact 연락하다" },
          { q: "The success of the campaign exceeded ------- expectations.", choices: ["we","us","our","ours"], answer: 2,
            kr: "명사 expectations 앞 소유격 our.", vocab: "exceed 초과하다 / expectation 기대" }
        ]
      },
      /* ---------------- Unit 03 형용사 & 부사 ---------------- */
      {
        id: "u03", no: "Unit 03", title: "형용사 & 부사", subtitle: "Adjectives & Adverbs",
        notes: [
          { h: "형용사의 자리", items: [
            "명사 앞에서 수식 / 2·5형식 보어 자리.",
            "어미: -ous, -ful, -ive, -able, -al, -ic. 부사는 보통 형용사+ly." ] },
          { h: "부사의 자리", items: [
            "동사·형용사·다른 부사·문장 전체 수식. <b>명사는 수식하지 못한다.</b>",
            "be동사·조동사 뒤, 일반동사 앞. 형용사/분사 앞에서 정도를 수식." ] },
          { h: "혼동 주의 표현", items: [
            "수량형용사: many/few + 가산복수, much/little + 불가산, some/most/all 둘 다.",
            "every/each + 단수명사, all + 복수/불가산." ] },
          { h: "원급·비교급·최상급", items: [
            "as + 원급 + as, 비교급 + than, the + 최상급(+ in/of).",
            "비교급 강조: much/even/far/still/a lot + 비교급. (very 불가)" ] }
        ],
        questions: [
          { q: "The new software offers a ------- solution to data management.", choices: ["reliably","reliability","reliable","rely"], answer: 2,
            kr: "관사 a + ___ + 명사 solution. 명사 앞 형용사 reliable.", vocab: "reliable 믿을 만한" },
          { q: "The project was completed ------- ahead of schedule.", choices: ["success","successful","successfully","succeed"], answer: 2,
            kr: "동사 completed를 수식 → 부사 successfully.", vocab: "ahead of schedule 예정보다 일찍" },
          { q: "The presentation was ------- informative for new employees.", choices: ["high","highly","height","higher"], answer: 1,
            kr: "형용사 informative를 수식하는 부사 highly(매우).", vocab: "informative 유익한" },
          { q: "There were ------- applicants for the position this year.", choices: ["much","little","few","a great deal of"], answer: 2,
            kr: "applicants(가산복수) 수식 → few. (much/little/a great deal of는 불가산)", vocab: "applicant 지원자" },
          { q: "The new model is ------- more efficient than the previous one.", choices: ["very","much","too","so"], answer: 1,
            kr: "비교급 more efficient 강조 → much. very는 비교급을 강조하지 못한다.", vocab: "efficient 효율적인" },
          { q: "Our team responded to the inquiry as ------- as possible.", choices: ["quick","quickly","quicker","quickest"], answer: 1,
            kr: "as ___ as 사이, 동사 responded 수식 → 부사 quickly.", vocab: "inquiry 문의" },
          { q: "The director made an ------- decision to expand the business.", choices: ["importantly","importance","important","import"], answer: 2,
            kr: "an + ___ + 명사 decision. 형용사 important.", vocab: "expand 확장하다" },
          { q: "This is the ------- restaurant in the entire district.", choices: ["popular","more popular","most popular","popularity"], answer: 2,
            kr: "the + 최상급 + in. most popular(가장 인기 있는).", vocab: "district 지역" },
          { q: "Almost ------- employee attended the annual conference.", choices: ["all","every","most","both"], answer: 1,
            kr: "단수명사 employee 앞 → every. (all/most/both는 복수)", vocab: "annual 연례의" },
          { q: "The instructions were written -------, so everyone understood them.", choices: ["clear","clearly","clarity","clearer"], answer: 1,
            kr: "동사 were written 수식 → 부사 clearly.", vocab: "instruction 설명/지시" }
        ]
      },
      /* ---------------- Unit 04 동사의 시제 ---------------- */
      {
        id: "u04", no: "Unit 04", title: "동사의 시제", subtitle: "Verb Tenses",
        notes: [
          { h: "현재 / 과거 / 미래", items: [
            "현재: 반복·일반사실. usually, every day, regularly와 함께.",
            "과거: yesterday, ago, last~, in+과거연도.",
            "미래: will/be going to. tomorrow, next~, soon." ] },
          { h: "진행 / 완료", items: [
            "현재진행 be+ing: now, currently, at the moment.",
            "현재완료 have+p.p.: since(~이래), for(~동안), recently, already, yet.",
            "과거완료 had+p.p.: 과거의 특정 시점 이전(before/by the time)." ] },
          { h: "시제 단서 표현", items: [
            "by the time + 현재 → 주절 미래완료, by the time + 과거 → 주절 과거완료.",
            "시간·조건 부사절은 현재시제가 미래를 대신한다. (when/if/until/as soon as)" ] }
        ],
        questions: [
          { q: "The company ------- its annual report every January.", choices: ["publish","publishes","published","will publish"], answer: 1,
            kr: "every January(반복) → 현재시제. 3인칭 단수 publishes.", vocab: "annual report 연례 보고서" },
          { q: "The construction project ------- two years ago.", choices: ["begins","has begun","began","will begin"], answer: 2,
            kr: "two years ago → 과거시제 began.", vocab: "construction 공사" },
          { q: "We ------- in this industry for over twenty years.", choices: ["work","worked","have worked","will work"], answer: 2,
            kr: "for over twenty years → 현재완료 have worked(계속).", vocab: "industry 산업" },
          { q: "The IT team is currently ------- the network system.", choices: ["upgrade","upgrades","upgrading","upgraded"], answer: 2,
            kr: "currently + be동사 is → 현재진행 upgrading.", vocab: "upgrade 업그레이드하다" },
          { q: "By the time the manager arrived, the meeting ------- already ended.", choices: ["has","had","will have","is"], answer: 1,
            kr: "By the time + 과거(arrived), 그 이전 완료 → 과거완료 had ended.", vocab: "by the time ~할 무렵" },
          { q: "The new branch ------- next month in Singapore.", choices: ["opens","opened","will open","has opened"], answer: 2,
            kr: "next month → 미래시제 will open.", vocab: "branch 지점" },
          { q: "As soon as the shipment -------, we will notify the customer.", choices: ["arrives","will arrive","arrived","has arrived"], answer: 0,
            kr: "시간 부사절(as soon as)에서는 현재시제가 미래 대신. arrives.", vocab: "shipment 배송품" },
          { q: "Ms. Lee ------- for the firm since 2015.", choices: ["works","is working","has worked","worked"], answer: 2,
            kr: "since 2015 → 현재완료 has worked.", vocab: "firm 회사" },
          { q: "The factory ------- 500 units per day last year.", choices: ["produces","produced","has produced","produce"], answer: 1,
            kr: "last year → 과거시제 produced.", vocab: "unit 제품 단위" },
          { q: "Please call me when you ------- the office tomorrow.", choices: ["will reach","reach","reached","reaching"], answer: 1,
            kr: "시간 부사절 when에서 현재시제가 미래를 대신. reach.", vocab: "reach 도착하다" }
        ]
      },
      /* ---------------- Unit 05 능동태와 수동태 ---------------- */
      {
        id: "u05", no: "Unit 05", title: "능동태와 수동태", subtitle: "Active & Passive Voice",
        notes: [
          { h: "수동태 기본", items: [
            "be + p.p. (+ by 행위자). 주어가 동작을 '받을' 때.",
            "목적어 유무로 판단: 뒤에 목적어 있으면 능동, 없으면 수동인 경우가 많다." ] },
          { h: "시제별 수동태", items: [
            "현재 is/are p.p. · 과거 was/were p.p. · 미래 will be p.p.",
            "완료 have been p.p. · 진행 is being p.p. · 조동사 + be p.p." ] },
          { h: "주의 동사", items: [
            "자동사(arrive, happen, occur, rise, exist)는 수동태 불가.",
            "수동태 관용: be interested in, be satisfied with, be located in, be made of." ] }
        ],
        questions: [
          { q: "The annual budget ------- by the finance committee last week.", choices: ["approved","was approved","approves","approving"], answer: 1,
            kr: "예산이 '승인받는' 대상 + by 행위자 → 수동태 was approved.", vocab: "approve 승인하다" },
          { q: "All packages ------- before they leave the warehouse.", choices: ["inspect","are inspected","inspecting","have inspected"], answer: 1,
            kr: "packages가 검사 '받는' 대상 → 수동태 are inspected.", vocab: "warehouse 창고" },
          { q: "The new policy will ------- next month.", choices: ["implement","be implemented","implementing","implemented"], answer: 1,
            kr: "will + be p.p. 미래 수동태. policy가 시행되는 대상.", vocab: "implement 시행하다" },
          { q: "The headquarters ------- in the center of the city.", choices: ["locates","is located","locating","has located"], answer: 1,
            kr: "be located in(~에 위치하다) 관용 수동태 표현.", vocab: "headquarters 본사" },
          { q: "The contract ------- by both parties yesterday.", choices: ["signed","was signed","signs","signing"], answer: 1,
            kr: "계약이 서명 '되는' 대상 + by + 과거 → was signed.", vocab: "party 당사자" },
          { q: "The conference room ------- being renovated this week.", choices: ["is","was","has","will"], answer: 0,
            kr: "is being p.p.(현재진행 수동태). this week → 현재. is.", vocab: "renovate 개조하다" },
          { q: "The report must ------- by Friday afternoon.", choices: ["submit","submitted","be submitted","submitting"], answer: 2,
            kr: "조동사 must + be p.p. 수동태. 보고서가 제출되는 대상.", vocab: "submit 제출하다" },
          { q: "An unexpected problem ------- during the presentation.", choices: ["was occurred","occurred","is occurred","has been occurred"], answer: 1,
            kr: "occur는 자동사로 수동태 불가. 과거 occurred.", vocab: "unexpected 예상치 못한" },
          { q: "Employees ------- with the new benefits package.", choices: ["satisfy","are satisfied","satisfying","satisfies"], answer: 1,
            kr: "be satisfied with(~에 만족하다) 관용 수동태.", vocab: "benefits 복리후생" },
          { q: "The award ------- to the most innovative team each year.", choices: ["gives","is given","giving","give"], answer: 1,
            kr: "상이 '주어지는' 대상 → 수동태 is given.", vocab: "innovative 혁신적인" }
        ]
      },
      /* ---------------- Unit 06 to부정사 ---------------- */
      {
        id: "u06", no: "Unit 06", title: "to부정사", subtitle: "To-infinitive",
        notes: [
          { h: "to부정사의 역할", items: [
            "명사적(~하는 것): 주어·목적어·보어. / 형용사적(~할): 명사 수식.",
            "부사적(~하기 위해): 목적·결과·감정의 원인." ] },
          { h: "to부정사를 목적어로 취하는 동사", items: [
            "want, hope, plan, decide, agree, expect, refuse, offer, promise, fail + to V." ] },
          { h: "5형식 / 관용표현", items: [
            "ask/want/expect/allow/enable/encourage + O + to V.",
            "too ~ to V(너무~해서 못~), enough to V, in order to V(~하기 위해)." ] }
        ],
        questions: [
          { q: "The company plans ------- a new branch in Asia next year.", choices: ["open","to open","opening","opened"], answer: 1,
            kr: "plan + to V. to open.", vocab: "branch 지점" },
          { q: "The manager decided ------- the meeting until Monday.", choices: ["postpone","postponing","to postpone","postponed"], answer: 2,
            kr: "decide + to V. to postpone.", vocab: "postpone 연기하다" },
          { q: "The software allows users ------- documents easily.", choices: ["share","to share","sharing","shared"], answer: 1,
            kr: "allow + O + to V. to share.", vocab: "share 공유하다" },
          { q: "We are pleased ------- you to our annual gala.", choices: ["invite","inviting","to invite","invited"], answer: 2,
            kr: "감정형용사 pleased + to V(~하게 되어). to invite.", vocab: "gala 행사" },
          { q: "The report is too complex ------- in one day.", choices: ["finish","to finish","finishing","finished"], answer: 1,
            kr: "too ~ to V(너무 복잡해서 끝낼 수 없다). to finish.", vocab: "complex 복잡한" },
          { q: "In order ------- costs, the company reduced overtime.", choices: ["cut","to cut","cutting","cuts"], answer: 1,
            kr: "in order to V(~하기 위해). to cut.", vocab: "overtime 초과근무" },
          { q: "The training program is designed ------- employee skills.", choices: ["improve","to improve","improving","improved"], answer: 1,
            kr: "be designed to V(~하도록 설계되다). to improve.", vocab: "improve 향상시키다" },
          { q: "All staff are encouraged ------- the workshop.", choices: ["attend","attending","to attend","attended"], answer: 2,
            kr: "encourage + O + to V (수동: be encouraged to V). to attend.", vocab: "workshop 워크숍" },
          { q: "The applicant has enough experience ------- the position.", choices: ["fill","to fill","filling","filled"], answer: 1,
            kr: "enough + 명사 + to V(~할 만큼 충분한). to fill.", vocab: "fill the position 자리를 채우다" },
          { q: "Our goal is ------- customer satisfaction this quarter.", choices: ["increase","to increase","increasing","increased"], answer: 1,
            kr: "be동사 보어 자리 명사적 용법 to V. to increase.", vocab: "satisfaction 만족" }
        ]
      },
      /* ---------------- Unit 07 동명사 ---------------- */
      {
        id: "u07", no: "Unit 07", title: "동명사", subtitle: "Gerund",
        notes: [
          { h: "동명사 = 명사 역할", items: [
            "동사+ing가 주어·목적어·전치사의 목적어. (~하는 것)",
            "전치사 뒤에는 반드시 동명사(전치사 + V-ing)." ] },
          { h: "동명사를 목적어로 취하는 동사", items: [
            "enjoy, finish, mind, avoid, consider, recommend, suggest, postpone, give up, keep + V-ing." ] },
          { h: "동명사 관용표현", items: [
            "be busy V-ing, look forward to V-ing, be used to V-ing, spend 시간 V-ing,",
            "have difficulty (in) V-ing, on V-ing(~하자마자), worth V-ing." ] }
        ],
        questions: [
          { q: "The committee recommended ------- the deadline by a week.", choices: ["extend","to extend","extending","extended"], answer: 2,
            kr: "recommend + V-ing. extending.", vocab: "extend 연장하다" },
          { q: "Thank you for ------- our event a great success.", choices: ["make","to make","making","made"], answer: 2,
            kr: "전치사 for + 동명사 making.", vocab: "success 성공" },
          { q: "We look forward to ------- from you soon.", choices: ["hear","hearing","heard","hears"], answer: 1,
            kr: "look forward to + V-ing(to는 전치사). hearing.", vocab: "look forward to 기대하다" },
          { q: "Employees should avoid ------- personal calls during work hours.", choices: ["make","to make","making","made"], answer: 2,
            kr: "avoid + V-ing. making.", vocab: "avoid 피하다" },
          { q: "The new policy is aimed at ------- workplace safety.", choices: ["improve","improving","to improve","improved"], answer: 1,
            kr: "전치사 at + 동명사 improving. (be aimed at V-ing)", vocab: "workplace 직장" },
          { q: "The team finished ------- the project ahead of schedule.", choices: ["complete","to complete","completing","completed"], answer: 2,
            kr: "finish + V-ing. completing.", vocab: "ahead of schedule 예정보다 일찍" },
          { q: "She is responsible for ------- the monthly newsletter.", choices: ["edit","editing","to edit","edited"], answer: 1,
            kr: "전치사 for + 동명사 editing.", vocab: "newsletter 소식지" },
          { q: "Before ------- the form, please read all instructions.", choices: ["submit","submitting","to submit","submitted"], answer: 1,
            kr: "전치사 Before + 동명사 submitting.", vocab: "form 양식" },
          { q: "The manager suggested ------- a follow-up meeting.", choices: ["schedule","scheduling","to schedule","scheduled"], answer: 1,
            kr: "suggest + V-ing. scheduling.", vocab: "follow-up 후속의" },
          { q: "The renovation is worth ------- despite the high cost.", choices: ["do","to do","doing","done"], answer: 2,
            kr: "worth + V-ing(~할 가치가 있는). doing.", vocab: "despite ~에도 불구하고" }
        ]
      },
      /* ---------------- Unit 08 분사 ---------------- */
      {
        id: "u08", no: "Unit 08", title: "분사", subtitle: "Participles",
        notes: [
          { h: "현재분사 vs 과거분사", items: [
            "현재분사(V-ing): 능동·진행(~하는). 과거분사(p.p.): 수동·완료(~된).",
            "수식 대상이 '하는' 주체면 -ing, '당하는' 대상이면 p.p." ] },
          { h: "감정분사", items: [
            "사물·원인 → -ing (interesting, exciting), 사람·감정 → -ed (interested, excited).",
            "주의: surprising vs surprised, satisfying vs satisfied." ] },
          { h: "분사구문 / 명사 수식", items: [
            "명사 앞·뒤에서 형용사처럼 수식.",
            "분사구문: 접속사+주어 생략 후 V-ing/p.p.로 부사절 축약." ] }
        ],
        questions: [
          { q: "The ------- results exceeded everyone's expectations.", choices: ["surprise","surprising","surprised","surprises"], answer: 1,
            kr: "결과(사물)가 놀라움을 '주는' → 현재분사 surprising.", vocab: "exceed 초과하다" },
          { q: "Customers were ------- with the quality of service.", choices: ["satisfy","satisfying","satisfied","satisfaction"], answer: 2,
            kr: "사람이 만족을 '느끼는' → 과거분사 satisfied.", vocab: "quality 품질" },
          { q: "The products ------- in this factory meet global standards.", choices: ["make","making","made","makes"], answer: 2,
            kr: "products가 '만들어진' 대상(수동) → 과거분사 made.", vocab: "standard 기준" },
          { q: "The employees ------- in the lobby are new interns.", choices: ["wait","waiting","waited","waits"], answer: 1,
            kr: "직원들이 '기다리는' 주체(능동) → 현재분사 waiting.", vocab: "intern 인턴" },
          { q: "The conference was very ------- for all attendees.", choices: ["inform","informing","informative","informed"], answer: 2,
            kr: "informative(유익한)가 자연스럽다. (informing은 거의 안 씀)", vocab: "attendee 참석자" },
          { q: "All ------- documents must be filed by Friday.", choices: ["complete","completing","completed","completion"], answer: 2,
            kr: "서류가 '완성된' 상태(수동) → 과거분사 completed.", vocab: "file 보관하다" },
          { q: "------- the report, she sent it to her supervisor.", choices: ["Finish","Finishing","Finished","To finishing"], answer: 1,
            kr: "분사구문. 주어가 보고서를 끝낸 능동 → Finishing.", vocab: "supervisor 상사" },
          { q: "The newly ------- manager will start next Monday.", choices: ["appoint","appointing","appointed","appoints"], answer: 2,
            kr: "매니저가 '임명된' 대상(수동) → 과거분사 appointed.", vocab: "appoint 임명하다" },
          { q: "The audience found the lecture quite -------.", choices: ["bore","boring","bored","bores"], answer: 1,
            kr: "강연(사물)이 지루함을 '주는' → boring.", vocab: "lecture 강연" },
          { q: "Goods ------- after 5 P.M. will be shipped the next day.", choices: ["order","ordering","ordered","orders"], answer: 2,
            kr: "상품이 '주문된' 대상(수동) → 과거분사 ordered.", vocab: "ship 배송하다" }
        ]
      },
      /* ---------------- Unit 09 접속사 ---------------- */
      {
        id: "u09", no: "Unit 09", title: "접속사", subtitle: "Conjunctions",
        notes: [
          { h: "등위·상관접속사", items: [
            "and, but, or, so. / both A and B, either A or B, neither A nor B, not only A but also B.",
            "연결되는 A·B는 문법적으로 대등(병렬)해야 한다." ] },
          { h: "명사절 접속사", items: [
            "that(~것), whether/if(~인지), 의문사(what/who/how...).",
            "동사의 목적어·주어·보어 자리에 절을 이끈다." ] },
          { h: "부사절 접속사 (vs 전치사)", items: [
            "접속사 + 주어+동사절: because, although, while, when, if, since, unless.",
            "전치사 + 명사: because of, despite/in spite of, during. (혼동 주의!)" ] }
        ],
        questions: [
          { q: "The store offers discounts ------- members and non-members.", choices: ["both","either","neither","not only"], answer: 0,
            kr: "both A and B. members and non-members와 호응.", vocab: "discount 할인" },
          { q: "------- the weather was bad, the event proceeded as planned.", choices: ["Despite","Although","Because of","During"], answer: 1,
            kr: "뒤에 주어+동사절(the weather was bad) → 접속사 Although. (Despite는 전치사)", vocab: "proceed 진행되다" },
          { q: "The manager asked ------- the deadline could be extended.", choices: ["that","whether","despite","during"], answer: 1,
            kr: "~인지 아닌지 명사절 → whether.", vocab: "extend 연장하다" },
          { q: "The flight was delayed ------- the heavy snow.", choices: ["because","although","because of","while"], answer: 2,
            kr: "뒤에 명사구(the heavy snow) → 전치사 because of.", vocab: "delay 지연시키다" },
          { q: "Employees may work from home ------- they meet their targets.", choices: ["as long as","despite","in spite of","during"], answer: 0,
            kr: "조건 부사절 접속사 as long as(~하는 한). 뒤 절.", vocab: "target 목표" },
          { q: "We hired her ------- she had extensive experience.", choices: ["because","because of","despite","during"], answer: 0,
            kr: "뒤에 절(she had...) + 이유 → 접속사 because.", vocab: "extensive 폭넓은" },
          { q: "The company will succeed ------- it adapts to the market.", choices: ["if","despite","during","because of"], answer: 0,
            kr: "조건 부사절 접속사 if. 뒤 절.", vocab: "adapt 적응하다" },
          { q: "------- the manager nor the assistant was available.", choices: ["Either","Neither","Both","Not only"], answer: 1,
            kr: "neither A nor B. nor와 호응하는 Neither.", vocab: "available 시간이 되는" },
          { q: "Please review the contract ------- you sign it.", choices: ["before","despite","because of","during"], answer: 0,
            kr: "시간 부사절 접속사 before. 뒤 절.", vocab: "contract 계약서" },
          { q: "The report shows ------- sales have increased this quarter.", choices: ["whether","that","despite","during"], answer: 1,
            kr: "shows의 목적어로 사실을 전달하는 명사절 → that.", vocab: "quarter 분기" }
        ]
      },
      /* ---------------- Unit 10 전치사 ---------------- */
      {
        id: "u10", no: "Unit 10", title: "전치사", subtitle: "Prepositions",
        notes: [
          { h: "시간 전치사", items: [
            "at(시각) / on(요일·날짜) / in(월·연도·계절).",
            "by(~까지 완료) vs until(~까지 계속), for(+기간) vs during(+명사), within(~이내)." ] },
          { h: "장소·방향 전치사", items: [
            "at(지점) / on(접촉·표면) / in(공간 내부).",
            "to(방향), from(출발), into, through, across, along." ] },
          { h: "빈출 기타", items: [
            "이유 due to/owing to, 양보 despite, 제외 except for, ~에 관하여 regarding/concerning,",
            "~에도 불구하고 in spite of, ~에 따라 according to." ] }
        ],
        questions: [
          { q: "The package will be delivered ------- Friday.", choices: ["in","at","on","of"], answer: 2,
            kr: "요일 앞 전치사 on. on Friday.", vocab: "deliver 배달하다" },
          { q: "Please submit the report ------- the end of the day.", choices: ["by","until","for","during"], answer: 0,
            kr: "~까지 완료(마감) → by. (until은 계속)", vocab: "submit 제출하다" },
          { q: "The office will be closed ------- the national holiday.", choices: ["while","during","for","by"], answer: 1,
            kr: "during + 명사(the holiday). (for는 기간 길이)", vocab: "national holiday 국경일" },
          { q: "The flight was canceled ------- the severe weather.", choices: ["because","due to","although","despite"], answer: 1,
            kr: "이유 + 명사구 → due to. (because는 접속사)", vocab: "severe 심한" },
          { q: "All applications must be received ------- two weeks.", choices: ["within","until","by the","for"], answer: 0,
            kr: "within + 기간(~이내). within two weeks.", vocab: "application 지원서" },
          { q: "The new store is located ------- Main Street.", choices: ["in","at","on","to"], answer: 2,
            kr: "거리(street) 앞 on. on Main Street.", vocab: "located 위치한" },
          { q: "------- the rising costs, the company increased prices.", choices: ["Despite","Due to","Although","While"], answer: 1,
            kr: "이유 + 명사구(the rising costs) → Due to.", vocab: "rising 상승하는" },
          { q: "The meeting has been rescheduled ------- 3 P.M.", choices: ["in","on","at","by"], answer: 2,
            kr: "시각 앞 at. at 3 P.M.", vocab: "reschedule 일정 변경하다" },
          { q: "The company has operated ------- more than 30 years.", choices: ["during","for","by","at"], answer: 1,
            kr: "기간 길이(30 years) → for. (during은 +명사사건)", vocab: "operate 운영하다" },
          { q: "Everyone attended the meeting ------- the regional manager.", choices: ["except for","because of","due to","in spite of"], answer: 0,
            kr: "제외 → except for(~을 제외하고).", vocab: "regional 지역의" }
        ]
      },
      /* ---------------- Unit 11 관계사 ---------------- */
      {
        id: "u11", no: "Unit 11", title: "관계사", subtitle: "Relative Clauses",
        notes: [
          { h: "관계대명사", items: [
            "사람 who(주격)/whom(목적격)/whose(소유격), 사물 which/whose, 사람·사물 that.",
            "뒤 문장에 빠진 성분(주어/목적어)으로 격 결정." ] },
          { h: "관계부사", items: [
            "where(장소), when(시간), why(이유), how(방법). 뒤에 완전한 문장.",
            "관계부사 = 전치사 + which로 바꿀 수 있다." ] },
          { h: "주의", items: [
            "what = the thing which (선행사 포함). 콤마(,) 뒤 that 불가.",
            "수량 + of + whom/which 구문." ] }
        ],
        questions: [
          { q: "The candidate ------- applied for the job has ten years of experience.", choices: ["who","whom","whose","which"], answer: 0,
            kr: "사람 선행사 + 뒤 주어 자리 빈칸 → 주격 who.", vocab: "candidate 지원자" },
          { q: "The building ------- houses our office was recently renovated.", choices: ["who","which","whose","where"], answer: 1,
            kr: "사물 선행사 + 주격 → which. (뒤 동사 houses의 주어)", vocab: "house ~을 수용하다" },
          { q: "She is the manager ------- team won the award.", choices: ["who","whom","whose","which"], answer: 2,
            kr: "뒤 명사 team과 연결되는 소유격 → whose.", vocab: "award 상" },
          { q: "This is the conference room ------- the meeting will be held.", choices: ["which","that","where","who"], answer: 2,
            kr: "장소 선행사 + 뒤 완전한 문장 → 관계부사 where.", vocab: "hold 개최하다" },
          { q: "------- the customer requested was a full refund.", choices: ["That","Which","What","Who"], answer: 2,
            kr: "선행사 없이 주어절을 이끔 = the thing which → What.", vocab: "refund 환불" },
          { q: "The employees ------- we interviewed were highly qualified.", choices: ["who","whom","whose","which"], answer: 1,
            kr: "사람 선행사 + 뒤 목적어 자리 빈칸(we interviewed ___) → 목적격 whom.", vocab: "qualified 자격을 갖춘" },
          { q: "2025 was the year ------- the company expanded overseas.", choices: ["which","that","when","where"], answer: 2,
            kr: "시간 선행사(year) + 완전한 문장 → 관계부사 when.", vocab: "expand overseas 해외로 확장하다" },
          { q: "The product, ------- was launched last year, sold out quickly.", choices: ["that","which","who","what"], answer: 1,
            kr: "콤마 뒤 + 사물 선행사 → which. (that 불가)", vocab: "launch 출시하다" },
          { q: "We hired three consultants, all of ------- have MBA degrees.", choices: ["who","which","whom","whose"], answer: 2,
            kr: "all of + 목적격(사람) → whom.", vocab: "degree 학위" },
          { q: "The report explains the reason ------- sales declined.", choices: ["which","where","why","what"], answer: 2,
            kr: "이유 선행사(reason) + 완전한 문장 → 관계부사 why.", vocab: "decline 감소하다" }
        ]
      },
      /* ---------------- Unit 12 가정법 ---------------- */
      {
        id: "u12", no: "Unit 12", title: "가정법", subtitle: "Subjunctive",
        notes: [
          { h: "가정법 과거 / 과거완료", items: [
            "현재 반대: If + 주어 + 과거동사(were), 주어 + would/could + 동사원형.",
            "과거 반대: If + had p.p., 주어 + would/could have p.p." ] },
          { h: "should / 요구·제안 동사", items: [
            "If 주절 미래 불확실: If + should + V → (should 생략 시 도치).",
            "require/request/suggest/recommend/insist + that + 주어 + (should) 동사원형." ] },
          { h: "without / but for", items: [
            "Without(~이 없다면) = If it were not for / If it had not been for.",
            "I wish + 가정법, as if + 가정법." ] }
        ],
        questions: [
          { q: "If the company ------- more staff, it could handle more orders.", choices: ["hires","hired","has hired","will hire"], answer: 1,
            kr: "가정법 과거. If + 과거동사(hired), 주절 could + 동사원형.", vocab: "handle 처리하다" },
          { q: "If we had invested earlier, we ------- a larger profit.", choices: ["make","made","would have made","will make"], answer: 2,
            kr: "가정법 과거완료. If had p.p., 주절 would have p.p.", vocab: "invest 투자하다" },
          { q: "The board recommended that the proposal ------- revised.", choices: ["is","be","was","being"], answer: 1,
            kr: "recommend that + 주어 + (should) 동사원형 → be.", vocab: "revise 수정하다" },
          { q: "------- the manager's help, the project would have failed.", choices: ["Without","Despite","Because","During"], answer: 0,
            kr: "Without(~이 없었다면) = If it had not been for. 가정법.", vocab: "fail 실패하다" },
          { q: "I wish I ------- more time to finish the report.", choices: ["have","had","will have","am having"], answer: 1,
            kr: "I wish + 가정법 과거(had). 현재 사실의 반대.", vocab: "finish 끝내다" },
          { q: "The client insisted that the contract ------- immediately.", choices: ["signs","is signed","be signed","signing"], answer: 2,
            kr: "insist that + (should) be p.p. → be signed.", vocab: "immediately 즉시" },
          { q: "If you ------- any questions, please feel free to ask.", choices: ["have","had","would have","having"], answer: 0,
            kr: "단순 조건(가정법 아님). 현재 사실 → have.", vocab: "feel free to 부담없이 ~하다" },
          { q: "------- the manager been informed, the error could have been avoided.", choices: ["If","Had","Were","Should"], answer: 1,
            kr: "If 생략 도치: Had + 주어 + p.p. (가정법 과거완료).", vocab: "avoid 피하다" },
          { q: "The new policy requires that every employee ------- a training session.", choices: ["attends","attend","attended","attending"], answer: 1,
            kr: "require that + (should) 동사원형 → attend.", vocab: "session 시간/과정" },
          { q: "If the shipment ------- on time, the customer would be satisfied.", choices: ["arrives","arrived","had arrived","will arrive"], answer: 1,
            kr: "가정법 과거. would be와 호응하는 If + 과거 arrived.", vocab: "on time 제때" }
        ]
      },
      /* ---------------- Unit 13 일치 ---------------- */
      {
        id: "u13", no: "Unit 13", title: "수의 일치", subtitle: "Subject-Verb Agreement",
        notes: [
          { h: "주어-동사 수일치", items: [
            "단수주어 → 단수동사(is/has/-s), 복수주어 → 복수동사(are/have).",
            "주어와 동사 사이 수식어(전치사구·관계절)에 현혹되지 말 것." ] },
          { h: "주의 주어", items: [
            "each/every/either/neither/one of + 단수동사.",
            "the number of(~의 수) 단수 / a number of(많은) 복수.",
            "부분표현(most/some/half/all of) + 명사에 동사 일치." ] },
          { h: "상관접속사 일치", items: [
            "either A or B / neither A nor B / not only A but also B → B에 동사 일치.",
            "both A and B → 복수동사." ] }
        ],
        questions: [
          { q: "The list of approved vendors ------- updated monthly.", choices: ["is","are","were","have"], answer: 0,
            kr: "주어는 The list(단수). of approved vendors는 수식어 → is.", vocab: "vendor 공급업체" },
          { q: "Each of the departments ------- its own budget.", choices: ["have","has","are","were"], answer: 1,
            kr: "each of + 단수동사 → has.", vocab: "department 부서" },
          { q: "A number of employees ------- requested flexible hours.", choices: ["has","have","is","was"], answer: 1,
            kr: "a number of(많은) + 복수동사 → have.", vocab: "flexible 유연한" },
          { q: "Neither the manager nor the employees ------- aware of the change.", choices: ["was","were","is","has"], answer: 1,
            kr: "neither A nor B는 B(employees, 복수)에 일치 → were.", vocab: "aware 알고 있는" },
          { q: "The number of complaints ------- decreased this year.", choices: ["have","has","were","are"], answer: 1,
            kr: "the number of(~의 수)는 단수 취급 → has.", vocab: "complaint 불만" },
          { q: "Most of the information ------- confidential.", choices: ["are","is","were","have"], answer: 1,
            kr: "most of + 불가산(information) → 단수 is.", vocab: "confidential 기밀의" },
          { q: "Both the CEO and the CFO ------- attending the summit.", choices: ["is","was","are","has"], answer: 2,
            kr: "both A and B → 복수동사 are.", vocab: "summit 정상회담" },
          { q: "The employees who work in this division ------- highly skilled.", choices: ["is","was","are","has"], answer: 2,
            kr: "주어 The employees(복수), who절은 수식 → are.", vocab: "division 부서" },
          { q: "Not only the staff but also the manager ------- satisfied.", choices: ["are","were","is","have"], answer: 2,
            kr: "not only A but also B → B(the manager, 단수)에 일치 → is.", vocab: "satisfied 만족한" },
          { q: "Every order placed before noon ------- shipped the same day.", choices: ["are","is","were","have"], answer: 1,
            kr: "every + 단수주어 → 단수동사 is. (placed before noon은 수식)", vocab: "place an order 주문하다" }
        ]
      }
    ]
  },

  /* ============================================================
     PART 7 독해
     ============================================================ */
  part7: {
    id: "p7",
    title: "PART 7 · 독해",
    desc: "문제 유형별 / 지문 유형별 연습",
    units: [
      /* ---------------- Unit 14 문제 유형별 연습 ---------------- */
      {
        id: "u14", no: "Unit 14", title: "문제 유형별 연습", subtitle: "Question Types",
        notes: [
          { h: "주제·목적 문제", items: [
            "What is the purpose of the ~? / Why was the letter written?",
            "주로 첫 문장·첫 단락에 단서. 'I am writing to ~', 'This is to inform you ~'." ] },
          { h: "세부사항(육하원칙)", items: [
            "Who/What/When/Where/How much 등. 질문의 키워드를 지문에서 스캔.",
            "True / NOT true 문제: 보기를 하나씩 지문과 대조." ] },
          { h: "추론·동의어·문장삽입", items: [
            "추론(infer/suggest/imply): 직접 언급 X, 단서로 추론.",
            "동의어: 해당 문맥에서의 의미로 선택. 문장삽입: 지시어·연결어 단서." ] }
        ],
        passages: [
          {
            kind: "이메일 · 주제/목적",
            title: "Re: Marketing Department Interview",
            passage:
              "<p><b>To:</b> James Anderson<br><b>From:</b> Jane Omalley, HR Manager<br><b>Subject:</b> Interview Follow-up<br><b>Date:</b> June 3</p>" +
              "<p>Dear Mr. Anderson,</p>" +
              "<p>It was a pleasure meeting you at the interview last Tuesday. I enjoyed our conversation about your previous projects and your ideas for improving customer engagement.</p>" +
              "<p>I would appreciate it if you could send me a copy of the portfolio you mentioned during the interview. Our hiring committee will make a final decision by the end of next week, and we will contact you as soon as the decision has been made.</p>" +
              "<p>Thank you again for your time and interest in the Marketing Department.</p>" +
              "<p>Sincerely,<br>Jane Omalley</p>",
            questions: [
              { q: "What is the main purpose of the e-mail?", choices: [
                  "To schedule a job interview","To follow up after an interview and request a document","To offer Mr. Anderson a position","To reject a job application"], answer: 1,
                kr: "면접 후 후속 연락이며 포트폴리오(서류)를 요청하고 있다. 두 번째 단락이 단서.", vocab: "follow-up 후속 / appreciate 감사하다" },
              { q: "What does Ms. Omalley ask Mr. Anderson to do?", choices: [
                  "Attend a second interview","Send a portfolio","Contact the hiring committee","Start work next week"], answer: 1,
                kr: "'send me a copy of the portfolio'에서 포트폴리오를 보내달라고 요청.", vocab: "portfolio 포트폴리오" },
              { q: "When will the decision be made?", choices: [
                  "By the end of this week","Next Tuesday","By the end of next week","Immediately"], answer: 2,
                kr: "'make a final decision by the end of next week'.", vocab: "decision 결정" }
            ]
          },
          {
            kind: "공지 · 세부사항/True-NOT true",
            title: "Office Renovation Notice",
            passage:
              "<p><b>NOTICE TO ALL STAFF</b></p>" +
              "<p>Please be advised that the third floor of the main building will undergo renovation from <b>July 10 to July 21</b>. During this period, the marketing and accounting teams will be temporarily relocated to the fifth floor.</p>" +
              "<p>The renovation will include new lighting, upgraded workstations, and a redesigned break room. The elevator service to the third floor will be suspended, but stairs will remain accessible.</p>" +
              "<p>We apologize for any inconvenience. For questions, please contact the Facilities Office at extension 4521.</p>",
            questions: [
              { q: "How long will the renovation last?", choices: [
                  "One week","About two weeks","One month","Three days"], answer: 1,
                kr: "July 10 ~ July 21, 약 2주.", vocab: "undergo 겪다 / renovation 개조" },
              { q: "What is NOT mentioned as part of the renovation?", choices: [
                  "New lighting","Upgraded workstations","A redesigned break room","A new parking lot"], answer: 3,
                kr: "조명·작업공간·휴게실은 언급, 주차장은 언급되지 않음(True/NOT true 문제).", vocab: "workstation 작업 공간" },
              { q: "What should staff do if they have questions?", choices: [
                  "Email the marketing team","Visit the fifth floor","Contact the Facilities Office","Use the elevator"], answer: 2,
                kr: "'contact the Facilities Office at extension 4521'.", vocab: "extension 내선번호" }
            ]
          }
        ]
      },
      /* ---------------- Unit 15 지문 유형별 연습 ---------------- */
      {
        id: "u15", no: "Unit 15", title: "지문 유형별 연습", subtitle: "Passage Types",
        notes: [
          { h: "광고(Advertisement)", items: [
            "제품·서비스·구인 광고. 대상·혜택·자격요건·연락방법이 단서.",
            "정가·할인·기간(only until~) 자주 출제." ] },
          { h: "송장·일정(Invoice/Schedule)", items: [
            "수량·단가·합계·세금·배송일 등 표 정보를 정확히 대조.",
            "일정표는 시간·장소·담당자 매칭." ] },
          { h: "이중·삼중 지문(Double/Triple)", items: [
            "두 지문을 연계해 푸는 '연계 문제'가 핵심. 한 지문 정보 + 다른 지문 정보 결합.",
            "이메일↔공지, 광고↔주문서 조합이 흔하다." ] }
        ],
        passages: [
          {
            kind: "광고(Advertisement)",
            title: "Greenfield Co-Working Space",
            passage:
              "<p><b>GREENFIELD CO-WORKING SPACE — Now Open!</b></p>" +
              "<p>Looking for a productive place to work? Greenfield offers fully furnished offices, high-speed internet, and 24-hour access in the heart of downtown.</p>" +
              "<p><b>Membership Plans:</b><br>• Daily Pass — $25/day<br>• Monthly (Hot Desk) — $200/month<br>• Monthly (Private Office) — $450/month</p>" +
              "<p>Sign up before <b>August 31</b> and receive your <b>first week free</b>! All members enjoy complimentary coffee and access to our meeting rooms.</p>" +
              "<p>Visit www.greenfieldspace.com or call (555) 102-3344 to book a tour.</p>",
            questions: [
              { q: "What is being advertised?", choices: [
                  "A coffee shop","A co-working office space","An internet provider","A real estate agency"], answer: 1,
                kr: "공유 오피스(co-working space) 광고.", vocab: "furnished 가구가 비치된" },
              { q: "How much is the monthly hot desk plan?", choices: [
                  "$25","$200","$450","Free"], answer: 1,
                kr: "Monthly (Hot Desk) — $200/month.", vocab: "hot desk 자유석" },
              { q: "What can new members receive before August 31?", choices: [
                  "A free private office","A free week","Free internet for a month","A discount on coffee"], answer: 1,
                kr: "'Sign up before August 31 and receive your first week free'.", vocab: "complimentary 무료의" }
            ]
          },
          {
            kind: "이중지문(Double Passage) · 연계",
            title: "Order Confirmation & Customer Inquiry",
            passage:
              "<p><b>[지문 1] Order Confirmation — Bright Office Supplies</b><br>" +
              "Order #4471 · Date: May 2<br>" +
              "Customer: Daniel Cho<br>" +
              "• Ergonomic Chair × 2 — $180 each<br>" +
              "• Standing Desk × 1 — $320<br>" +
              "Subtotal: $680 · Shipping: Free (orders over $500)<br>" +
              "Estimated delivery: May 9</p>" +
              "<hr>" +
              "<p><b>[지문 2] E-mail</b><br>" +
              "<b>To:</b> support@brightoffice.com<br><b>From:</b> Daniel Cho<br><b>Date:</b> May 10<br>" +
              "Hello, I received my order yesterday, but only one ergonomic chair was included instead of two. " +
              "The standing desk arrived in perfect condition. Could you please send the missing item as soon as possible? Thank you.</p>",
            questions: [
              { q: "What is the purpose of the e-mail?", choices: [
                  "To cancel an order","To report a missing item","To request a refund","To change a delivery address"], answer: 1,
                kr: "의자 2개 중 1개만 도착 → 누락 품목 보고.", vocab: "missing 누락된" },
              { q: "Which item did Mr. Cho receive correctly?", choices: [
                  "Both ergonomic chairs","The standing desk","Nothing","Two desks"], answer: 1,
                kr: "'The standing desk arrived in perfect condition'.", vocab: "condition 상태" },
              { q: "How much did Mr. Cho originally pay for the item that was missing one unit?", choices: [
                  "$180","$320","$360","$680"], answer: 2,
                kr: "연계 문제: 누락된 것은 의자(지문2). 지문1에서 의자는 $180×2 = $360.", vocab: "ergonomic 인체공학적인" }
            ]
          }
        ]
      },
      /* ---------------- Unit 16 책 원문 독해 (실전) ---------------- */
      {
        id: "u16", no: "Unit 16", title: "책 원문 독해 (실전)", subtitle: "Real Textbook Passages",
        notes: [
          { h: "이 유닛은?", items: [
            "<b>맨처음 토익 RC 교재의 실제 Part 7 지문</b>을 그대로 담았습니다.",
            "지문 이미지를 보고 문제를 푸세요. 이미지를 <b>탭하면 전체화면 확대</b>됩니다." ] },
          { h: "지문 유형", items: [
            "편지/이메일 · 공지/회람 · 광고 · 일정표 · 문자메시지/채팅 · 이중지문 · 삼중지문",
            "이중·삼중 지문은 <b>두 지문을 연결하는 '연계 문제'</b>가 핵심입니다." ] }
        ],
        passages: [
          {
            kind: "편지 & 이메일", title: "Max Office Supplies (편지)", image: "img/email.jpg",
            questions: [
              { q: "What is the main purpose of the letter?", choices: [
                  "To request a letter about a hiring decision","To apply for a new job","To confirm an interview time","To decline a job offer"], answer: 0,
                kr: "면접 후 채용 결정(hiring decision)을 알려주는 편지를 보내달라고 요청하고 있습니다.", vocab: "concerning ~에 관한 / hiring decision 채용 결정" },
              { q: "Who most likely wrote the letter?", choices: [
                  "A job applicant","The hiring manager","A regular customer","A delivery driver"], answer: 0,
                kr: "면접 소감을 전하고 채용 결과를 기다린다는 내용 → 글쓴이는 지원자입니다.", vocab: "applicant 지원자" }
            ]
          },
          {
            kind: "공지문 & 회람", title: "Promotion of Joe Endley (회람)", image: "img/memo.jpg",
            questions: [
              { q: "What is the purpose of the memo?", choices: [
                  "To announce a promotion","To schedule an annual meeting","To report quarterly sales","To introduce a new policy"], answer: 0,
                kr: "Joe Endley가 부사장(vice president)으로 승진했음을 알리는 회람입니다.", vocab: "promote 승진시키다 / announce 알리다" },
              { q: "How long has Mr. Endley worked for the company?", choices: [
                  "18 years","19 years","20 years","29 years"], answer: 0,
                kr: "'for the last 18 years' → 18년간 근무했습니다.", vocab: "vice president 부사장" }
            ]
          },
          {
            kind: "광고 (구인)", title: "Marketing Position — Sharon Manufacturing", image: "img/ad.jpg",
            questions: [
              { q: "What is NOT a requirement for the position?", choices: [
                  "A bachelor's degree","Three years of experience","Fluency in three languages","Good interpersonal skills"], answer: 2,
                kr: "자격요건: 학사학위, 마케팅 3년 경력, 대인관계 능력. '3개 국어 구사'는 언급되지 않았습니다.", vocab: "requirement 자격요건 / interpersonal 대인관계의" },
              { q: "How can an applicant apply for the job?", choices: [
                  "By visiting the office in person","By e-mailing a résumé and cover letter","By calling the manager directly","By faxing the documents"], answer: 1,
                kr: "'send your résumé and cover letter to appliances@sharon.com' → 이메일로 지원합니다.", vocab: "résumé 이력서 / cover letter 자기소개서" }
            ]
          },
          {
            kind: "일정표 (Schedule)", title: "Annual Company Banquet", image: "img/schedule.jpg",
            questions: [
              { q: "What time will the dinner begin?", choices: [
                  "5:00 P.M.","5:30 P.M.","6:30 P.M.","8:30 P.M."], answer: 2,
                kr: "표에서 Dinner는 6:30 P.M. – 8:30 P.M. → 저녁식사는 6:30에 시작합니다.", vocab: "banquet 연회" },
              { q: "What is scheduled at 6:00 P.M.?", choices: [
                  "Welcoming remarks","Dinner","An opening speech","The Employee of the Year presentation"], answer: 3,
                kr: "5:30–6:30은 'Employee of the Year' 시상 발표 시간 → 6:00에는 그 발표가 진행됩니다.", vocab: "presentation 발표, 수여식" }
            ]
          },
          {
            kind: "문자메시지 & 채팅", title: "Jim Turner & Neal Murphy", image: "img/chat.jpg",
            questions: [
              { q: "Why did Mr. Turner send the text message?", choices: [
                  "To ask for a favor","To apologize for a mistake","To schedule a meeting","To cancel a report"], answer: 0,
                kr: "실수로 지운 이메일을 대신 전달해 달라고 부탁 → 부탁(favor)을 하기 위해서입니다.", vocab: "favor 부탁 / forward 전달하다" },
              { q: "At 10:49 A.M., what does Mr. Turner mean when he writes, \"I owe you one\"?", choices: [
                  "He will pay Mr. Murphy money","He is grateful for Mr. Murphy's help","He wants to wait 15 minutes","He deleted the e-mail himself"], answer: 1,
                kr: "Murphy가 이메일을 전달해 주겠다고 하자 고마움을 표현한 것. 'I owe you one'=신세 졌다.", vocab: "owe 빚지다" }
            ]
          },
          {
            kind: "이중지문 (Double)", title: "Conference Agenda + E-mail", image: "img/double.jpg",
            questions: [
              { q: "Why did Mr. Somers write the e-mail?", choices: [
                  "To share information about a conference","To register Ms. Lee for a class","To thank Ms. Lee for a gift","To cancel a meeting"], answer: 0,
                kr: "Ms. Lee가 고등교육에 관심 있다고 해서, 관련 컨퍼런스 정보를 알려주려고 보낸 이메일입니다.", vocab: "conference 학회 / host 주최하다" },
              { q: "[연계] At what time will the presentation Ms. Lee is interested in take place?", choices: [
                  "11:00 A.M.","12:00 P.M.","1:00 P.M.","2:30 P.M."], answer: 3,
                kr: "연계 문제: 이메일에서 Ms. Lee는 'higher education'에 관심. 일정표에서 Higher Education 발표(Todd Clark)는 2:30 P.M.입니다.", vocab: "be interested in ~에 관심있다" },
              { q: "Who is the keynote speaker?", choices: [
                  "Martin Wilson","Ralph Harris","Todd Clark","Jack Somers"], answer: 0,
                kr: "일정표 11:00 A.M. Keynote Address 'Education Policy'의 발표자는 Martin Wilson입니다.", vocab: "keynote 기조연설" }
            ]
          },
          {
            kind: "삼중지문 (Triple)", title: "Leadership Classes + Registration E-mail", image: "img/triple.jpg",
            questions: [
              { q: "What is the purpose of Ms. Wong's e-mail?", choices: [
                  "To register for a class","To cancel a registration","To request a refund","To change a class time"], answer: 0,
                kr: "'I am writing this e-mail to register for your leadership class' → 강좌 등록을 위해 보낸 이메일입니다.", vocab: "register 등록하다" },
              { q: "Which class does Ms. Wong want to take?", choices: [
                  "Public Speaking","Communication Skills","Stress Management","Leadership Basics"], answer: 1,
                kr: "이메일에서 'the class called Communication Skills'를 신청했습니다.", vocab: "leadership 리더십" },
              { q: "[연계] How much will Ms. Wong pay for her class?", choices: [
                  "$25","$30","$40","$45"], answer: 2,
                kr: "연계 문제: 이메일에서 Communication Skills 신청 → 표에서 그 강좌 수강료는 $40입니다.", vocab: "cost 비용" }
            ]
          }
        ]
      }
    ]
  }
};

// 전역 노출
window.COURSE = COURSE;
