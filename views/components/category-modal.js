import * as API from '/api/index.js';
export default () => {
  const trigger = document.querySelector('.js-modal-trigger');
  const modal = trigger.dataset.target;
  const modalCallback = trigger.dataset.callback;
  const $target = document.getElementById(modal);

  $target.innerHTML = `<div class="modal-background"></div>
                        <div class="modal-card">
                            <header class="modal-card-head">
                            <p class="modal-card-title">Category</p>
                            <button class="delete" aria-label="close"></button>
                            </header>
                            <section class="modal-card-body">
                            <ul id="myUL">
                                <li class="myUL-li">
                                <span>전체</span>
                                <ul class="nested active">
                                    <li class="nested-li"></li>
                                </ul>
                                </li>
                            </ul>
                            </section>
                            <footer class="modal-card-foot">
                            <button class="button is-success" id="modalSelectBtn"  >선택</button>
                            <!-- <button class="button">취소</button> -->
                            </footer>
                        </div>`;

  getCateList();

  document.getElementById('modalSelectBtn').addEventListener('click', () => {
    const category = document.querySelector('.caret.selected-category');

    if (!category) {
      alert('카테고리를 선택해 주세요');
      return false;
    }

    const subcategory = document.querySelector('.lowCateLi.selected-category');

    let result = {
      categoryId: category.getAttribute('id'),
      categoryName: category.innerText.trim(),
    };
    let name = result.categoryName;

    if (subcategory) {
      result.subcategoryName = subcategory.innerText.trim();
      name += ` > ${result.subcategoryName}`;
      result.subcategoryId = subcategory.getAttribute('id');
    }

    result.name = name;
    window[modalCallback](result);
    closeAllModals();
  });

  document.querySelector('.js-modal-trigger').addEventListener('click', () => {
    openModal($target);
  });

  (document.querySelectorAll('.modal-card-head .delete') || []).forEach(
    ($close) => {
      const $target = $close.closest('.modal');

      $close.addEventListener('click', () => {
        closeModal($target);
      });
    },
  );
};

async function getCateList() {
  try {
    const result = await API.get('/api/admin/subcategory');
    const nested = document.querySelector('.nested-li');
    result.data.forEach((item) => {
      nested.insertAdjacentHTML(
        'beforeend',
        `<div>
              <span class="caret" id=${item._id}>${item.categoryName}</span>
              <ul class="nested">
                ${item.data
                  .map(
                    (items) =>
                      `<li class="lowCateLi" id=${items._id} category_id=${item._id}>${items.subCategoryName}</li>`,
                  )
                  .join('')}
              </ul>
              </div>`,
      );
    });
  } catch (error) {
    throw error;
  }

  nodeSet(document.getElementsByClassName('caret'));
}

function nodeSet(toggler) {
  Array.from(toggler).forEach((data) => {
    data.addEventListener('click', arrowClick);
  });
  lowCateClick();
}

function arrowClick() {
  const selected = document.querySelectorAll('.selected-category');
  selected.forEach((item) => {
    item.classList.remove('selected-category');
  });

  // 토글 클래스 추가
  this.parentElement.querySelector('.nested').classList.toggle('active');
  this.classList.toggle('caret-down');
  this.classList.add('selected-category');
}

// 하위 카테고리를 클릭 했을 때 이벤트
function lowCateClick() {
  const lowCateItem = document.querySelectorAll('.lowCateLi');
  lowCateItem.forEach((item) => {
    item.addEventListener('click', addClassToLowCate);
  });
}

function addClassToLowCate() {
  const selected = document.querySelectorAll('.selected-category');
  selected.forEach((item) => {
    item.classList.remove('selected-category');
  });
  const categoryId = this.getAttribute('category_id');
  const category = document.getElementById(categoryId);
  category.classList.add('selected-category');
  this.classList.add('selected-category');
}

function openModal($el) {
  $el.classList.add('is-active');
}

function closeModal($el) {
  $el.classList.remove('is-active');
}

function closeAllModals() {
  (document.querySelectorAll('.modal') || []).forEach(($modal) => {
    closeModal($modal);
  });
}
