document.addEventListener('DOMContentLoaded', function () {

  /* =====================================================
     0. 스타일 주입 (기존 CSS 파일 무수정 – 신규 추가만)
     ===================================================== */
  var st = document.createElement('style');
  st.textContent = [

    /* ── 서브메뉴 (class="submenu") ── */
    '.gnb li { position: relative; }',

    '.submenu {',
    '  display: none;',
    '  position: absolute;',
    '  top: 100%;',
    '  left: 50%;',                      /* li 중앙 기준 */
    '  transform: translateX(-50%);',    /* 서브메뉴 중앙 정렬 */
    '  width: 150px;',
    '  background: #fff;',
    '  list-style: none;',
    '  margin: 0;',
    '  padding: 0;',
    '  max-height: 0;',
    '  overflow: hidden;',
    '  z-index: 1000;',
    '  border: 1px solid #ddd;',
    '  box-sizing: border-box;',
    '}',

    '.submenu li {',
    '  width: 150px;',
    '  margin: 0;',
    '  padding: 0;',
    '  border-bottom: 1px solid #ddd;',
    '  box-sizing: border-box;',
    '}',
    '.submenu li:last-child { border-bottom: none; }',

    '.submenu li a {',
    '  display: block;',
    '  width: 150px;',
    '  text-align: center;',
    '  font-size: 14px;',
    '  color: #333;',
    '  line-height: 40px;',
    '  padding: 0;',
    '  margin: 0;',
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
    /* 진행 중인 slideUp 타이머 취소 */
    if (el._upTimer) { clearTimeout(el._upTimer); el._upTimer = null; }
    el.style.display    = 'block';
    el.style.overflow   = 'hidden';
    el.style.transition = 'max-height 0.5s ease';
    var h = el.scrollHeight;
    /* 두 번의 rAF로 display:block 반영 후 높이 전환 */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        el.style.maxHeight = h + 'px';
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
     3. 상품 이미지 img_box 래핑 (li 크기 유지, 이미지만 확대)
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
