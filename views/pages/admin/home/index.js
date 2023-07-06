let mainNav = document.getElementById("mainNav");

let tempNavData = [{category: 'About'}, {category : '사료'}, {category : '간식'}, {category : '장난감'},{category : '모래/화장실'},]

// index
let mainNavLi = '';
for(let i = 0; i < tempNavData.length; i++) {
    mainNavLi += `<li><a href = '' class = "navMenus">${tempNavData[i].category}</a></li>`;
}

console.log(mainNavLi);
mainNav.innerHTML = `<ul>${mainNavLi}</ul>`;