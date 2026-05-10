window.addEventListener(
'DOMContentLoaded',
()=>{

  renderFeed(feedData);

});

// 체류시간 시작

const startTime = Date.now();

// 관심도 저장

const interest = {

  game:0,
  music:0,
  animal:0,
  exercise:0

};

// 카드 렌더링

function renderFeed(data){

  const feedContainer =
  document.getElementById(
    'feedContainer'
  );

  feedContainer.innerHTML = '';

  data.forEach(item => {

    feedContainer.innerHTML += `

      <div class="feed-card"
      data-type="${item.type}">

        <div class="algorithm-badge">
          추천 콘텐츠
        </div>

        <div class="thumbnail"

        style="
        background:${item.color};
        ">

        </div>

        <div class="feed-info">

          <h3>
            ${item.title}
          </h3>

          <p>
            ${item.tag}
          </p>

          <div class="feed-meta">

            <span class="likes">
              ❤️ ${item.likes}
            </span>

            <span>
              3시간 전
            </span>

          </div>

        </div>

      </div>

    `;

  });

}

// 카드 클릭 이벤트

document.addEventListener(
'click',
(event)=>{

  const card =
  event.target.closest('.feed-card');

  if(!card) return;

  const type =
  card.dataset.type;

  // 관심도 증가

  interest[type]++;

  // 피드 업데이트

  updateFeed();

  // 관심도 바 업데이트

  updateBars();

  // Bubble 생성

  createBubbleFeed(type);

});

// 추천 피드 업데이트

function updateFeed(){

  const sorted =
  Object.entries(interest)

  .sort((a,b)=>b[1]-a[1]);

  const topInterest =
  sorted[0][0];

  const newFeed = [];

  feedData.forEach(item => {

    // 가장 많이 선택한 콘텐츠 증가

    if(item.type === topInterest){

      newFeed.push(item);
      newFeed.push(item);
      newFeed.push(item);

    }

    newFeed.push(item);

  });

  renderFeed(newFeed);

}

// Bubble Feed 생성

function createBubbleFeed(type){

  const bubbleFeed =
  document.getElementById(
    'bubbleFeed'
  );

  bubbleFeed.innerHTML = '';

  const filtered =
  feedData.filter(
    item => item.type === type
  );

  for(let i = 0; i < 8; i++){

    const item =
    filtered[
      i % filtered.length
    ];

    bubbleFeed.innerHTML += `

      <div class="feed-card">

        <div class="thumbnail"

        style="
        background:${item.color};
        ">

        </div>

        <div class="feed-info">

          <h3>
            ${item.title}
          </h3>

          <p>

            반복 추천되는 콘텐츠

          </p>

          <div class="feed-meta">

            <span class="likes">
              ❤️ ${item.likes}
            </span>

            <span>

              추천 정확도 상승

            </span>

          </div>

        </div>

      </div>

    `;

  }

}

// 관심도 바 업데이트

function updateBars(){

  const total =

    interest.game +
    interest.music +
    interest.animal +
    interest.exercise;

  if(total === 0) return;

  document.getElementById(
    'gameFill'
  ).style.width =

  `${(interest.game / total) * 100}%`;

  document.getElementById(
    'musicFill'
  ).style.width =

  `${(interest.music / total) * 100}%`;

  document.getElementById(
    'animalFill'
  ).style.width =

  `${(interest.animal / total) * 100}%`;

  document.getElementById(
    'exerciseFill'
  ).style.width =

  `${(interest.exercise / total) * 100}%`;

}

// 피드 초기화

document.getElementById(
  'resetBtn'
).addEventListener(
'click',
()=>{

  interest.game = 0;
  interest.music = 0;
  interest.animal = 0;
  interest.exercise = 0;

  renderFeed(feedData);

  updateBars();

  document.getElementById(
    'bubbleFeed'
  ).innerHTML = '';

});

// 분석 페이지 이동

document.getElementById(
  'analyzeBtn'
).addEventListener(
'click',
()=>{

  // 관심 데이터 저장

  localStorage.setItem(

    'interestData',

    JSON.stringify(interest)

  );

  // 체류시간 계산

  const currentTime =
  Date.now();

  const staySeconds =
  Math.floor(
    (currentTime - startTime) / 1000
  );

  // 체류시간 저장

  localStorage.setItem(

    'stayTime',

    staySeconds

  );

  // 페이지 이동

  window.location.href =
  'analysis.html';

});