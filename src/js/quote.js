import axios from 'axios';

const quoteEl = document.querySelector('.quote-day-text');
const authorEl = document.querySelector('.quote-day-author');

const BASE_URL = 'https://your-energy.b.goit.study/api/quote';
const QUOTE_ENDPOINT = '?author&quote';

async function serviceQuoteSearch() {
  const response = await axios.get(`${BASE_URL}${QUOTE_ENDPOINT}`);
  const { author, quote } = response.data;
  return { author, quote };
}

function updateQuote() {
  serviceQuoteSearch()
    .then(({ author, quote }) => {
      localStorage.setItem('quote', quote);
      localStorage.setItem('author', author);
      quoteEl.textContent = quote;
      authorEl.textContent = author;

      const currentDate = new Date().toISOString();
      localStorage.setItem('lastUpdated', currentDate);
    })
    .catch((error) => {
      console.error('Помилка запиту:', error);
    });
}

const lastUpdated = localStorage.getItem('lastUpdated');
if (!lastUpdated || (new Date() - new Date(lastUpdated)) >= 24 * 60 * 60 * 1000) {
  updateQuote();
} else {
  
  quoteEl.textContent = localStorage.getItem('quote');
  authorEl.textContent = localStorage.getItem('author');
}

