window.addEventListener('DOMContentLoaded', () => {

	'use strict';

	let tab = document.querySelectorAll('.info-header-tab');
	let info = document.querySelector('.info-header');
	let tabContent = document.querySelectorAll('.info-tabcontent');


	let hideTabContent = (a) => {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	}

	hideTabContent(1);

	let showTabContent = (b) => {
		if (tabContent[b].classList.contains('hide')) {
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		}
	}

	info.addEventListener('click', (e) => {
		let target = e.target;
		if (target && target.classList.contains('info-header-tab')) {
			for (let i = 0; i < tab.length; i++) {
				if (target == tab[i]) {
					hideTabContent(0);
					showTabContent(i);
					break;
				}
			}
		}
	});

	// Timer

	let deadline = '2020-04-13';

	let getTimeRemaining = (endtime) => {
		let t = Date.parse(endtime) - Date.parse(new Date());
		let seconds = Math.floor((t / 1000) % 60);
		let minutes = Math.floor((t / 1000 / 60) % 60);
		let hours = Math.floor((t / (1000 * 60 * 60)));
		// let hours = Math.floor( ( t / 1000 / 60 / 60 ) % 24 );
		// let days = Math.floor( ( t / ( 1000 * 60 * 60 * 24 ) ) );

		return {
			'total': t,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	let setClock = (id, endTime) => {
		let timer = document.getElementById(id);
		let hours = timer.querySelector('.hours');
		let minutes = timer.querySelector('.minutes');
		let seconds = timer.querySelector('.seconds');
		let timeInterval = setInterval(updateClock, 1000);

		function updateClock() {
			let t = getTimeRemaining(endTime);
			if (t.hours < 10) {
				hours.textContent = '0' + t.hours;
			} else {
				hours.textContent = t.hours;
			}
			if (t.minutes < 10) {
				minutes.textContent = '0' + t.minutes;
			} else {
				minutes.textContent = t.minutes;
			}
			if (t.seconds < 10) {
				seconds.textContent = '0' + t.seconds;
			} else {
				seconds.textContent = t.seconds;
			}			
			if (t.total <= 0) {
				clearInterval(timeInterval);
				hours.textContent = '00';
				minutes.textContent = '00';
				seconds.textContent = '00';
			}
		}
		

	}

	setClock('timer', deadline);

	//modal

	let more = document.querySelector('.more');
	let overlay = document.querySelector('.overlay');
	let close = document.querySelector('.popup-close');

	more.addEventListener('click', () => {
		overlay.style.display = 'block';
		this.classList.add('more-splash');
		document.body.style.overflow = 'hidden';
	});
	
	close.addEventListener('click', () => {
		overlay.style.display = 'none';
		more.classList.remove('more-splash');
		document.body.style.overflow = '';
	})

	let descrBtn = document.querySelectorAll('.description-btn');
	let infoCont = document.querySelector('.info');

	infoCont.addEventListener('click', (e) => {
		let target = e.target;
		// console.log(target);
		if (target && target.classList.contains('description-btn')) {
			for (let i = 0; i < descrBtn.length; i++) {
				if (target == descrBtn[i]) {
					showModal();
					break;
				}				
			}		
		}
	});

	let showModal = () => {
		overlay.style.display = 'block';
		more.classList.add('more-splash');
		document.body.style.overflow = 'hidden';
	};

	// Form

	let message = {
		loading: 'Загрузка...',
		success: 'Спасибо! Скоро мы с вами свяжемся!',
		failure: 'Что то пошло не так...'
	};

	let form = document.querySelector('.main-form');
	let input = form.getElementsByTagName('input');
	let statusMessage = document.createElement('div');

	statusMessage.classList.add('status');

	form.addEventListener('submit', (event) => {
		event.preventDefault();
		form.appendChild(statusMessage);

		let request = new XMLHttpRequest();
		request.open('POST', '../server.php');
		// request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

		let formData = new FormData(form);

		let obj = {};
		formData.forEach((value, key) => {
			obj[key] = value;
		});
		let json = JSON.stringify(obj);

		// request.send(formData);
		request.send(json);

		request.addEventListener('readystatechange', () => {
			if (request.readyState < 4) {
				statusMessage.innerHTML = message.loading;
			} else if (request.readyState === 4 && request.status == 200) {
				statusMessage.innerHTML = message.success;
			} else {
				statusMessage.innerHTML = message.failure;
			}
		});

		for (let i = 0; i <input.length; i++) {
			input[i].value = '';
		}

	});
});