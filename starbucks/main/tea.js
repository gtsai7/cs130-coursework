
url =
"https://s3-us-west-2.amazonaws.com/s.cdpn.io/316753/starbucks.json";

makeCard = (product) => {
  //test
  let imageURL = product.assets.thumbnail.large.uri;
  if (!imageURL) {
    imageURL = product.assets.masterImage.uri;
  }
  let productNutrition = nutritionInfo[product.productNumber];
  let calories;
  if (productNutrition) {
    calories = productNutrition.calories;
  }
  else {
    calories = "No Data";
  }
  let sugar;
  if (productNutrition) {
    sugar = productNutrition.sugar;
  }
  else {
    sugar = "No Data";
  }
  let fat;
  if (productNutrition) {
    fat = productNutrition.fat;
  }
  else {
    fat = "No Data";
  }
  let ret = `
  <div class="card">
  <img src="${imageURL}" />
  <p>${product.name}</p>`;
  //ret +=` <p>${product.availability}</p>`
  for (const size in product.sizes)
  ret +=` <p>${product.sizes[size].sizeCode}</p>`
  ret +=` <p>calories: ${calories}</p>`
  ret +=` <p>sugar: ${sugar}</p>`
  ret +=` <p>fat: ${fat}</p>`

  ret +=` </div>`
  return ret;
};

showMerch = (data) => {
  let starbucksHTML = "";
  // there are 4 menus (Drinks, Food, "at Home Coffee", and "Shopping Bags")
  //for (const menu of data.menus) {

  // Index drinks then hot teas
  starbucksHTML += `<h2>${data.menus[0].name}</h2>`;
  // each menu has a sub-category
  // for (const item of data.menus[0].children) {
  starbucksHTML += `<h3>${data.menus[0].children[1].name}</h3>`;
  // each sub-category has a list of sub-items
  for (const subItem of data.menus[0].children[1].children) {
    starbucksHTML += ` <h4 class = "${subItem.name} ${data.menus[0].children[1].name}">${subItem.name}</h4> <section class="cards ${subItem.name} ${data.menus[0].children[1].name}">`;
    // each sub-item has variations
    for (const product of subItem.products) {
      // all of the product listings are inside of the sub-item's products list:
      starbucksHTML += makeCard(product);
    }
    starbucksHTML += `</section>`;
  }

  // Index drinks then iced teas
  starbucksHTML += `<h2>${data.menus[0].name}</h2>`;
  // each menu has a sub-category
  // for (const item of data.menus[0].children) {
  starbucksHTML += `<h3>${data.menus[0].children[5].name}</h3>`;
  // each sub-category has a list of sub-items
  for (const subItem of data.menus[0].children[5].children) {
    starbucksHTML += `<h4 class = "${subItem.name} ${data.menus[0].children[5].name}">${subItem.name}</h4><section class="cards ${subItem.name} ${data.menus[0].children[5].name}">`;
    // each sub-item has variations
    for (const product of subItem.products) {
      // all of the product listings are inside of the sub-item's products list:
      starbucksHTML += makeCard(product);
    }
    starbucksHTML += `</section>`;
  }

  // }
  // at the very end of your loop, attach the HTML to the DOM:
  document.querySelector("#results").innerHTML = starbucksHTML;
  // }
};

// code that actually does the fetch:
fetch("nutrition.json")
.then((response) => response.json())
.then(data => {
  nutritionInfo = data;
  fetch(url)
  .then((response) => response.json())
  .then(showMerch);
})

///////////////////// top bar ///////////////////////

drop = () => {
    document.querySelector('.drop').style.display = 'block';
    document.querySelector('.nav2 .fa-chevron-up').style.display = 'inline';
    document.querySelector('.nav2 .fa-chevron-down').style.display = 'none';
};

up = () => {
    document.querySelector('.drop').style.display = 'none';
    document.querySelector('.nav2 .fa-chevron-down').style.display = 'inline';
    document.querySelector('.nav2 .fa-chevron-up').style.display = 'none';
};

document.querySelector('.nav2 .fa-chevron-down').onclick = drop;
document.querySelector('.nav2 .fa-chevron-up').onclick = up;

////////////////// sidebar /////////////////////

drop2_1 = (ev) => {
    document.querySelector('.drop2.one').style.display = 'block';
    document.querySelector('#sidebar .fa-chevron-up.one').style.display = 'inline';
    document.querySelector('#sidebar .fa-chevron-down.one').style.display = 'none';
};

up2_1 = (ev) => {
    document.querySelector('.drop2.one').style.display = 'none';
    document.querySelector('#sidebar .fa-chevron-down.one').style.display = 'inline';
    document.querySelector('#sidebar .fa-chevron-up.one').style.display = 'none';
};

document.querySelector('#sidebar .fa-chevron-down.one').onclick = drop2_1;
document.querySelector('#sidebar .fa-chevron-up.one').onclick = up2_1;

drop2_2 = (ev) => {
    document.querySelector('.drop2.two').style.display = 'block';
    document.querySelector('#sidebar .fa-chevron-up.two').style.display = 'inline';
    document.querySelector('#sidebar .fa-chevron-down.two').style.display = 'none';
};

up2_2 = (ev) => {
    document.querySelector('.drop2.two').style.display = 'none';
    document.querySelector('#sidebar .fa-chevron-down.two').style.display = 'inline';
    document.querySelector('#sidebar .fa-chevron-up.two').style.display = 'none';
};

document.querySelector('#sidebar .fa-chevron-down.two').onclick = drop2_2;
document.querySelector('#sidebar .fa-chevron-up.two').onclick = up2_2;

// Function that filters stuff

var checkboxes = document.querySelectorAll('.checkbox');

filter = (ev) => {
  let checked = ev.target.checked;
  console.log(ev.target.value);
  console.log(document.querySelectorAll(ev.target.value));
  if (checked) {
    document.querySelectorAll(ev.target.value)[0].style.display = 'flex';
    document.querySelectorAll(ev.target.value)[1].style.display = 'flex';

  }
  else {
    document.querySelectorAll(ev.target.value)[0].style.display = 'none';
    document.querySelectorAll(ev.target.value)[1].style.display = 'none';
  }
  let num = 0;
  for (checkbox of checkboxes) {
    if (!checkbox.checked) {
      num++;
    }
  }
  if (num === checkboxes.length) {
    let headers = document.querySelectorAll('h3');
    console.log(headers);
    for (head of headers) {
      head.style.display = 'none';
    }
  }
  else {
    let headers = document.querySelectorAll('h3');
    for (head of headers) {
      head.style.display = 'flex';
    }
  }
};

for (checkbox of checkboxes) {
    checkbox.onclick = filter;
}
