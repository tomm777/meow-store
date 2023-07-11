async function getProductsList() {
  const response = await fetch('/api/products');
  const jsonData = await response.json();
  console.log(jsonData);
}

getProductsList();

const items = [
  {
    _id: 'item1',
    name: '아이템 1',
    repImgUrl: 'https://dummyimage.com/200x200/000000/fff',
    summary: '이 아이템은 아이템 1입니다.',
  },
  {
    _id: 'item2',
    name: '아이템 2',
    repImgUrl: 'https://dummyimage.com/200x200/ff0000/fff',
    summary: '이 아이템은 아이템 2입니다.',
  },
  {
    _id: 'item3',
    name: '아이템 3',
    repImgUrl: 'https://dummyimage.com/200x200/00ff00/fff',
    summary: '이 아이템은 아이템 3입니다.',
  },
  // 아이템 4부터 15까지 추가
  {
    _id: 'item4',
    name: '아이템 4',
    repImgUrl: 'https://dummyimage.com/200x200/0000ff/fff',
    summary: '이 아이템은 아이템 4입니다.',
  },
  {
    _id: 'item5',
    name: '아이템 5',
    repImgUrl: 'https://dummyimage.com/200x200/ff00ff/fff',
    summary: '이 아이템은 아이템 5입니다.',
  },
  {
    _id: 'item6',
    name: '아이템 6',
    repImgUrl: 'https://dummyimage.com/200x200/ffff00/fff',
    summary: '이 아이템은 아이템 6입니다.',
  },
  {
    _id: 'item7',
    name: '아이템 7',
    repImgUrl: 'https://dummyimage.com/200x200/00ffff/fff',
    summary: '이 아이템은 아이템 7입니다.',
  },
  {
    _id: 'item8',
    name: '아이템 8',
    repImgUrl: 'https://dummyimage.com/200x200/ff6600/fff',
    summary: '이 아이템은 아이템 8입니다.',
  },
  {
    _id: 'item9',
    name: '아이템 9',
    repImgUrl: 'https://dummyimage.com/200x200/6600ff/fff',
    summary: '이 아이템은 아이템 9입니다.',
  },
  {
    _id: 'item10',
    name: '아이템 10',
    repImgUrl: 'https://dummyimage.com/200x200/990000/fff',
    summary: '이 아이템은 아이템 10입니다.',
  },
  {
    _id: 'item11',
    name: '아이템 11',
    repImgUrl: 'https://dummyimage.com/200x200/009900/fff',
    summary: '이 아이템은 아이템 11입니다.',
  },
  {
    _id: 'item12',
    name: '아이템 12',
    repImgUrl: 'https://dummyimage.com/200x200/000099/fff',
    summary: '이 아이템은 아이템 12입니다.',
  },
  {
    _id: 'item13',
    name: '아이템 13',
    repImgUrl: 'https://dummyimage.com/200x200/999900/fff',
    summary: '이 아이템은 아이템 13입니다.',
  },
  {
    _id: 'item14',
    name: '아이템 14',
    repImgUrl: 'https://dummyimage.com/200x200/009999/fff',
    summary: '이 아이템은 아이템 14입니다.',
  },
  {
    _id: 'item15',
    name: '아이템 15',
    repImgUrl: 'https://dummyimage.com/200x200/990099/fff',
    summary: '이 아이템은 아이템 15입니다.',
  },
  {
    _id: 'item1',
    name: '아이템 1',
    repImgUrl: 'https://dummyimage.com/200x200/000000/fff',
    summary: '이 아이템은 아이템 1입니다.',
  },
  {
    _id: 'item2',
    name: '아이템 2',
    repImgUrl: 'https://dummyimage.com/200x200/ff0000/fff',
    summary: '이 아이템은 아이템 2입니다.',
  },
  {
    _id: 'item3',
    name: '아이템 3',
    repImgUrl: 'https://dummyimage.com/200x200/00ff00/fff',
    summary: '이 아이템은 아이템 3입니다.',
  },
  // 아이템 4부터 15까지 추가
  {
    _id: 'item4',
    name: '아이템 4',
    repImgUrl: 'https://dummyimage.com/200x200/0000ff/fff',
    summary: '이 아이템은 아이템 4입니다.',
  },
  {
    _id: 'item5',
    name: '아이템 5',
    repImgUrl: 'https://dummyimage.com/200x200/ff00ff/fff',
    summary: '이 아이템은 아이템 5입니다.',
  },
  {
    _id: 'item6',
    name: '아이템 6',
    repImgUrl: 'https://dummyimage.com/200x200/ffff00/fff',
    summary: '이 아이템은 아이템 6입니다.',
  },
  {
    _id: 'item7',
    name: '아이템 7',
    repImgUrl: 'https://dummyimage.com/200x200/00ffff/fff',
    summary: '이 아이템은 아이템 7입니다.',
  },
  {
    _id: 'item8',
    name: '아이템 8',
    repImgUrl: 'https://dummyimage.com/200x200/ff6600/fff',
    summary: '이 아이템은 아이템 8입니다.',
  },
  {
    _id: 'item9',
    name: '아이템 9',
    repImgUrl: 'https://dummyimage.com/200x200/6600ff/fff',
    summary: '이 아이템은 아이템 9입니다.',
  },
  {
    _id: 'item10',
    name: '아이템 10',
    repImgUrl: 'https://dummyimage.com/200x200/990000/fff',
    summary: '이 아이템은 아이템 10입니다.',
  },
  {
    _id: 'item11',
    name: '아이템 11',
    repImgUrl: 'https://dummyimage.com/200x200/009900/fff',
    summary: '이 아이템은 아이템 11입니다.',
  },
  {
    _id: 'item12',
    name: '아이템 12',
    repImgUrl: 'https://dummyimage.com/200x200/000099/fff',
    summary: '이 아이템은 아이템 12입니다.',
  },
  {
    _id: 'item13',
    name: '아이템 13',
    repImgUrl: 'https://dummyimage.com/200x200/999900/fff',
    summary: '이 아이템은 아이템 13입니다.',
  },
  {
    _id: 'item14',
    name: '아이템 14',
    repImgUrl: 'https://dummyimage.com/200x200/009999/fff',
    summary: '이 아이템은 아이템 14입니다.',
  },
  {
    _id: 'item15',
    name: '아이템 15',
    repImgUrl: 'https://dummyimage.com/200x200/990099/fff',
    summary: '이 아이템은 아이템 15입니다.',
  },
  {
    _id: 'item1',
    name: '아이템 1',
    repImgUrl: 'https://dummyimage.com/200x200/000000/fff',
    summary: '이 아이템은 아이템 1입니다.',
  },
  {
    _id: 'item2',
    name: '아이템 2',
    repImgUrl: 'https://dummyimage.com/200x200/ff0000/fff',
    summary: '이 아이템은 아이템 2입니다.',
  },
  {
    _id: 'item3',
    name: '아이템 3',
    repImgUrl: 'https://dummyimage.com/200x200/00ff00/fff',
    summary: '이 아이템은 아이템 3입니다.',
  },
  // 아이템 4부터 15까지 추가
  {
    _id: 'item4',
    name: '아이템 4',
    repImgUrl: 'https://dummyimage.com/200x200/0000ff/fff',
    summary: '이 아이템은 아이템 4입니다.',
  },
  {
    _id: 'item5',
    name: '아이템 5',
    repImgUrl: 'https://dummyimage.com/200x200/ff00ff/fff',
    summary: '이 아이템은 아이템 5입니다.',
  },
  {
    _id: 'item6',
    name: '아이템 6',
    repImgUrl: 'https://dummyimage.com/200x200/ffff00/fff',
    summary: '이 아이템은 아이템 6입니다.',
  },
  {
    _id: 'item7',
    name: '아이템 7',
    repImgUrl: 'https://dummyimage.com/200x200/00ffff/fff',
    summary: '이 아이템은 아이템 7입니다.',
  },
  {
    _id: 'item8',
    name: '아이템 8',
    repImgUrl: 'https://dummyimage.com/200x200/ff6600/fff',
    summary: '이 아이템은 아이템 8입니다.',
  },
  {
    _id: 'item9',
    name: '아이템 9',
    repImgUrl: 'https://dummyimage.com/200x200/6600ff/fff',
    summary: '이 아이템은 아이템 9입니다.',
  },
  {
    _id: 'item10',
    name: '아이템 10',
    repImgUrl: 'https://dummyimage.com/200x200/990000/fff',
    summary: '이 아이템은 아이템 10입니다.',
  },
  {
    _id: 'item11',
    name: '아이템 11',
    repImgUrl: 'https://dummyimage.com/200x200/009900/fff',
    summary: '이 아이템은 아이템 11입니다.',
  },
  {
    _id: 'item12',
    name: '아이템 12',
    repImgUrl: 'https://dummyimage.com/200x200/000099/fff',
    summary: '이 아이템은 아이템 12입니다.',
  },
  {
    _id: 'item13',
    name: '아이템 13',
    repImgUrl: 'https://dummyimage.com/200x200/999900/fff',
    summary: '이 아이템은 아이템 13입니다.',
  },
  {
    _id: 'item14',
    name: '아이템 14',
    repImgUrl: 'https://dummyimage.com/200x200/009999/fff',
    summary: '이 아이템은 아이템 14입니다.',
  },
  {
    _id: 'item15',
    name: '아이템 15',
    repImgUrl: 'https://dummyimage.com/200x200/990099/fff',
    summary: '이 아이템은 아이템 15입니다.',
  },
];

//전체 아이템 표시
const itemsPerPage = 10; // 페이지당 표시할 아이템 수

function showItems(pageNumber) {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = items.slice(startIndex, endIndex);

  const itemElements = paginatedItems.map(
    (item) => `
    <div class="item" id="${item._id}" onclick="redirectToProductDetails('${item._id}')">
      <img src="${item.repImgUrl}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <p>${item.summary}</p>
    </div>
  `,
  );

  const itemBoxs = document.querySelector('.item-box');
  itemBoxs.innerHTML = itemElements.join('');
}

function redirectToProductDetails(itemId) {
  location.href = `/product-details?id=${itemId}`;
}

function createPagination() {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const paginationContainer = document.createElement('div');
  paginationContainer.classList.add('pagination');

  for (let i = 1; i <= totalPages; i++) {
    const pageNumber = document.createElement('span');
    pageNumber.classList.add('page-number');
    pageNumber.textContent = i;
    pageNumber.addEventListener('click', () => {
      showItems(i);
      setActivePageNumber(i);
    });

    paginationContainer.appendChild(pageNumber);
  }

  const allItemsSections = document.querySelectorAll('.allItems');
  allItemsSections.forEach((section) => {
    section.appendChild(paginationContainer.cloneNode(true));
  });
}

function setActivePageNumber(pageNumber) {
  const pageNumbers = document.querySelectorAll('.page-number');
  pageNumbers.forEach((number) => {
    if (number.classList.contains('active')) {
      number.classList.remove('active');
    }
  });

  const activePage = document.querySelector(
    `.page-number:nth-child(${pageNumber})`,
  );
  activePage.classList.add('active');
}

// 페이지 로드 시 초기 아이템 보여주기 (첫 번째 페이지)
showItems(1);

// 페이지네이션 생성
createPagination();
setActivePageNumber(1);
