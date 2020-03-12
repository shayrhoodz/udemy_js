let money, time;

function start() {
	money = +prompt("Ваш бюджет на месяц?", '');
	time = prompt('Введите дату в формате YYYY-MM-DD', '');

	while (isNaN(money) || money == "" || money == null) {
		money = +prompt("Ваш бюджет на месяц?", '');
	}
}
start();

let appData = {
	budget: money,
	expenses: {},
	optionalExpenses: {},
	income: [],
	timeData: time,
	savings: false,
	chooseExpenses: function() {
		for (let i = 0; i < 2; i++) {
			let a = prompt("Введите обязательную статью расходов в этом месяце", ''),
					b = prompt("Во сколько обойдется?", '');
		
			if ( typeof(a) === 'string' && typeof(a) != null && typeof(b) != null 
				&& a != '' && b!= '' && a.length < 50 ) {
				console.log("done");		
				appData.expenses[a] = b;
			} else {
				console.log("else");
				i--;
			}
		}
	},
	detectDayBudget: function() {
		appData.moneyPerDay = (appData.budget / 30).toFixed(1);
		alert("Ежедневный бюджет: " + appData.moneyPerDay);
	},
	detectLevel: function() {
		if (appData.moneyPerDay < 100) {
			console.log("Минимальный уровень достатка");		
		} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
			console.log("Средний уровень достатка");	
		} else if (appData.moneyPerDay > 2000) {
			console.log("Высокий уровень достатка");
		} else {
			console.log("Произошла ошибка");	
		}
	},
	checkSavings: function() {
		if (appData.savings == true) {
			let save = +prompt("Какова сумма накоплений?"),
					percent = +prompt("Под какой процент");
			
			appData.monthIncome = save/100/12*percent;
			alert("Доход в месяц с вашего депозита: " + appData.monthIncome);
		}
	},
	chooseOptExpenses: function() {
		for (let i = 1; i < 4; i++) {
			let a = prompt("Статья необязательных расходов?", '');
			appData.optionalExpenses[i] = a;		
		}
	},
	chooseIncome: function() {
		let items = prompt("Что принесет дополнительный доход? (Перечислить через запятую)", '');

		if ( typeof(items) === 'string' && typeof(items) != null && items != '') {
				console.log("done");		
				appData.income = items.split(', ');
				appData.income.push(prompt("Может что-то еще", ''));
				appData.income.sort();
			} else {
				console.log("else");
				appData.chooseIncome();
			}

		let i = 1;
		console.log('Способы заработка:');

		appData.income.forEach(
			(element, i) => {
				i++;
				console.log(i + ' ' + element);
			}
		);

		
		
	}
};

console.log("Наша программа включает в себя данные:");


for (const key in appData) {
		console.log("appData." + key);		
}

