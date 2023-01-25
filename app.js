class Quotes {
    //Collection of possible quotes
    constructor() {
        this.quoteCollection = [
            'The quick brown fox jumps over the lazy dog',
            'Jaded zombies acted quaintly but kept driving their oxen forward',
            'My girl wove six dozen plaid jackets before she quit',
            'The key to success is failure',
            'If there is no struggle, there is no progress',
            'The early bird catches the worm',
            "Don't let yesterday take up too much of today",
            'Wherever you go, go with all your heart',
            "Believe you can and you're halfway there",
            'Not all who wander are lost',
            'Change is inevitable. Growth is optional',
            'Oh yes, the past can hurt. But you can either run from it, or learn from it',
            'You sit on a throne of lies',
            'Happiness can be found even in the darkest of times, if one only remembers to turn on the light',
            "I'm gonna make him an offer he can't refuse",
            "Life is like a box of chocolates, you never know what you're gonna get"
        ];
    }
    
    //Method to pick the new quote
    pickQuote() {
        return this.quoteCollection[Math.floor(Math.random() * this.quoteCollection.length)];
    }
        
    //Method to display current quote
    static displayQuote(quote) {
        //The element right above where the quote should be
        const above = document.getElementById('header');

        //The element to be added which consists of the new quote
        const addition = document.createElement('p');
        addition.className = 'current';

        addition.innerText = quote;
        
        //Add quote under heading
        above.appendChild(addition);
    }

    //Method to remove the old quote from HTML
    static deleteQuote() {
        let old = document.querySelector('p');
        old.remove();
    }
}

//Function to indicate missed letter (see devLog)
function incorrect(i) {
    //changes the whole quote red
    let missed = document.querySelector('p');
    missed.className = 'current incorrect';

    //the missed letter
    let missedLetter = document.querySelector('p').innerText[i];

    //creates another p tag to display missed letter under quote
    let addition = document.createElement('p');
    addition.className = 'missed-letter'
    addition.innerText = missedLetter;

    missed.appendChild(addition);
}

function reset() {
    let current = document.querySelector('p');
    current.className = 'current';


    if(document.querySelector('.missed-letter') !== null) {
        document.querySelector('.missed-letter').remove();
    }
}

//Pick a current quote
let quote = new Quotes;
quote = quote.pickQuote();
Quotes.displayQuote(quote);
console.log(quote.length);

//TEST ZONE

//END TEST ZONE

//To iterate over the quote
let i = 0; 

//To track how many mistakes are made on a char
let incorrectCounter = 0;

//Event listener for when a key is pressed
document.addEventListener('keypress', 
    function(e) {
        //Compare if the correct key is pressed
        if(e.key === quote[i]) {
            //removes all mistake indicators
            while(incorrectCounter > 0) {
                reset();
                incorrectCounter--;
            }
            i++;
        } else {
            incorrectCounter++;
            incorrect(i);
        }
        
        if(i === quote.length) {
            //Two ways of picking new quotes (see devlog):

            //reload page
            //this.location.reload();

            //Pick new quote, and remove prev quote
            /*
            //Generate new quote
            let newQuote = new Quotes;
            newQuote = newQuote.pickQuote();

            //Delete old quote
            Quotes.deleteQuote();

            //Display new quote
            Quotes.displayQuote(newQuote);

            //Reset counter
            i = 0;
            */
        }
        e.preventDefault();
    });