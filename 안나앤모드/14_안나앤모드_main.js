document.addEventListener('DOMContentLoaded', function () {

  /*================================================
    유틸 함수: slideDown / slideUp (vanilla JS)
  ================================================*/
  function slideDown(el, duration) {
    el.style.display = 'block';
    el.style.overflow = 'hidden';
    var targetHeight = el.scrollHeight;
    el.style.maxHeight = '0px';
    el.style.transition = 'max-height ' + (duration || 250) + 'ms ease';
    el.getBoundingClientRect(); // 강제 리플로우
    el.style.maxHeight = targetHeight + 'px';
  }

  function slideUp(el, duration) {
    el.style.overflow = 'hidden';
    el.style.maxHeight = el.scrollHeight + 'px';
    el.style.transition = 'max-height ' + (duration || 250) + 'ms ease';
    el.getBoundingClientRect(); // 강제 리플로우
    el.style.maxHeight = '0px';
    function onEnd() {
      el.style.display = 'none';
      el.removeEventListener('transitionend', onEnd);
    }
    el.addEventListener('transitionend', onEnd);
  }

  /*================================================
    0. JS로 추가 스타일 주입
  ================================================*/
  var style = document.createElement('style');
  style.textContent = [
    /* 서브메뉴 */
    '.gnb li { position: relative; }',
    '.sub_menu {',
    '  display: none;',
    '  position: absolute;',
    '  top: 100%;',
    '  left: 50%;',
    '  transform: translateX(-50%);',
    '  width: 100px;',
    '  background: #fff;',
    '  z-index: 999;',
    '  list-style: none;',
    '  margin: 0;',
    '  padding: 0;',
    '  overflow: hidden;',
    '  border: 1px solid #ddd;',
    '}',
    '.sub_menu li a {',
    '  display: block;',
    '  line-height: 40px;',
    '  text-align: center;',
    '  font-size: 12px;',
    '  color: #333;',
    '  border-bottom: 1px solid #ddd;',
    '}',
    '.sub_menu li:last-child a { border-bottom: none; }',
    '.sub_menu li a:hover { background: #f9f9f9; color: #333; }',

    /* 배너 슬라이더 */
    '.banner_slider {',
    '  width: 100%;',
    '  height: 500px;',
    '  overflow: hidden;',
    '  position: relative;',
    '}',
    '.banner_track {',
    '  display: flex;',
    '  width: 500%;',
    '  height: 100%;',
    '  transition: transform 0.8s ease;',
    '}',
    '.banner_slide {',
    '  width: 20%;',
    '  height: 100%;',
    '  display: flex;',
    '  flex-direction: column;',
    '  align-items: center;',
    '  justify-content: center;',
    '  text-align: center;',
    '}',
    '.banner_slide .b_title {',
    '  font-size: 52px;',
    '  font-weight: 700;',
    '  letter-spacing: 4px;',
    '  line-height: 1.25;',
    '  margin-bottom: 20px;',
    '}',
    '.banner_slide .b_sub {',
    '  font-size: 17px;',
    '  font-weight: 300;',
    '  letter-spacing: 1px;',
    '  margin-bottom: 36px;',
    '  line-height: 1.6;',
    '}',
    '.banner_slide .b_btn {',
    '  display: inline-block;',
    '  padding: 13px 38px;',
    '  border: 2px solid currentColor;',
    '  font-size: 13px;',
    '  font-weight: 600;',
    '  letter-spacing: 3px;',
    '  cursor: pointer;',
    '}',

    /* 상품 이미지 hover 확대 */
    '.new_item li, .best_item li { overflow: hidden; }',
    '.new_item li img, .best_item li img {',
    '  display: block;',
    '  transition: transform 2s ease;',
    '  transform: scale(1);',
    '}',
    '.new_item li:hover img, .best_item li:hover img {',
    '  transform: scale(1.5);',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  /*================================================
    1. 메뉴명 변경 및 서브메뉴 생성
  ================================================*/
  var menuData = [
    { name: '신상품',   sub: ['원피스', '블라우스', '티셔츠'] },
    { name: '상의',     sub: ['니트', '후드티', '맨투맨', '셔츠'] },
    { name: '하의',     sub: ['팬츠', '스커트', '데님', '레깅스'] },
    { name: '아우터',   sub: ['코트', '재킷', '가디건', '패딩'] },
    { name: '원피스',   sub: ['미니원피스', '미디원피스', '맥시원피스', '셔츠원피스'] },
    { name: '가방',     sub: ['토트백', '숄더백', '크로스백'] },
    { name: '신발',     sub: ['스니커즈', '플랫슈즈', '샌들', '부츠'] },
    { name: '악세서리', sub: ['목걸이', '귀걸이', '반지'] },
    { name: '세일',     sub: ['10% 세일', '30% 세일', '50% 세일', '기획전'] },
    { name: '커뮤니티', sub: ['공지사항', '이벤트', '코디샵', 'FAQ'] }
  ];

  var gnbLis = document.querySelectorAll('.gnb li');
  gnbLis.forEach(function (li, i) {
    if (!menuData[i]) return;

    // 메뉴명 변경 (span 내부가 있을 수도 있어서 양쪽 처리)
    var h2 = li.querySelector('h2');
    if (h2) {
      var span = h2.querySelector('span');
      if (span) {
        span.textContent = menuData[i].name;
      } else {
        h2.textContent = menuData[i].name;
      }
    }

    // 서브메뉴 ul 생성
    var subUl = document.createElement('ul');
    subUl.className = 'sub_menu';

    menuData[i].sub.forEach(function (name) {
      var subLi = document.createElement('li');
      var subA  = document.createElement('a');
      subA.href        = '#none';
      subA.textContent = name;
      subLi.appendChild(subA);
      subUl.appendChild(subLi);
    });

    li.appendChild(subUl);

    // mouseover → slideDown
    li.addEventListener('mouseover', function () {
      slideDown(subUl, 250);
    });
    // mouseout → slideUp
    li.addEventListener('mouseout', function () {
      slideUp(subUl, 250);
    });
  });

  /*================================================
    2. 메인 배너 자동 슬라이더 (5장, 3초 간격)
  ================================================*/
  var bannerData = [
    {
      bg: '#f0e8df',
      color: '#3a2a1e',
      title: 'NEW SPRING<br>COLLECTION',
      sub: '설레는 봄, 새로운 시작을 알리는 컬렉션',
      btn: 'SHOP NOW'
    },
    {
      bg: '#e6d8ef',
      color: '#38205a',
      title: 'SUMMER<br>BREEZE',
      sub: '시원하고 가벼운 여름 패션 라인업',
      btn: 'VIEW MORE'
    },
    {
      bg: '#d8eaf5',
      color: '#1a3a50',
      title: 'BEST<br>SELLER',
      sub: '지금 가장 많이 사랑받는 베스트 아이템',
      btn: 'BEST PICK'
    },
    {
      bg: '#f5d8d8',
      color: '#4a1818',
      title: 'SPECIAL<br>SALE',
      sub: '최대 50% 특별 할인 이벤트 진행 중',
      btn: 'SALE NOW'
    },
    {
      bg: '#d8f0e6',
      color: '#1a4a30',
      title: 'NEW<br>ARRIVAL',
      sub: '매일 새롭게 업데이트되는 신상품을 만나보세요',
      btn: 'NEW IN'
    }
  ];

  var mainAd = document.querySelector('.main_ad');
  if (mainAd) {
    mainAd.innerHTML = '';

    var slider = document.createElement('div');
    slider.className = 'banner_slider';

    var track = document.createElement('div');
    track.className = 'banner_track';

    bannerData.forEach(function (data) {
      var slide = document.createElement('div');
      slide.className = 'banner_slide';
      slide.style.backgroundColor = data.bg;
      slide.style.color = data.color;
      slide.innerHTML =
        '<div class="b_title">' + data.title + '</div>' +
        '<div class="b_sub">' + data.sub + '</div>' +
        '<div class="b_btn">' + data.btn + '</div>';
      track.appendChild(slide);
    });

    slider.appendChild(track);
    mainAd.appendChild(slider);

    // 3초마다 자동 슬라이드
    var currentSlide = 0;
    var totalSlides  = bannerData.length;

    setInterval(function () {
      currentSlide = (currentSlide + 1) % totalSlides;
      // track 너비가 500%이므로 슬라이드 하나 = 20% 이동
      track.style.transform = 'translateX(-' + (currentSlide * 20) + '%)';
    }, 3000);
  }

  /*================================================
    3. 상품 내용 변경
  ================================================*/

  // 신상품 (5개)
  var newItems = [
    { title: '플로럴 미디 원피스',    desc: '화사한 꽃무늬가 돋보이는 봄 원피스',      price: '58,000원' },
    { title: '린넨 와이드 팬츠',      desc: '시원한 린넨 소재의 루즈핏 여름 바지',     price: '42,000원' },
    { title: '스트라이프 크롭 셔츠',  desc: '캐주얼 줄무늬 크롭 반팔 셔츠',          price: '35,000원' },
    { title: '레이스 트리밍 블라우스',desc: '여성스러운 레이스 포인트 블라우스',       price: '48,000원' },
    { title: '컬러블록 니트 조끼',    desc: '빈티지 감성의 배색 슬리브리스 니트',     price: '39,000원' }
  ];

  var newLis = document.querySelectorAll('.new_item li');
  newLis.forEach(function (li, i) {
    if (!newItems[i]) return;
    var h4   = li.querySelector('h4');
    var p    = li.querySelector('p');
    var span = li.querySelector('span');
    if (h4)   h4.textContent   = newItems[i].title;
    if (p)    p.textContent    = newItems[i].desc;
    if (span) span.textContent = newItems[i].price;
  });

  // 베스트 상품 (16개)
  var bestItems = [
    { title: '오버사이즈 체크 코트',    desc: '클래식 체크 패턴의 루즈핏 롱 코트',          price: '128,000원' },
    { title: '슬림 하이웨이스트 팬츠',  desc: '날씬해 보이는 하이웨이스트 슬림 팬츠',       price: '55,000원' },
    { title: '프릴 넥 블라우스',        desc: '로맨틱한 프릴 장식의 여성 블라우스',         price: '45,000원' },
    { title: '데님 미디 스커트',        desc: '클래식 데님 소재의 A라인 미디 스커트',       price: '52,000원' },
    { title: '캐시미어 터틀넥 니트',    desc: '부드러운 캐시미어 혼방 터틀넥 니트',         price: '89,000원' },
    { title: '플리티드 미니스커트',     desc: '여성스러운 주름 장식 미니 스커트',           price: '38,000원' },
    { title: '기모 후드 집업',          desc: '캐주얼 무드의 두꺼운 기모 후드 집업',        price: '65,000원' },
    { title: '벨트 트렌치코트',         desc: '허리 벨트 포인트의 클래식 트렌치코트',       price: '145,000원' },
    { title: '코튼 셔링 원피스',        desc: '편안한 코튼 소재의 셔링 디테일 원피스',      price: '69,000원' },
    { title: '미니 레더 숄더백',        desc: '심플한 디자인의 미니 레더 숄더백',           price: '78,000원' },
    { title: '글로시 스트랩 힐',        desc: '파티룩에 어울리는 글로시 스트랩 힐',         price: '83,000원' },
    { title: '골드 체인 목걸이',        desc: '데일리로 착용하기 좋은 골드 체인 목걸이',    price: '29,000원' },
    { title: '스트라이프 베이직 티',    desc: '어디에나 잘 어울리는 베이직 스트라이프 티',  price: '25,000원' },
    { title: '퀼팅 숏 패딩',            desc: '가볍고 따뜻한 퀼팅 소재의 숏 패딩',         price: '98,000원' },
    { title: '조거 트레이닝 팬츠',      desc: '활동적이고 편안한 조거 스타일 팬츠',         price: '47,000원' },
    { title: '새틴 슬립 원피스',        desc: '고급스러운 새틴 소재의 미디 슬립 원피스',    price: '75,000원' }
  ];

  var bestLis = document.querySelectorAll('.best_item li');
  bestLis.forEach(function (li, i) {
    if (!bestItems[i]) return;
    var h4   = li.querySelector('h4');
    var p    = li.querySelector('p');
    var span = li.querySelector('span');
    if (h4)   h4.textContent   = bestItems[i].title;
    if (p)    p.textContent    = bestItems[i].desc;
    if (span) span.textContent = bestItems[i].price;
  });

});
