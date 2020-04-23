let mainContainer = document.getElementById('mainContainer');

async function getData() {
  try {
    const res = await fetch('data.json');

    const data = await res.json();

    displayRoles(data);
    displayNew(data);
    console.table(data);
  } catch (error) {
    console.log(error);
  }
}

getData();

function displayRoles(result) {
  mainContainer.innerHTML = '';

  for (let i = 0; i < result.length; i++) {
    mainContainer.innerHTML += `
        <div class="main-content-item">
          <div class="main-content-item-role">
            <div class="main-content-item-text">
              <div class="content-image">
                <img src="${result[i].logo}" alt="company-logo" />
              </div>
              <div class="content-text">
                <div class="headlines">
                  <h4 class="headline-name">${result[i].company}</h4>
                </div>
                <div class="role"><h3>${result[i].position}</h3></div>
                <div class="details">
                  <p>${result[i].postedAt}</p>
                  <span>.</span>
                  <p>${result[i].contract}</p>
                  <span>.</span>
                  <p>${result[i].location}</p>
                </div>
              </div>
            </div>
            <div class="main-content-item-tags">
              <button class="tags">${result[i].role}</button>
              <button class="tags">${result[i].level}</button>
            </div>
          </div>
        </div>
        `;
  }
}

function displayNew(response) {
  let newHeadlines = document.getElementsByClassName('headlines');
  console.log(newHeadlines);

  for (let j = 0; j < newHeadlines.length; j++) {
    for (let k = 0; k < response.length; k++) {
      if (response[k].new === true) {
        newHeadlines[j] += `
            <h4 class="headline-new">NEW!</h4>
            `;
      }
    }
  }
}
