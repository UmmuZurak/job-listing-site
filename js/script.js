let mainContainer = document.getElementById('mainContainer');
let filterContainer = document.getElementById('filterContainer');
let filterContent = document.getElementById('filterContent');

let tags = [
  {
    slug: 'role',
    text: ['Frontend', 'Fullstack', 'Backend'],
  },
  {
    slug: 'languages',
    text: ['HTML', 'CSS', 'JavaScript', 'Python'],
  },
  {
    slug: 'level',
    text: ['Senior', 'Midweight', 'Junior'],
  },
  {
    slug: 'tools',
    text: ['React', 'Sass', 'Ruby', 'RoR', 'Vue', 'Django'],
  },
];

async function getData() {
  try {
    const res = await fetch('data.json');

    const data = await res.json();
    console.table(data);
    //console.log(data);
    displayRoles(data);
    // filterRoles(data, tags);
  } catch (error) {
    console.log(error);
  }
}

getData();

function displayRoles(result) {
  let contentItems = document.getElementsByClassName('main-content-item');
  let newHeadlines = document.getElementsByClassName('headlines');
  let tagsContainer = document.getElementsByClassName('main-content-item-tags');

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

// function filterBtns() {
//   let tagBtns = document.getElementsByClassName('tags');

//   for (let m = 0; m < tagBtns.length; m++) {
//     tagBtns[m].addEventListener('click', function () {
//       displayFilterContainer(tagBtns[m]);
//       removeFilterItem();
//       clearFilterContainer();
//     });
//   }
// }

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
    });
  }
}

function clearFilterContainer() {
  let clear = document.getElementById('clear');
  clear.addEventListener('click', function () {
    filterContainer.style.display = 'none';
    filterContent.innerHTML = '';
  });
}

function filterRoles(data, tags) {
  let tagBtns = document.getElementsByClassName('tags');

  for (let m = 0; m < tagBtns.length; m++) {
    tagBtns[m].addEventListener('click', function () {
      displayFilterContainer(tagBtns[m]);
      removeFilterItem();
      clearFilterContainer();
      filter(data, tags, tagBtns[m]);
    });
  }
}

function filter(data, tags, tagBtn) {
  const result = [];
  for (let i = 0; i < tags.length; i++) {
    let word = tagBtn.innerHTML;
    if (tags[i].text.includes(word)) {
      for (let j = 0; j < data.length; j++) {
        if (data[j][tags[i].slug]) {
          if (Array.isArray(data[j][tags[i].slug])) {
            if (data[j][tags[i].slug].includes(word)) {
              result.push(data[j]);
              mainContainer.innerHTML = '';
              displayRoles(result);
            }
          } else {
            if (data[j][tags[i].slug] === word) {
              result.push(data[j]);
              mainContainer.innerHTML = '';
              displayRoles(result);
            }
          }
        }
      }
    }
  }
}

// function filter(data, tags) {
//   const result = [];
//   for (let i = 0; i < tags.length; i++) {
//     for (let j = 0; j < data.length; j++) {
//       if (data[j][tags[i].slug]) {
//         if (Array.isArray(data[j][tags[i].slug])) {
//           if (data[j][tags[i].slug].includes(tags[i].text)) {
//             result.push(data[j]);
//           }
//         } else {
//           if (data[j][tags[i].slug] == tags[i].text) {
//             result.push(data[j]);
//           }
//         }
//       }
//     }
//   }
//   mainContainer.innerHTML = '';
//   displayRoles(result);
// }
