const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// mostrando loading spinner
function ShowLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// removendo loading spinner
function removeLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Buscando frases da API
async function getQuote() {
  ShowLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
    removeLoadingSpinner();
  } catch (error) {
    getQuote();
  }
}

let apiQuotes = [];
// mostrar uma nova frase
function newQuote() {
  ShowLoadingSpinner();
  const quote = apiQuotes[Math.round(Math.random() * apiQuotes.length)];

  // reduzir a fonte de acordo com o tamanho da frase
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  // verificar se o autor é 'null' e trocar por 'unknown'
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

// Frase para postar no twitter
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//eventos
twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", newQuote);

// ao carregar a página
getQuote();
