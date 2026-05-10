const feedContainer =
document.getElementById(
  'feedContainer'
);

function renderFeed(){

  feedContainer.innerHTML = '';

  feedData.forEach(item => {

    feedContainer.innerHTML += `

      <div class="feed-card"
      data-type="${item.type}">

        <div class="thumbnail"></div>

        <div class="feed-info">

          <h3>${item.title}</h3>

          <p>${item.tag}</p>

          <span>
            ❤️ ${item.likes}
          </span>

        </div>

      </div>

    `;

  });

}