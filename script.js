console.log('javascript is added');


const qContainer = document.getElementById('q_container');
const main = document.getElementById('main');
const quote = document.getElementById('quote');
const author = document.getElementById('author');
const loader = document.getElementById('loader');
// const qContainer = document.getElementsById('q_container');

// Show loader
function loading() {
	loader.hidden = false;
	main.hidden = true;
}

// Hide loader
function complete() {
	if (!loader.hidden) {
		loader.hidden = true;
		main.hidden = false;
	}
}

// Get/Fetching Quote from API
async function getQuote() {
	loading();
	// proxyUrl to fix CORS - Cross origin 
	// const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	// My own proxy
	const proxyUrl = 'https://young-taiga-42739.herokuapp.com/';
	const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
	try {
		const response = await fetch(proxyUrl + apiUrl);
		const data = await response.json();

		// console.log(data);

		quote.innerText = data.quoteText;
		if (data.quoteText.length > 50) {
			quote.classList.add('long-quote');
		} else {
			quote.classList.remove('long-quote');
		}

		// if no author write unknown
		if (author.innerText === "") {
			author.innerText = "Unknown Author"
		} else {
			author.innerText = data.quoteAuthor;
		}
		// Stop Loader & Show Quote
		complete();
	} catch (error) {
		console.log('Whoops, no quote found', error)
	}
}
// Tweet Quote
function tweetQuote() {
	const tQuote = quote.innerText;
	const tAuthor = author.innerText;
	const twitterUrl = `https://twitter.com/intent/tweet?text=${tQuote} - ${tAuthor}`;

	window.open(twitterUrl, '_blank');
}
// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);



// Onload Page
getQuote();
// loading();