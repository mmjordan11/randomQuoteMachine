var QuoteBox = function QuoteBox(props) {
  return React.createElement(
    'div',
    { className: 'justify-content-center text-center well container' },
    React.createElement(
      'h1',
      { id: 'text', className: 'text-center' },
      '"',
      props.quote,
      '"'
    ),
    React.createElement(
      'p',
      { id: 'author' },
      '-',
      props.author
    ),
    React.createElement(
      'div',
      { className: 'row' },
      React.createElement(
        'a',
        { id: 'tweet-quote', className: 'col-xs-3', href: 'https://twitter.com/intent/tweet' },
        React.createElement('i', { className: 'fab fa-twitter-square' })
      ),
      React.createElement(
        'button',
        { id: 'new-quote', className: 'button col-xs-3 col-xs-offset-5' },
        'New Quote'
      )
    )
  );
};

var colors = ['rgb(34, 34, 34)', 'rgb(85, 85, 34)', 'rgb(85, 34, 85)', 'rgb(34, 85, 85)', 'rgb(34, 34, 85)', 'rgb(34, 85, 34)', 'rgb(85, 34, 34)'];

var randColor = function randColor() {
  var index = Math.floor(Math.random() * colors.length);
  return colors[index];
};

var setColor = function setColor() {
  var color = randColor();
  var bg = document.querySelector('#quote-box');
  console.log(color + ' = ' + bg.style.getPropertyValue('background-color'));
  while (color == bg.style.getPropertyValue('background-color')) {
    color = randColor();
  }

  bg.style.setProperty('background-color', color);
  var quote = document.querySelector('#text');
  quote.style.setProperty('color', color);
  var author = document.querySelector('#author');
  author.style.setProperty('color', color);
  var social = document.querySelector('#tweet-quote');
  social.style.setProperty('color', color);
  var button = document.querySelector('.button');
  button.style.setProperty('background-color', color);
};

var displayQuote = function displayQuote(quote) {
  var domContainer = document.querySelector('#quote-box');
  return ReactDOM.render(React.createElement(QuoteBox, { quote: quote.quote, author: quote.author }), domContainer);
};

var randomQuote = function randomQuote(quotes) {
  var randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

var render = function render(quotes) {
  displayQuote(randomQuote(quotes));
  setColor();
};

var getQuotes = function () {
  req = new XMLHttpRequest();
  req.open("GET", 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json', true);
  req.send();

  req.onload = function () {
    var quotes = JSON.parse(req.responseText).quotes;
    render(quotes);
    document.querySelector('#new-quote').addEventListener('click', function () {
      render(quotes);
    });
  };
}();