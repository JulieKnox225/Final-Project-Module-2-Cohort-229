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
        for(let i = 0; i < quoteArr.length; i++) {
            quoteArr[i].remove();
        }

        quoteArr =[];
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
        mistake.innerText = `Mistakes: ${counter}`;
    }
    
    //Method to change the appearance of the correctly typed char to make it obvious it is correct
    static update(i) {

        quoteArr[i].className = 'correct';

    }
    
    //Method to update the on screen counter for completed quotes
    static updateQuoteCounter(counter) {
        let completed = document.querySelector('.counter');
    
        completed.innerText = `Completed: ${counter}`;
    
    }
    
    static updateWPM(timeElapsed, cpm) {
        let wpm = Math.round(((cpm / 5)) / timeElapsed);

        let div = document.querySelector('.wpm');
    
        div.innerText = `Word per Min: ${wpm}`;
    
    }

    /*FULL CREDIT TO https://www.geeksforgeeks.org/design-a-typing-speed-test-game-using-javascript/*/
    static finishGame() {   
        // stop the timer
        clearInterval(timer);
    
        Quotes.deleteQuote();
        Quotes.displayQuote("TIMER'S DONE. PLEASE REFRESH PAGE");
            
        // calculate cpm and wpm
        let cpm = Math.round(((charTyped / timeElapsed) * 60));
        let wpm = Math.round((((charTyped / 5) / timeElapsed) * 60));
     
        document.querySelector('.wpm').innerText = `Words per Min: ${wpm}`;
    }

    static updateTimer() {
        if (timeLeft > 0) {
            // decrease the current time left
            timeLeft--;
        
            // increase the time elapsed
            timeElapsed++;
        
            // update the timer text
            document.querySelector('.timer').innerText = `Timer: ${timeLeft}s`;
        }
        else {
            // finish the game
            Quotes.finishGame();
        }
    }
    /*END CREDIT TO https://www.geeksforgeeks.org/design-a-typing-speed-test-game-using-javascript/*/
}

//Pick a current quote
let quote = new Quotes;
quote = quote.pickQuote();
Quotes.displayQuote(quote);

//NodeList of each char of the given quote
let quoteNodeList = document.querySelectorAll('span');

//Create an array from the nodelist
let quoteArr = Array.from(quoteNodeList);

//Timer for speed tracking CREDIT TO https://www.geeksforgeeks.org/design-a-typing-speed-test-game-using-javascript/
let TIME_LIMIT = 60;
let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let timer = null;
let charTyped = 0;

// clear old and start a new timer
clearInterval(timer);
timer = setInterval(Quotes.updateTimer, 1000);

/* Counters */
let i = 0; //To iterate over the quote

let incorrectCounterGen = 0; //To track how many mistakes are made on the quote

let numQuotes = 0; //Track how many quotes have been typed

//Event listener for when a key is pressed
document.addEventListener('keypress', 
    function(e) {
        charTyped++;

        //Compare if the correct key is pressed
        if(e.key === quoteArr[i].firstChild.textContent) {
            //removes all mistake indicators
            Quotes.update(i);
            
            //increases iterator 
            i++;

        } else {
            incorrectCounterGen++;
            Quotes.incorrect(i, incorrectCounterGen, numQuotes);
        }
        
        if(i === quote.length) {            
            //Delete old quote
            Quotes.deleteQuote();
            
            //Generate new quote
            let newQuote = new Quotes;
            newQuote = newQuote.pickQuote();
            
            //Set old quote equal to new quote
            quote = newQuote;
            
            //Display new quote
            Quotes.displayQuote(newQuote);
            
            //Make a new nodelist to put the new quote spans into
            let newQuoteNodeList = document.querySelectorAll('span');
            
            //Set prev array to the new quote nodelist
            let newQuoteArr = Array.from(newQuoteNodeList);
            quoteArr = newQuoteArr;
            
            //Reset and Update counters
            numQuotes++;
            Quotes.updateQuoteCounter(numQuotes);
            i = 0;
        }

        e.preventDefault();
    });