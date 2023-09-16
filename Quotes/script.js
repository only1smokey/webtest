document.addEventListener("DOMContentLoaded", function() {
    fetchQuote();
});

function fetchQuote() {
    fetch('https://api.quotable.io/random')
    .then(response => response.json())
    .then(data => {
        document.getElementById('dailyQuote').textContent = `"${data.content}"`;
        document.getElementById('quoteAuthor').textContent = `- ${data.author}`;
    })
    .catch(error => {
        document.getElementById('dailyQuote').textContent = "Unable to fetch the quote. Please try again later.";
    });
}

// Call the fetchQuote function when the button is clicked to get a new quote


