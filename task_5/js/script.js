const menu = document.querySelector('.menu')
const menuItems = document.querySelectorAll('.menu-item');

menu.insertBefore(menuItems[2], menuItems[1]);

let menuItem = document.createElement('li');
let text = document.createTextNode('Пятый пункт');

menuItem.classList.add('menu-item');
menuItem.textContent = text.nodeValue;
menu.appendChild(menuItem);

document.body.style.backgroundImage = 'URL(./img/apple_true.jpg)';

let title = document.querySelector('.title');

title.textContent = 'Мы продаем только подлинную технику Apple';

let columns = document.querySelectorAll('.column');

let adv = document.querySelector('.adv');

columns[1].removeChild(adv);

// adv.remove();

let question = prompt();

let prompts = document.querySelector('#prompt');

prompts.textContent = question;
