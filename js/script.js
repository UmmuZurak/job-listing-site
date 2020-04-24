let mainContainer = document.getElementById('mainContainer');
let filterContainer = document.getElementById('filterContainer');
let filterContent = document.getElementById('filterContent');

async function getData() {
  try {
    const res = await fetch('data.json');

    const data = await res.json();

    displayRoles(data);
    filterRoles();
  } catch (error) {
    console.log(error);
  }
}

getData();

function displayRoles(result) {
  let contentItems = document.getElementsByClassName('main-content-item');
  let newHeadlines = document.getElementsByClassName('headlines');
  let tagsContainer = document.getElementsByClassName('main-content-item-tags');
  //mainContainer.innerHTML = '';

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

    if (result[i].new === true) {
      newHeadlines[i].innerHTML += `
      <h4 class="headline-new">NEW!</h4>
      `;
    }

    if (result[i].featured === true) {
      newHeadlines[i].innerHTML += `
      <h4 class="headline-featured">FEATURED</h4>
      `;

      contentItems[i].classList.add('featured');
    }

    if (result[i].hasOwnProperty('languages')) {
      let languages = result[i].languages;
      for (let j = 0; j < languages.length; j++) {
        tagsContainer[i].innerHTML += `
        <button class="tags">${languages[j]}</button>
        `;
      }
    }

    if (result[i].hasOwnProperty('tools')) {
      let tools = result[i].tools;
      for (let k = 0; k < tools.length; k++) {
        tagsContainer[i].innerHTML += `
        <button class="tags">${tools[k]}</button>
        `;
      }
    }
  }
}

function filterRoles() {
  let tagBtns = document.getElementsByClassName('tags');
  let filteredRoles = mainContainer.getElementsByClassName('main-content-item');

  for (let m = 0; m < tagBtns.length; m++) {
    tagBtns[m].addEventListener('click', function () {
      console.log('clicked');
      displayFilterContainer(tagBtns[m]);
      removeFilterItem();
      clearFilterContainer();
    });
  }
}

function displayFilterContainer(tag) {
  filterContainer.style.display = 'block';
  filterContent.innerHTML += `
        <div class="filter-item">
          <span>${tag.innerHTML}</span><button class="filter-btn">X</button>
        </div>
      `;
}

function removeFilterItem() {
  let filterBtns = document.getElementsByClassName('filter-btn');
  for (let n = 0; n < filterBtns.length; n++) {
    filterBtns[n].addEventListener('click', function () {
      filterBtns[n].parentElement.remove();
      // if (filterContent.innerHTML === '') {
      //   filterContainer.style.display = 'none';
      // }
    });
  }
}

function clearFilterContainer() {
  let clear = document.getElementById('clear');
  clear.addEventListener('click', function () {
    filterContent.innerHTML = '';
    filterContainer.style.display = 'none';
  });
}
