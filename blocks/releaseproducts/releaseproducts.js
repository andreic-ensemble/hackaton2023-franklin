import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

const processRow = (div, index) => {
  if (div.children.length === 1 && div.querySelector('picture')) div.className = 'releaseproducts-card-image';
  else if (index === 2) div.className = 'releaseproducts-card-button';
};

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');

    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div, index) => {
      processRow(div, index);
    });
    li.classList += li.children[1].innerText;
    const productName = li.children[2].innerText;
    li.addEventListener('click', () => {
      if (li.className === li.classList[0]) {
        const a = document.createElement('a');
        const products = 'products';
        a.href = `/${products}/${productName}`;
        li.append(a);
        window.location.assign(a.href);
      }
    });
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
