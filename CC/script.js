const amountInput = document.querySelector(".amt");
const fromCurrency = document.querySelector(".fromCurrency");
const toCurrency = document.querySelector(".toCurrency");
const convertedAmount = document.querySelector(".convertedAmt");
const resultDisplay = document.querySelector(".result");

const currencyList = {
  USD: "United States Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  INR: "Indian Rupee",
  AUD: "Australian Dollar",
  CAD: "Canadian Dollar",
  SGD: "Singapore Dollar",
  CHF: "Swiss Franc",
  MYR: "Malaysian Ringgit",
  JPY: "Japanese Yen",
  CNY: "Chinese Yuan",
  NZD: "New Zealand Dollar",
  ZAR: "South African Rand",
  SEK: "Swedish Krona",
  NOK: "Norwegian Krone",
  DKK: "Danish Krone",
  MXN: "Mexican Peso",
  HKD: "Hong Kong Dollar",
  KRW: "South Korean Won",
  THB: "Thai Baht"
};

function populateDropdown(selectElement) {
  for (const [code, name] of Object.entries(currencyList)) {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = `${code} - ${name}`;
    selectElement.appendChild(option);
  }
}

populateDropdown(fromCurrency);
populateDropdown(toCurrency);

// Set default selections
fromCurrency.value = "USD";
toCurrency.value = "INR";

async function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;
  
  

  if (!amount || from === "" || to === "") {
    resultDisplay.textContent = "Please enter a valid amount and currency.";
    return;
  }

  if (from === to) {
    convertedAmount.value = amount;
    resultDisplay.textContent = `1 ${from} = 1 ${to}`;
    return;
  }

  const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const rate = data.rates[to];
    convertedAmount.value = rate.toFixed(2);

    const singleRes = await fetch(`https://api.frankfurter.app/latest?amount=1&from=${from}&to=${to}`);
    const singleData = await singleRes.json();
    resultDisplay.textContent = `1 ${from} = ${singleData.rates[to].toFixed(4)} ${to}`;
  }
   catch (err) {
    resultDisplay.textContent = "Error fetching conversion rate.";
    console.error(err);
  }
}

amountInput.addEventListener("input", convertCurrency);
fromCurrency.addEventListener("change", convertCurrency);
toCurrency.addEventListener("change", convertCurrency);

convertCurrency(); // Load initial conversion
