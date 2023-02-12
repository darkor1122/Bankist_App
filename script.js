'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
	owner: 'Jonas Schmedtmann',
	movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
	interestRate: 1.2, // %
	pin: 1111,

	movementsDates: [
		'2019-11-18T21:31:17.178Z',
		'2019-12-23T07:42:02.383Z',
		'2020-01-28T09:15:04.904Z',
		'2020-04-01T10:17:24.185Z',
		'2020-05-08T14:11:59.604Z',
		'2020-05-27T17:01:17.194Z',
		'2023-01-24T23:36:17.929Z',
		'2023-01-26T10:51:36.790Z',
	],
	currency: 'EUR',
	locale: 'pt-PT', // de-DE
};

const account2 = {
	owner: 'Jessica Davis',
	movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
	interestRate: 1.5,
	pin: 2222,

	movementsDates: [
		'2019-11-01T13:15:33.035Z',
		'2019-11-30T09:48:16.867Z',
		'2019-12-25T06:04:23.907Z',
		'2020-01-25T14:18:46.235Z',
		'2020-02-05T16:33:06.386Z',
		'2020-04-10T14:43:26.374Z',
		'2020-06-25T18:49:59.371Z',
		'2020-07-26T12:01:20.894Z',
	],
	currency: 'USD',
	locale: 'en-US',
};

const accounts = [account1, account2];

//

// Data
// const account1 = {
// 	owner: 'Jonas Schmedtmann',
// 	movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
// 	interestRate: 1.2, // %
// 	pin: 1111,
// };

// const account2 = {
// 	owner: 'Jessica Davis',
// 	movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
// 	interestRate: 1.5,
// 	pin: 2222,
// };

// const account3 = {
// 	owner: 'Steven Thomas Williams',
// 	movements: [200, -200, 340, -300, -20, 50, 400, -460],
// 	interestRate: 0.7,
// 	pin: 3333,
// };

// const account4 = {
// 	owner: 'Sarah Smith',
// 	movements: [430, 1000, 700, 50, 90],
// 	interestRate: 1,
// 	pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////////////////
// Functions

const formatMovementsDate = function (date, locale) {
	const calcDaysPassed = (date1, date2) =>
		Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

	const daysPassed = calcDaysPassed(new Date(), date);

	if (daysPassed === 0) return 'Today';
	if (daysPassed === 1) return 'Yesterday';
	if (daysPassed <= 7) return `${daysPassed} days ago`;
	else {
		// const year = date.getFullYear();
		// const month = `${date.getMonth() + 1}`.padStart(2, 0);
		// const day = `${date.getDate()}`.padStart(2, 0);
		const options = {
			month: 'numeric',
			minute: 'numeric',
			// weekday: 'long',
			day: 'numeric',
			year: 'numeric',
			hour: 'numeric',
		};

		return new Intl.DateTimeFormat(locale /* options */).format(date);
	}
};

const formatCur = function (value, locale, currency) {
	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency: currency,
	}).format(Math.abs(value));
};

const displayMovements = function (acc, sorted) {
	containerMovements.innerHTML = '';

	const movs = sorted
		? acc.movements.slice().sort((a, b) => a - b)
		: acc.movements;

	movs.forEach(function (mov, i) {
		const type = mov > 0 ? 'deposit' : 'withdrawal';

		// const formattedMov = new Intl.NumberFormat(acc.locale, {
		// 	style: 'currency',
		// 	currency: acc.currency
		// }).format(mov)

		const formatting = formatCur(mov, acc.locale, acc.currency);

		const date = new Date(acc.movementsDates[i]);
		const displayDate = formatMovementsDate(date, acc.locale);

		const html = `
			<div class="movements__row">
				<div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
				<div class="movements__date">${displayDate}</div>
				<div class="movements__value">${formatting}</div>
			</div>
		
		`;

		containerMovements.insertAdjacentHTML('afterbegin', html);

		//--------------------------------------------------------------------------------------
		//--------------------------------------------------------------------------------------
		// -------------------         druga metoda tworzenia zdarzenia        -----------------
		//--------------------------------------------------------------------------------------
		//--------------------------------------------------------------------------------------

		// const movementsRow = document.createElement('div')
		// movementsRow.classList.add('movements__row')
		// movementsRow.innerHTML = `
		// 	<div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
		// 	<div class="movements__value">${mov}</div>
		// `;
		// containerMovements.appendChild(movementsRow)
	});
};

//  account1.movements.forEach(function(move, i,  arr) {
// 	console.log(`${i + 1}: ${move}`);
//  })

const user = 'Steven Thomas Williams';
const user2 = 'Jonas Schmedtmann';

const createUsernames = function (accs) {
	accs.forEach((acc) => {
		acc.username = acc.owner
			.toLowerCase()
			.split(' ')
			.map((word) => word[0])
			.join('');
	});
};

console.log(accounts);

createUsernames(accounts);

// Updatind UI function

const updateUI = function (acc) {
	//display movements
	displayMovements(acc);

	//display balance
	countDisplayBalances(acc);
	//dissplay summary
	calcDisplaySummary(acc);
};

const countDisplayBalances = function (acc) {
	acc.balance = acc.movements.reduce((acc, curr) => acc + curr, 0);

	labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
	// labelBalance.textContent = `${acc.balance.toFixed(2)}€`;

	const balanceIn = acc.movements
		.filter((movv) => movv > 0)
		.reduce((a, b) => a + b, 0);
	const balanceOut = acc.movements
		.filter((movv) => movv < 0)
		.reduce((a, b) => a + b, 0);

	// const interest = moves
	// 	.filter((movv) => movv > 0)
	// 	.map(movv => movv * currentAccount.interestRate/100)
	// 	.filter(mov => mov >= 1)
	// 	.reduce((acc, cur,i ,arr) => {
	// 		// console.log(arr);
	// 		return acc + cur
	// 	});

	// labelSumInterest.textContent = `${interest.toFixed(2)}€`;

	labelSumIn.textContent = formatCur(balanceIn, acc.locale, acc.currency);
	labelSumOut.textContent = formatCur(balanceOut, acc.locale, acc.currency);
	// labelSumIn.textContent = `${balanceIn.toFixed(2)}€`;
	// labelSumOut.textContent = `${Math.abs(balanceOut).toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
	const interest = acc.movements
		.filter((mov) => mov > 0)
		.map((mov) => (mov * acc.interestRate) / 100)
		.filter((mov) => mov >= 1)
		.reduce((acc, cur, i, arr) => {
			// console.log(arr);
			return acc + cur;
		});

	labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
	// labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

// countDisplayBalances(account1.movements)

const startLogOutTimer = function () {
	const tick = function () {
		// In each call, print the remaining time to UI
		const mins = String(Math.trunc(time / 60)).padStart(2, '0');
		const secs = `${time % 60}`.padStart(2, '0');

		labelTimer.textContent = `${mins}:${secs}`;

		//when 0 secs, stop timer and log out user
		if (time === 0) {
			clearInterval(timer);
			labelWelcome.textContent = `Log in to get started`;
			containerApp.style.opacity = 0;
			// inputLoginPin.style.opacity = 1;
			// inputLoginUsername.style.opacity = 1;
		}
		//decreasing time by 1s
		time--;
	};

	// set time to 5 minutes
	let time = 300;

	// Call timer every second
	tick();
	const timer = setInterval(tick, 1000);

	return timer;
};

//  event handler

//Login section
//Login section
//Login section

let currentAccount, timer;

// FAKE ALWAYS LOGGED IN

// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 1;

btnLogin.addEventListener('click', function (e) {
	e.preventDefault();

	// inputLoginPin.style.opacity = 0
	// inputLoginUsername.style.opacity = 0

	currentAccount = accounts.find(
		(acc) => acc.username === inputLoginUsername.value
	);

	console.log(currentAccount);

	if (currentAccount?.pin === +inputLoginPin.value) {
		// Display UI and message
		labelWelcome.textContent = `You are logged in as a ${
			currentAccount.owner.split(' ')[0]
		}!`;
		containerApp.style.opacity = 1;

		updateUI(currentAccount);
		//clear input fields
		inputLoginUsername.value = inputLoginPin.value = '';
		inputLoginPin.blur();
		inputLoginUsername.blur();

		const now = new Date();
		const options = {
			month: 'numeric',
			minute: 'numeric',
			// weekday: 'long',
			day: 'numeric',
			year: 'numeric',
			hour: 'numeric',
		};
		// const locale = navigator.language;
		labelDate.textContent = new Intl.DateTimeFormat(
			currentAccount.locale,
			options
		).format(now);

		// const now = new Date()
		// const day = `${now.getDate()}`.padStart(2, 0)
		// const month =`${now.getMonth() + 1}`.padStart(2, 0);
		// const year = now.getFullYear();
		// const hour = `${now.getHours()}`.padStart(2, 0)
		// const min = `${now.getMinutes()}`.padStart(2, 0)

		// labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`

		//TIMER clear
		if (timer) clearInterval(timer);
		timer = startLogOutTimer();
	}
});

//Money transfer section

btnTransfer.addEventListener('click', function (e) {
	e.preventDefault();

	const amount = +inputTransferAmount.value;
	const receiverAccount = accounts.find(
		(acc) => acc.username === inputTransferTo.value
	);

	console.log(amount, receiverAccount);

	if (
		amount > 0 &&
		currentAccount.balance >= amount &&
		receiverAccount &&
		receiverAccount?.username !== currentAccount.username
	) {
		console.log(`transfer valid`);
		currentAccount.movements.push(-amount);
		receiverAccount.movements.push(amount);

		//add transfer date
		currentAccount.movementsDates.push(new Date().toISOString());
		receiverAccount.movementsDates.push(new Date().toISOString());

		//update UI
		updateUI(currentAccount);
	} else {
		console.log(`transfer invalid`);
	}

	inputTransferAmount.value = inputTransferTo.value = '';
	inputTransferAmount.blur(); //remove blinking cursor from field
	inputTransferTo.blur();

	clearInterval(timer);
	timer = startLogOutTimer();
});

//Loan Request section

btnLoan.addEventListener('click', function (e) {
	e.preventDefault();

	const amount = Math.floor(inputLoanAmount.value);
	const loan = currentAccount.movements.some((mov) => mov >= amount * 0.1);

	if (amount > 0 && loan) {
		setTimeout(function () {
			//add movement
			currentAccount.movements.push(amount);
			// creating new date of loan
			currentAccount.movementsDates.push(new Date().toISOString());
			//update UI
			updateUI(currentAccount);
		}, 2500);
	}

	inputLoanAmount.value = '';

	clearInterval(timer);
	timer = startLogOutTimer();
});

//Close account section

btnClose.addEventListener('click', function (e) {
	e.preventDefault();

	if (
		inputCloseUsername.value === currentAccount.username &&
		currentAccount?.pin === +inputClosePin.value
	) {
		const index = accounts.findIndex(
			(acc) => acc.username === currentAccount.username
		);

		//delete account
		accounts.splice(index, 1);
		console.log(index);

		//hide UI (log out)
		containerApp.style.opacity = 0;

		inputCloseUsername.value = inputClosePin.value = '';
	} else {
		console.log(`Wrong ID or Password!`);
	}
});

//Sort movements section

let sorted = false;

btnSort.addEventListener('click', function (e) {
	e.preventDefault();

	displayMovements(currentAccount, !sorted);

	sorted = !sorted;
});
