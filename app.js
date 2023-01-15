//Collection of possible quotes
const quotes = [
    'The quick brown fox jumps over the lazy dog',
    'Jaded zombies acted quaintly but kept driving their oxen forward',
    'My girl wove siz dozen plaid jackets before she quit',
    'The key to success is failure',
    'If there is no struggle, there is no progress',
    'The early bird catches the worm',
    "Don't let yesterday take up too much of today",
    'Wherever you go, go with all your heart',
    "Believe you can and you're halfway there",
    'Not all who wonder are lost',
    'Change is inevitable. Growth is optional',
    'Oh yes, the past can hurt. But you can either run from it, or learn from it',
    'You sit on a throne of lies',
    'Happiness can be found even in the darkest of times, if one only remembers to turn on the light',
    "I'm gonna make him an offer he can't refuse",
    "Life is like a box of chocolates, you never know what you're gonna get"
];

//Function to pick the new quote
function pickQuote(current) {
    let newQuote = quotes[Math.floor(Math.random() * quotes.length)];

    while(newQuote == current) {
        newQuote = quotes[Math.floor(Math.random() * quotes.length)];
        console.log('same');
    }

    console.log('different');
    return newQuote;
}

//Pick a current quote
let quote = pickQuote(0);

//To iterate over the quote
let i = 0; 

//Event listener for when a key is pressed
document.addEventListener('keyup', 
    function(e) {
        //Compare if the correct key is pressed
        if(e.key === quote[i]) {
           console.log('correct');
           i++;

           if(i === quote[i].length) {
            i = 0;
            quote.pickQuote(quote);
           }
           
        } else {
           console.log('incorrect');
        }
        e.preventDefault();
});

/*
*/