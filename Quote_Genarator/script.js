const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
var countTestErr = 0;
/*show loading*/
function showLoadingSpinner() {
    //console.log('starting');
    loader.hidden = false;
    quoteContainer.hidden = true;
}

/*hidding loading*/
function removeLoadingSpinner() {
    if (!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
        //console.log('ended');
    }
}

// Get Quote From API
async function getQuote() {
    showLoadingSpinner();
    //console.log('we are in getQuote');
    //const apiUrl = 'https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en';
    //const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    //const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    const apiUrl = 'https://type.fit/api/quotes';


    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const index = Math.floor((Math.random() * 1643) + 1);
        const getData = data[index];
        if (data.authorText === '') {
            authorText.innerText = 'Unknow';
        } else authorText.innerText = getData.author;
        
        if (getData.text.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = getData.text;

        /* Simulate the error in real case */
        if (countTestErr < 10) {
            /* The way to create an error for testing some cases*/
            throw new Error('opps');
        } else {
            countTestErr = 0;
            removeLoadingSpinner();
        }    
    } catch(err) {
        countTestErr ++;
        console.log(`whoops, cann't get quote ${err}`);
        getQuote();
    }
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitter = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitter, '_blank');
}

twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click',  getQuote);
getQuote();