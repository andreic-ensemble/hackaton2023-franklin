import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

const processRow = (div, index) => {
  if (div.children.length === 1 && div.querySelector('picture')) div.className = 'productcards-card-image';
  else if(index === 2) div.className = 'productcards-card-price'
  else div.className = 'productcards-card-body';
}

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div, index) => { processRow(div, index)

    });
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
