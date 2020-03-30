let startBtn = document.getElementById('start');
let budgetValue = document.querySelector('.budget-value');
let daybudgetValue = document.querySelector('.daybudget-value');
let levelValue = document.querySelector('.level-value');
let expensesValue = document.querySelector('.expenses-value');
let optionalExpensesValue = document.querySelector('.optionalexpenses-value');
let incomeValue = document.querySelector('.income-value');
let monthSavingsValue = document.querySelector('.monthsavings-value');
let yearSavingsValue = document.querySelector('.yearsavings-value');

let expensesItem = document.querySelectorAll('.expenses-item');
let expensesBtn = document.querySelector('.expenses-item-btn'); //0
let optionalExpensesBtn = document.querySelector('.optionalexpenses-btn'); //1
let countBtn = document.querySelector('.count-budget-btn'); //2
let optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item');
let incomeItem = document.querySelector('.choose-income');
let checkSavings = document.querySelector('#savings');
let sumValue = document.querySelector('.choose-sum');
let percentValue = document.querySelector('.choose-percent');
let yearValue = document.querySelector('.year-value');
let monthValue = document.querySelector('.month-value');
let dayValue = document.querySelector('.day-value');

let money, time;

expensesBtn.setAttribute('disabled', 'disabled');
optionalExpensesBtn.setAttribute('disabled', 'disabled');
countBtn.setAttribute('disabled', 'disabled');

startBtn.addEventListener('click', () => {	
	time = prompt('Введите дату в формате YYYY-MM-DD', '');
	money = +prompt("Ваш бюджет на месяц?", '');

	expensesBtn.removeAttribute('disabled');
	optionalExpensesBtn.removeAttribute('disabled');
	countBtn.removeAttribute('disabled');

	while (isNaN(money) || money == "" || money == null) {
		money = +prompt("Ваш бюджет на месяц?", '');
	}
	appData.budget = money;
	appData.timeData = time;
	budgetValue.textContent = money.toFixed();
	yearValue.value = new Date(Date.parse(time)).getFullYear();	
	monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
	dayValue.value = new Date(Date.parse(time)).getDate();	
});

expensesBtn.addEventListener('click', () => {
	let sum = 0;
	for (let i = 0; i < expensesItem.length; i++) {
		let a = expensesItem[i].value,
				b = expensesItem[++i].value;
	
		if ( typeof(a) === 'string' && typeof(a) != null && typeof(b) != null 
			&& a != '' && b!= '' && a.length < 50 ) {
			appData.expenses[a] = b;
			sum += +b;
		} else {
			i--;
		}
	}
	expensesValue.textContent = sum;
});

optionalExpensesBtn.addEventListener('click', () => {
	for (let i = 0; i < optionalExpensesItem.length; i++) {
		let a = optionalExpensesItem[i].value;
		appData.optionalExpenses[i] = a;
		optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
	}
});

countBtn.addEventListener('click', () => {

	if (appData.budget != undefined) {
		appData.moneyPerDay = ((appData.budget - +expensesValue.textContent) / 30).toFixed(1);
		daybudgetValue.textContent = appData.moneyPerDay;

		// console.log(expensesValue.textContent);
		
	
		if (appData.moneyPerDay < 100) {
			levelValue.textContent = "Минимальный уровень достатка";		
		} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
			levelValue.textContent = "Средний уровень достатка";	
		} else if (appData.moneyPerDay > 2000) {
			levelValue.textContent = "Высокий уровень достатка";
		} else {
			levelValue.textContent = "Произошла ошибка";	
		}
	} else {
		daybudgetValue.textContent = "Произошла ошибка";
	}
});

incomeItem.addEventListener('input', () => {
	let items = incomeItem.value;
	appData.income = items.split(', ');
	incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', () => {
	if (appData.savings == true) {
		appData.savings = false;
	} else {
		appData.savings = true;
	}
});

sumValue.addEventListener('input', () => {
	if (appData.savings == true) {
		let sum = +sumValue.value;
		let percent = +percentValue.value;

		appData.monthIncome = sum/100/12*percent;
		appData.yearIncome = sum/100*percent;

		monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
		yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
	}
});

percentValue.addEventListener('input', () => {
	if (appData.savings == true) {
		let sum = +sumValue.value;
		let percent = +percentValue.value;

		appData.monthIncome = sum/100/12*percent;
		appData.yearIncome = sum/100*percent;

		monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
		yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
	}
});

let appData = {
	budget: money,
	expenses: {},
	optionalExpenses: {},
	income: [],
	timeData: time,
	savings: false,
};


console.log("Наша программа включает в себя данные:");


for (const key in appData) {
		console.log("appData." + key);		
}


