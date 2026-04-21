document.addEventListener('DOMContentLoaded', function () {

  /* =====================================================
     0. 스타일 주입 (기존 CSS 파일 무수정 – 신규 추가만)
     ===================================================== */
  var st = document.createElement('style');
  st.textContent = [

    /* ── 서브메뉴 (class="submenu") ── */
    /* gnb a 포커스 outline 제거 → 검정 세로선 방지 */
    '.gnb a { outline: none; }',
    /* margin-left 기존 20px → 40px (first-child는 0 유지) */
    '.gnb li { position: relative; overflow: visible; margin-left: 40px !important; }',
    '.gnb li:nth-child(1) { margin-left: 0 !important; }',

    '.submenu {',
    '  display: none;',
    '  position: absolute;',
    '  top: 100%;',
    '  left: 50%;',
    '  transform: translateX(-50%);',
    '  width: 120px;',
    '  background: #fff;',
    '  list-style: none;',
    '  margin: 0;',
    '  padding: 0;',
    '  max-height: 0;',
    '  overflow: hidden;',
    '  z-index: 1000;',
    /* border 대신 box-shadow 사용 → 0높이일 때 세로선 렌더 방지 */
    '  box-shadow: 0 2px 8px rgba(0,0,0,0.12);',
    '  box-sizing: border-box;',
    '}',

    '.submenu li {',
    '  width: 120px;',
    '  margin: 0;',
    '  padding: 0;',
    '  border-bottom: 1px solid #ddd;',
    '  box-sizing: border-box;',
    '}',
    '.submenu li:last-child { border-bottom: none; }',

    '.submenu li a {',
    '  display: block;',
    '  width: 120px;',
    '  text-align: center;',
    '  font-size: 14px;',
    '  color: #333;',
    '  line-height: 40px;',
    '  padding: 0;',
    '  margin: 0;',
    '  outline: none;',
    '  box-sizing: border-box;',
    '}',
    '.submenu li a:hover { background: #f5f5f5; }',

    /* ── 메인광고 슬라이더 ── */
    '.ad_slider { overflow: hidden; width: 100%; }',

    '.ad_track {',
    '  display: flex;',
    '  width: 300%;',
    '  transition: transform 0.6s ease;',
    '}',

    '.ad_slide { width: 33.333%; flex-shrink: 0; }',
    '.ad_slide img { width: 100%; display: block; }',

    /* ── 상품 이미지 확대 (.img_box 래퍼 방식) ── */
    '.img_box {',
    '  overflow: hidden;',
    '  width: 100%;',
    '  display: block;',
    '}',
    '.img_box img {',
    '  width: 100%;',
    '  display: block;',
    '  transition: transform 0.5s ease;',
    '}',
    '.new_item li:hover .img_box img,',
    '.best_item li:hover .img_box img {',
    '  transform: scale(1.15);',
    '}',

    /* ── 모달 팝업 ── */
    '.modal_popup {',
    '  position: fixed;',
    '  top: 50%;',
    '  left: 20px;',
    '  transform: translateY(-50%);',
    '  z-index: 9999;',
    '  background: #fff;',
    '  width: 350px;',
    '  box-shadow: 0 4px 24px rgba(0,0,0,0.22);',
    '}',
    /* 이미지: 350×410 (버튼 40px 포함해 총 450px) */
    '.modal_popup img {',
    '  display: block;',
    '  width: 350px;',
    '  height: 410px;',
    '  object-fit: cover;',
    '}',

    '.modal_btns {',
    '  display: flex;',
    '  justify-content: space-between;',
    '  align-items: center;',
    '  padding: 10px 16px;',
    '  background: #f8f8f8;',
    '  border-top: 1px solid #ddd;',
    '}',
    '.modal_btns button {',
    '  padding: 8px 20px;',
    '  cursor: pointer;',
    '  border: 1px solid #ccc;',
    '  background: #fff;',
    '  font-size: 13px;',
    '  color: #333;',
    '}',
    '.modal_btns button:hover { background: #eee; }'

  ].join('\n');
  document.head.appendChild(st);


  /* =====================================================
     1. GNB 서브메뉴 – 각 li를 this로 구별하여 slideDown/Up
     ===================================================== */
  var menuData = [
    { subs: ['신상 원피스', '신상 상의', '신상 하의'] },
    { subs: ['블라우스', '니트', '티셔츠'] },
    { subs: ['팬츠', '스커트', '레깅스'] },
    { subs: ['코트', '재킷', '가디건'] },
    { subs: ['미니원피스', '미디원피스', '맥시원피스'] },
    { subs: ['토트백', '숄더백', '크로스백'] },
    { subs: ['스니커즈', '플랫슈즈', '샌들'] },
    { subs: ['목걸이', '귀걸이', '반지'] },
    { subs: ['10% 세일', '30% 세일', '50% 세일'] },
    { subs: ['공지사항', '이벤트', 'FAQ'] }
  ];

  /* ── slideDown / slideUp (0.5초, 타이머 충돌 방지) ── */
  function slideDown(el) {
    if (el._upTimer) { clearTimeout(el._upTimer); el._upTimer = null; }
    /* transition 없이 초기 상태(0) 확정 → border 잔상 방지 */
    el.style.transition = 'none';
    el.style.maxHeight  = '0px';
    el.style.overflow   = 'hidden';
    el.style.display    = 'block';
    var h = el.scrollHeight;
    /* 두 번의 rAF: 초기 렌더 반영 후 transition 켜고 높이 전환 */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        el.style.transition = 'max-height 0.5s ease';
        el.style.maxHeight  = h + 'px';
      });
    });
  }

  function slideUp(el) {
    el.style.overflow   = 'hidden';
    el.style.maxHeight  = el.scrollHeight + 'px';
    el.style.transition = 'max-height 0.5s ease';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        el.style.maxHeight = '0px';
      });
    });
    /* 애니메이션 종료 후 숨김 – 타이머 참조 보관 */
    el._upTimer = setTimeout(function () {
      el.style.display = 'none';
      el._upTimer = null;
    }, 500);
  }

  var gnbLis = document.querySelectorAll('.gnb li');
  gnbLis.forEach(function (li, i) {
    if (!menuData[i]) return;

    /* 서브메뉴 ul 생성 및 추가 */
    var subUl = document.createElement('ul');
    subUl.className = 'submenu';
    menuData[i].subs.forEach(function (name) {
      var subLi = document.createElement('li');
      var subA  = document.createElement('a');
      subA.href        = '#none';
      subA.textContent = name;
      subLi.appendChild(subA);
      subUl.appendChild(subLi);
    });
    li.appendChild(subUl);

    /*
     * mouseenter / mouseleave 사용
     * → 자식 요소 진입 시 재발화하지 않아 flicker 없음
     *   (mouseover/mouseout은 자식 요소 이동 때도 버블링되어 깜빡임 발생)
     */
    li.addEventListener('mouseenter', function () {
      var sub = this.querySelector('.submenu');
      if (sub) slideDown(sub);
    });
    li.addEventListener('mouseleave', function () {
      var sub = this.querySelector('.submenu');
      if (sub) slideUp(sub);
    });
  });


  /* =====================================================
     2. 메인광고 슬라이더 (ad1~ad3, 3초, 양방향)
     ===================================================== */
  var mainAd = document.querySelector('.main_ad');
  if (mainAd) {
    var adImgs = ['img/ad1.jfif', 'img/ad2.jpeg', 'img/ad3.jpeg'];

    /* 기존 img 태그를 슬라이더 구조로 교체 (JS DOM 조작) */
    mainAd.innerHTML =
      '<div class="ad_slider">' +
        '<div class="ad_track">' +
          adImgs.map(function (src) {
            return '<div class="ad_slide"><img src="' + src + '" alt="배너 이미지"></div>';
          }).join('') +
        '</div>' +
      '</div>';

    var adTrack = mainAd.querySelector('.ad_track');
    var adIdx   = 0;
    var adDir   = 1; /* 1 = 순방향, -1 = 역방향 */

    setInterval(function () {
      adIdx += adDir;
      if (adIdx >= adImgs.length - 1) adDir = -1;
      if (adIdx <= 0)                  adDir =  1;
      /* track 너비 = 300% → 슬라이드 1칸 = 100/3 % */
      adTrack.style.transform = 'translateX(-' + (adIdx * 100 / 3) + '%)';
    }, 3000);
  }


  /* =====================================================
     3. 콘텐츠 텍스트 업데이트 (메뉴명 / 신상품 / 베스트)
     ===================================================== */

  /* ── 메인 메뉴명 변경 ── */
  var menuNames = ['신상품','상의','하의','아우터','원피스','가방','신발','악세서리','세일','커뮤니티'];
  document.querySelectorAll('.gnb li').forEach(function (li, i) {
    if (!menuNames[i]) return;
    var h2  = li.querySelector('h2');
    if (!h2) return;
    var span = h2.querySelector('span');
    if (span) span.textContent = menuNames[i];
    else       h2.textContent  = menuNames[i];
  });

  /* ── 신상품 콘텐츠 ── */
  var newItems = [
    { name: '플로럴 미디 원피스',     desc: '봄·여름 시즌 화사한 플라워 패턴 미디 원피스',  price: '58,000원' },
    { name: '린넨 와이드 팬츠',       desc: '통기성 좋은 린넨 소재 루즈핏 여름 팬츠',        price: '42,000원' },
    { name: '스트라이프 크롭 티셔츠', desc: '데일리로 입기 좋은 줄무늬 크롭 반팔 티셔츠',    price: '35,000원' },
    { name: '레이스 트리밍 블라우스', desc: '섬세한 레이스 포인트의 여성스러운 블라우스',      price: '48,000원' },
    { name: '컬러블록 니트 조끼',     desc: '빈티지 감성의 배색 슬리브리스 니트 조끼',        price: '39,000원' }
  ];
  document.querySelectorAll('.new_item li').forEach(function (li, i) {
    if (!newItems[i]) return;
    var h4 = li.querySelector('h4'), p = li.querySelector('p'), sp = li.querySelector('span');
    if (h4) h4.textContent = newItems[i].name;
    if (p)  p.textContent  = newItems[i].desc;
    if (sp) sp.textContent = newItems[i].price;
  });

  /* ── 베스트 상품 콘텐츠 ── */
  var bestItems = [
    { name: '오버핏 체크 코트',      desc: '클래식 체크 패턴의 오버핏 울 혼방 롱 코트',       price: '128,000원' },
    { name: '하이웨이스트 슬림 팬츠', desc: '다리 라인을 길게 연출하는 하이웨이스트 슬림 팬츠', price: '55,000원'  },
    { name: '프릴 넥 블라우스',      desc: '로맨틱한 프릴 디테일이 돋보이는 여성 블라우스',    price: '45,000원'  },
    { name: 'A라인 데님 스커트',     desc: '클래식 데님 소재의 A라인 미디 스커트',             price: '52,000원'  },
    { name: '터틀넥 니트 스웨터',    desc: '포근하고 부드러운 루즈핏 터틀넥 니트',             price: '89,000원'  },
    { name: '플리츠 미니스커트',     desc: '사랑스러운 주름 플리츠 미니스커트',                price: '38,000원'  },
    { name: '기모 후드 집업',        desc: '두꺼운 기모 안감으로 따뜻한 후드 집업',             price: '65,000원'  },
    { name: '벨티드 트렌치코트',     desc: '허리 벨트 포인트의 클래식 봄·가을 트렌치코트',     price: '145,000원' },
    { name: '코튼 셔링 원피스',      desc: '편안한 코튼 소재의 셔링 디테일 미니 원피스',       price: '69,000원'  },
    { name: '리본 버킷백',           desc: '리본 포인트가 귀여운 데일리 버킷 숄더백',           price: '78,000원'  },
    { name: '스트링 크롭 티',        desc: '어깨 스트링 디테일의 시원한 크롭 반팔 티셔츠',     price: '29,000원'  },
    { name: '와이드 슬랙스',         desc: '편안하고 세련된 와이드 핏 오피스 슬랙스',           price: '62,000원'  },
    { name: '퍼프 소매 블라우스',    desc: '볼륨감 있는 퍼프 소매의 우아한 블라우스',           price: '47,000원'  },
    { name: '오버사이즈 맨투맨',     desc: '루즈하고 편안한 오버사이즈 스웨트셔츠',             price: '55,000원'  },
    { name: '뷔스티에 탑',           desc: '리본 포인트의 세련된 뷔스티에 크롭 탑',             price: '42,000원'  },
    { name: '캐시미어 롱 가디건',    desc: '고급 캐시미어 혼방 소재의 여유로운 롱 가디건',      price: '98,000원'  }
  ];
  document.querySelectorAll('.best_item li').forEach(function (li, i) {
    if (!bestItems[i]) return;
    var h4 = li.querySelector('h4'), p = li.querySelector('p'), sp = li.querySelector('span');
    if (h4) h4.textContent = bestItems[i].name;
    if (p)  p.textContent  = bestItems[i].desc;
    if (sp) sp.textContent = bestItems[i].price;
  });


  /* =====================================================
     4. 상품 이미지 img_box 래핑 (li 크기 유지, 이미지만 확대)
     ===================================================== */
  document.querySelectorAll('.new_item li img, .best_item li img')
    .forEach(function (img) {
      var box = document.createElement('div');
      box.className = 'img_box';
      img.parentNode.insertBefore(box, img);
      box.appendChild(img);
    });


  /* =====================================================
     4. 상품 클릭 → 상세페이지 이동
     ===================================================== */
  document.querySelectorAll('.new_item li').forEach(function (li, i) {
    li.style.cursor = 'pointer';
    li.addEventListener('click', function (e) {
      e.preventDefault();
      location.href = 'detail.html?type=new&idx=' + i;
    });
  });

  document.querySelectorAll('.best_item li').forEach(function (li, i) {
    li.style.cursor = 'pointer';
    li.addEventListener('click', function (e) {
      e.preventDefault();
      location.href = 'detail.html?type=best&idx=' + i;
    });
  });


  /* =====================================================
     5. 모달 팝업 (오늘 보지 않기 – localStorage)
     ===================================================== */
  var TODAY = new Date().toDateString();
  if (localStorage.getItem('noModal') !== TODAY) {
    var modal = document.createElement('div');
    modal.className = 'modal_popup';
    modal.innerHTML =
      '<img src="img/modal.jpeg" alt="팝업 이미지">' +
      '<div class="modal_btns">' +
        '<button id="btn_no_today">오늘 보지 않기</button>' +
        '<button id="btn_close">닫기</button>' +
      '</div>';
    document.body.appendChild(modal);

    document.getElementById('btn_close').addEventListener('click', function () {
      modal.style.display = 'none';
    });
    document.getElementById('btn_no_today').addEventListener('click', function () {
      localStorage.setItem('noModal', TODAY);
      modal.style.display = 'none';
    });
  }

});
