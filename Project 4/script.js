const factParagraph = document.getElementById("fact");
const generateButton = document.getElementById("generate");

// Function to handle API calls and error gracefully
async function fetchRandomFact() {
    const apis = [
        "https://api.chucknorris.io/jokes/random",
        "https://api.theysaidso.com/api/quotes/random",
        "https://api.adviceslip.com/advice",
        "https://api.quotable.io/random"
    ];

    // Select a random API from the list
    const randomApi = apis[Math.floor(Math.random() * apis.length)];
    
    try {
        const response = await fetch(randomApi);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Display the appropriate data based on the API response structure
        if (randomApi === "https://api.chucknorris.io/jokes/random") {
            factParagraph.textContent = data.value;
        } else if (randomApi === "https://api.theysaidso.com/api/quotes/random") {
            factParagraph.textContent = data.quote;
        } else if (randomApi === "https://api.adviceslip.com/advice") {
            factParagraph.textContent = data.slip.advice;
        } else if (randomApi === "https://api.quotable.io/random") {
            factParagraph.textContent = data.content;
        }
    } catch (error) {
        console.error('Failed to fetch fact:', error);
        // Show a generic error message
        factParagraph.textContent = "Failed to fetch a fact. Please try again!";
    }
}

// Attach the event listener to the button
generateButton.addEventListener("click", fetchRandomFact);

// Optionally load an initial fact on page load
document.addEventListener("DOMContentLoaded", fetchRandomFact);
