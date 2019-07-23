'use strict';

let appData = {
  money : 0,
  timeData : '',
  expenses: {
    "ответ на первый вопрос" : "ответ на второй вопрос"
  },
  optionalExpenses : {},
  income : [],
  savings : false
};

let money = +prompt("Ваш бюджет на месяц?"),
    time = prompt("Введите дату в формате YYYY-MM-DD");

console.log(money + ' ' + time);

appData.money = money;
appData.timeData = time;

alert("Ваш бюджет " + appData.money / 12);

// Сколько типов данных существует в JS?
// 8 типов данных

// Как вывести информацию в консоль?
// console.log();

// Какая функция операторов || и &&?
// || (ИЛИ), && (И)
