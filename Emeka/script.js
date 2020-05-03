let btn = document.getElementById('btn');
let quote = document.getElementById('quote');
let quotes = [
  'You\'re an epitome of beauty.',
  'You\'re a manifestation of God\'s faithfulness',
  'I thank God for enabling our meeting.',
  'I thank God for His mercies, kindness and goodness over you',
   'You\'re amazing',
  "Thanks for being a shoulder I can depend on.",
  'You\'ve always believed in me. Thank you',
  'Thanks for a truckload of Good, Fun times',
  'Your friendship means a lot to me. Just wanted to let you know!',
  'Thank you for showing me that there are people like you in this world',
  'God gave me such an amazing blessing when he placed you in my life. I\'m grateful',
  'I love you.',
];


btn.addEventListener('click', function() {
  var randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
quote.innerHTML = randomQuote;
})

document.getElementById('btn').onclick = function(){
    quotes.classList.toggle('fade');
  }