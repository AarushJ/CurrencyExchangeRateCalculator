const currencyOneElem = document.getElementById('currency-one');
const currencyTwoElem = document.getElementById('currency-two');
const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');

const rateElement = document.getElementById('rate');
const swapButton = document.getElementById('swap');

calculate();

// fetch exchange rates and update the DOM
function calculate(){
  const currencyOneCode = currencyOneElem.value;
  const currencyTwoCode = currencyTwoElem.value;

  fetchPerUSDRate().then(data => {
    const currencyOnePerUSD = data.rates[currencyOneCode];
    const currencyTwoPerUSD = data.rates[currencyTwoCode];

    // 1$ = currencyOnePerUSD currencyOneCode
    // 1$ = currencyTwoPerUSD currencyTwoCode
    // currencyTwoPerUSD currencyTwoCode = currencyOnePerUSD currencyOneCode
    // 1 currencyOneCode = (currencyTwoPerUSD/currencyOnePerUSD) currencyTwoCode
    const rate = parseFloat((currencyTwoPerUSD/currencyOnePerUSD).toFixed(3));
    rateElement.innerText = `1 ${currencyOneCode} = ${rate} ${currencyTwoCode}`;
    amountTwo.value = parseFloat((amountOne.value*rate).toFixed(3));
  });
}

function calculate2(){
  const currencyOneCode = currencyOneElem.value;
  const currencyTwoCode = currencyTwoElem.value;

  fetchPerUSDRate().then(data => {
    const currencyOnePerUSD = data.rates[currencyOneCode];
    const currencyTwoPerUSD = data.rates[currencyTwoCode];

    // 1$ = currencyOnePerUSD currencyOneCode
    // 1$ = currencyTwoPerUSD currencyTwoCode
    // currencyTwoPerUSD currencyTwoCode = currencyOnePerUSD currencyOneCode
    // 1 currencyOneCode = (currencyTwoPerUSD/currencyOnePerUSD) currencyTwoCode
    const rate = parseFloat((currencyTwoPerUSD/currencyOnePerUSD).toFixed(3));
    rateElement.innerText = `1 ${currencyOneCode} = ${rate} ${currencyTwoCode}`;
    amountOne.value = parseFloat((amountTwo.value*rate).toFixed(3));
  });
}



async function fetchPerUSDRate(){
  // this api endpoints gives rate of all currencies wrt USD
  const response = await fetch(`https://api.exchangerate-api.com/v6/latest`);
  return response.json();
}

// Event listeners start here
currencyOneElem.addEventListener('change', calculate);
currencyTwoElem.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
amountTwo.addEventListener('input', calculate2);

swapButton.addEventListener('click', () => {
  const temp = currencyOneElem.value;
  currencyOneElem.value = currencyTwoElem.value;
  currencyTwoElem.value = temp;
  calculate();
});
