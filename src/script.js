const QuoteBox = (props) => {
  return (
    <div className='justify-content-center text-center well container'>
      <h1 id='text' className='text-center'>"{props.quote}"</h1>
      <p id='author'>-{props.author}</p>
      <div className='row'>
        <a id='tweet-quote' className='col-xs-3' href='https://twitter.com/intent/tweet'>
          <i className="fab fa-twitter-square"></i>
        </a>
        <button id='new-quote' className='button col-xs-3 col-xs-offset-5'>New Quote</button>
      </div>
    </div>
  );
};

const colors = [
  'rgb(34, 34, 34)',
  'rgb(85, 85, 34)',
  'rgb(85, 34, 85)',
  'rgb(34, 85, 85)',
  'rgb(34, 34, 85)',
  'rgb(34, 85, 34)',
  'rgb(85, 34, 34)',
];

const randColor = () => {
  const index = Math.floor(Math.random()*colors.length);
  return colors[index];
};

const setColor = () => {
  let color = randColor();
  const bg = document.querySelector('#quote-box');
  console.log(`${color} = ${bg.style.getPropertyValue('background-color')}`)
  while (color == bg.style.getPropertyValue('background-color')) {
    color = randColor();
  }

  bg.style.setProperty('background-color', color);
  const quote = document.querySelector('#text');
  quote.style.setProperty('color', color);
  const author = document.querySelector('#author');
  author.style.setProperty('color', color);
  const social = document.querySelector('#tweet-quote');
  social.style.setProperty('color', color);
  const button = document.querySelector('.button');
  button.style.setProperty('background-color', color);
};

const displayQuote = (quote) => {
  const domContainer = document.querySelector('#quote-box');
  return ReactDOM.render(
    <QuoteBox quote={quote.quote} author={quote.author} />,
    domContainer
  );
};

const randomQuote = (quotes) => {
  const randomIndex = Math.floor(Math.random()*quotes.length);
  return quotes[randomIndex];
};

const render = (quotes) => {
  displayQuote(randomQuote(quotes));
  setColor();
};

const getQuotes = (() => {
    req = new XMLHttpRequest();
    req.open(
      "GET",
      'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
      true
    );
    req.send();

    req.onload = () => {
      const quotes = JSON.parse(req.responseText).quotes;
      render(quotes);
      document.querySelector('#new-quote').addEventListener('click', () => {
        render(quotes);
      });
    }
})();
