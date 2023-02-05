"use strict";

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2022-11-06T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

const login_btn = document.querySelector("#login");
const welcome = document.querySelector(".welcome");
const user_input = document.querySelector(".user");
const pin_input = document.querySelector(".pin");
const main = document.querySelector("main");
const container_movement = document.querySelector(".movment");
const total = document.querySelector(".total");
const inSummary = document.querySelector(".in");
const outSummary = document.querySelector(".OUT");
const intersetSummary = document.querySelector(".INTEREST");
const transferBtn = document.querySelector(".transferbtn");
const transferAmount = document.querySelector(".trAmount");
const transferTo = document.querySelector(".trTo");
const loanInput = document.querySelector(".loan-input");
const loanBtn = document.querySelector(".loanbtn");
const closeBtn = document.querySelector(".closebtn");
const closeUser = document.querySelector(".close-user");
const closePin = document.querySelector(".close-pin");
const btnSort = document.querySelector(".btn--sort");
const dateElement = document.querySelector(".date span");
const timerElement = document.querySelector(".timer span");

let currentAcount,timer;
function setTimer(){
  const counter=()=>{
const min=String( Math.floor(time/60)).padStart(2,0)

const sec = String(Math.floor(time % 60)).padStart(2, 0);
timerElement.textContent=`${min}:${sec}`
if(time===0){
  clearInterval(timer)
  main.style.opacity=0
  welcome.textContent = "Log in to get started";
}
time--
  }
  let time=300
  counter()
  const timer=setInterval(counter,1000)
  return timer
}
function formatDate(date){
  console.log(date);
const clacDate=(date1,date2)=>(Math.round( Math.abs( date1-date2)/(1000*60*60*24)))
const daysPassed=clacDate(new Date(),date)
console.log(daysPassed);
if(daysPassed==0)return`Today`
if (daysPassed == 1) return `Yesterday`;
if (daysPassed == 0) return `${daysPassed} days ago`;
return new Intl.DateTimeFormat(currentAcount.locale).format(date)
}
function formateCur(currency,locale,value){
  const options={
    style:'currency'
    ,currency:currency
  }
  return new Intl.NumberFormat(locale,options).format(value)
}
function calcSummary(acc) {
  const mov = acc.movements;
  const posValue = mov
    .filter((num) => num > 0)
    .reduce((prev, next) => prev + next, 0);

  const negValue = mov
    .filter((num) => num < 0)
    .reduce((prev, next) => prev + next, 0);
  const interest = mov
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  console.log(interest);
  inSummary.textContent = formateCur(acc.currency,acc.locale,posValue);
  outSummary.textContent = formateCur(acc.currency, acc.locale, Math.abs( negValue));
  intersetSummary.textContent = formateCur(acc.currency, acc.locale, interest);
}
function updateUI(currentAcount) {
  displayMovements(currentAcount);
  calcTotal(currentAcount);
  calcSummary(currentAcount);
}

function calcTotal(acc) {
  const mov = acc.movements;
  acc.balance = mov.reduce((prev, next) => prev + next, 0);
  total.textContent = `${acc.balance.toFixed(2)}€`;
}
function createUsernames() {
  accounts.forEach(
    (acc) =>
      (acc.username = acc.owner
        .split(" ")
        .map((name) => name[0].toLowerCase())
        .join(""))
  );
}

function displayMovements(acc,sort=false) {


const mov=sort?acc.movements.slice().sort((a,b)=>a-b):acc.movements

  mov.forEach(function (mov, i) {
const date = formatDate(new Date(currentAcount.movementsDates[i]));
    const type = mov > 0 ? "deposit" : "withdraw";

    const html = `
     <div class="trasaction ${type}">
                <div>
                <p >${i + 1} ${type}</p>
                <p class="traaction-date">${date}</p>
</div>
<div class="price">${formateCur(acc.currency,acc.locale,mov)}</div>
            </div>
         `;

    container_movement.insertAdjacentHTML("afterbegin", html);
  });
}
createUsernames();

login_btn.addEventListener("click", (e) => {
  e.preventDefault();
  const user = user_input.value;
  const pin = pin_input.value;
  currentAcount = accounts.find((acc) => acc.username == user);
  console.log(currentAcount);

  if (currentAcount?.pin == pin) {
    welcome.textContent = `welcome back ,${currentAcount.owner.split(" ")[0]}`;
    main.style.opacity = 100;
    updateUI(currentAcount);
    user_input.value = "";
    pin_input.value = "";
    pin_input.blur();
    const date =new Date()
    const options={
      hour:'numeric',
      minute:'numeric',
      day:'numeric'
      ,month:"numeric"
      ,year:'numeric'
    }
dateElement.textContent= new Intl.DateTimeFormat(currentAcount.locale,options).format(date)
if(timer)clearInterval(timer)
timer=setTimer()
  }
});
transferBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = Number(transferAmount.value);
  const receiverAcc = accounts.find((acc) => acc.username === transferTo.value);
  console.log(amount);
  console.log(receiverAcc);

  if (
    receiverAcc &&
    amount > 0 &&
    currentAcount.balance >= amount &&
    receiverAcc?.username != currentAcount.username
  ) {
    receiverAcc.movements.push(amount);
    currentAcount.movements.push(-amount);
    receiverAcc.movementsDates.push(new Date().toISOString());
    currentAcount.movementsDates.push(new Date().toISOString());
    if (timer) clearInterval(timer);
    timer = setTimer();
    updateUI(currentAcount);
    console.log(amount);
    console.log(receiverAcc);
  }
});

loanBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = +loanInput.value;
  const acceptation = currentAcount.movements.some((num) => num > amount * 0.1);
  if (amount > 0 && acceptation) {
    currentAcount.movements.push(amount);
    currentAcount.movementsDates.push(new Date().toISOString());
    if (timer) clearInterval(timer);
    timer = setTimer();
    updateUI(currentAcount);

  }
  loanInput.value = "";


});
closeBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    currentAcount.pin == closePin.value &&
    currentAcount.username === closeUser.value
  ) {
    const accIndex = accounts.findIndex(
      acc => acc.username === currentAcount.username
    );
    accounts.splice(accIndex,1);
     main.style.opacity = 0;
     welcome.textContent = "Log in to get started";
  }
  
  closeBtn.value=''
closePin.value=''
});
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAcount, !sorted);
  sorted = !sorted;
});
