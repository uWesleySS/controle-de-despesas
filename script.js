const transactionUl = document.querySelector('#transactions');
const incomeDisplay = document.querySelector('#money-plus');
const expenseDisplay = document.querySelector('#money-minus');
const balaceDiplay = document.querySelector('#balance');
const form  = document.querySelector('#form');
const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount = document.querySelector('#amount');

const localStorageTransactions = JSON.parse(localStorage
  .getItem('transactions'));
let transactions = localStorage
  .getItem('transactions') !== null ? localStorageTransactions : [];

const removeTransaction = ID =>{
  transactions = transactions.filter(transaction => transaction.id !== ID);
  upDateLocalStorage()
  init()
}
const addTransactionIntoDOM = (transaction) => {
  const operator = transaction.amount < 0 ? '-' : '+';
  const CSSClass = transaction.amount < 0 ? 'minus' : 'plus';
  const amountWithoutOperator = Math.abs(transaction.amount);
  const li = document.createElement("li");

  li.classList.add(CSSClass);
  li.innerHTML = `${transaction.name} <span>${operator} R$ ${amountWithoutOperator}</span>
    <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
      x
    </button>`;
  transactionUl.append(li);
};

const getExpenses = transactionsAmount => Math.abs(transactionsAmount.filter(value => value < 0)
.reduce((accumulator, value) => accumulator + value, 0))
.toFixed(2);

const updateBalanceValues = () => {
  const transactionsAmounts = transactions
    .map(transaction => transaction.amount);
  const total = transactionsAmounts
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2);
  const income = transactionsAmounts
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2);
  const expense = getExpenses(transactionsAmounts);
  
  balaceDiplay.textContent = `R$ ${total}`;
  incomeDisplay.textContent = `R$ ${income}`;
  expenseDisplay.textContent = `R$ ${expense}`;
};

const init = () => {
  transactionUl.innerHTML = '';
  transactions.forEach(addTransactionIntoDOM);
  updateBalanceValues()
};

init();

const upDateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};

const generateID = () => Math.round(Math.random() * 1000);

const addToTransactionsArray = (transactionName, transactionAmount) =>{
  transactions.push({ 
    id: generateID(), 
    name: transactionName , 
    amount: +transactionAmount 
  });
}

const cleanInputs = () => {
  inputTransactionName.value = '';
  inputTransactionAmount.value = '';
}

const handleFormSubmit = event =>{
  event.preventDefault()

  const transactionName = inputTransactionName.value.trim();
  const transactionAmount =  inputTransactionAmount.value.trim();
  const isSomeInput = transactionName === '' || transactionAmount === '';

  if (isSomeInput){
    alert('Por favor, preencha o nome e o valor da transação');
    return
  };

  
  addToTransactionsArray(transactionName,transactionAmount)
  init()
  upDateLocalStorage()
  cleanInputs()

  
}

form.addEventListener('submit', handleFormSubmit);
