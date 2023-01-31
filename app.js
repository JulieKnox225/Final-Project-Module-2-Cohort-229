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
        const above = document.querySelector('.quote');

        /** CREDIT TO https://www.geeksforgeeks.org/design-a-typing-speed-test-game-using-javascript/  */
        // separate each character and make an element out of each of them to individually style them
        quote.split('').forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.innerText = char;
            above.appendChild(charSpan);
        });

        /**END OF CREDIT TO https://www.geeksforgeeks.org/design-a-typing-speed-test-game-using-javascript/ */
    }

    //Method to remove the old quote from HTML
    static deleteQuote() {
        //WRONG! MAKES INFINITE LOOP OR SOMETHING?
        while(document.querySelector('span') !== null) {
            document.querySelector('span').remove();
        }
        
    }
    
    //Method to indicate missed letter (see devLog)
    static incorrect(i, counter, numQuotes) {
        //Find the missed char
        let missedLetter = quoteArr[i];

        //Give it the proper class name so CSS style will apply (change text to red)
        missedLetter.className = 'incorrect';

        //If the char is a space, it will highlight the background
        if(missedLetter.firstChild.textContent == ' ') {
            missedLetter.className = 'space';
        }
    
        //Updates mistake counter
        let mistake = document.querySelector('.mistake-counter');
        mistake.innerText = `Total Number of Mistakes: ${counter}`;
    }
    
    //Method to remove the incorrect class name from the corrected char
    static reset() {
        if(document.querySelector('.incorrect') !== null) {
            document.querySelector('.incorrect').classList = '';
        } else if(document.querySelector('.space') !== null) {
            document.querySelector('.space').classList = '';
        }
    }
    
    //Method to update the on screen counter for completed quotes
    static updateQuoteCounter(counter) {
        let div = document.querySelector('.counter');
    
        div.innerText = `How Many Quotes Completed: ${counter}`;
    
        if(document.querySelector('.remove') !== null) {
            document.querySelector('.remove').remove();
        }
    }
    
}

//Pick a current quote
let quote = new Quotes;
quote = quote.pickQuote();
Quotes.displayQuote(quote);

//Array of each char of the given quote
let quoteArr = document.querySelectorAll('span');

/* Counters */
let i = 0; //To iterate over the quote

let incorrectCounterGen = 0; //To track how many mistakes are made on the quote

let numQuotes = 0; //Track how many quotes have been typed


//Event listener for when a key is pressed
document.addEventListener('keypress', 
    function(e) {
        //Compare if the correct key is pressed
        if(e.key === quoteArr[i].firstChild.textContent) {
            //removes all mistake indicators
            Quotes.reset();

            //increases iterator 
            i++;
        } else {
            incorrectCounterGen++;
            Quotes.incorrect(i, incorrectCounterGen, numQuotes);
        }
        
        if(i === quote.length) {            
            //Generate new quote
            let newQuote = new Quotes;
            newQuote = newQuote.pickQuote();

            //Set old quote equal to new quote
            quote = newQuote;

            //Delete old quote
            Quotes.deleteQuote();

            //Display new quote
            Quotes.displayQuote(newQuote);

            //Reset and Update counters
            numQuotes++;
            Quotes.updateQuoteCounter(numQuotes);
            i = 0;
        }
        e.preventDefault();
    });