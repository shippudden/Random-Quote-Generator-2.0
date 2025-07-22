let quoteText = document.getElementById("quote-text");
let quoteAuthor = document.getElementById("quote-author");
let button = document.getElementById("new-quote");
let copyButton = document.getElementById("copy-quote");
let addButton = document.getElementById("add-quote");
let copyMsg = document.getElementById("copy-msg");
let quoteContent = document.getElementById("quote-content");

// modal elements
let modalOverlay = document.getElementById("modal-overlay");
let modal = document.getElementById("modal");
let modalCloseButton = document.getElementById("close-modal");
let saveButton = document.getElementById("save-quote");
let saveMsg = document.getElementById("save-msg");
let customQuoteInput = document.getElementById("custom-quote");
let customAuthorInput = document.getElementById("custom-author");
let errorMsg = document.getElementById("error-msg");
let errMsg = document.getElementById("err-msg");
let shapes = document.querySelectorAll('.shape');

// Create particles in the background
// This function creates a specified number of particles and appends them to the background element
function createParticles(num = 50) {
  const bg = document.getElementById('particle-background');
  for (let i = 0; i < num; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 6 + 2;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${Math.random() * 100}%`;
    p.style.animationDuration = `${5 + Math.random() * 10}s`;
    bg.appendChild(p);
  }
}
createParticles();


const quotes = [
    {
        text: "The only limit to our realization of tomorrow is our doubts of today.",
        author: "- Franklin D. Roosevelt"
    },

    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "- Eleanor Roosevelt"
    },

    {
        text: "Do not wait to strike till the iron is hot, but make it hot by striking.",
        author: "- William Butler Yeats"
    }, 

    {
        text: "The best way to predict the future is to create it.",
        author: "- Peter Drucker"
    },

    {
        text: "You cannot escape the responsibility of tomorrow by evading it today.",
        author: "- Abraham Lincoln"
    },

    {
        text: "The future depends on what you do today.",
        author: "- Mahatma Gandhi"
    },

    {
        text: "Your future is created by what you do today, not tomorrow.",
        author: "- Robert Kiyosaki"
    },

    {
        text: "The only way to do great work is to love what you do.",
        author: "- Steve Jobs"
    },

    {
        text: "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
        author: "- Albert Schweitzer"
    },

    {
        text: "The future belongs to those who prepare for it today.",
        author: "- Malcolm X"
    },

    {
        text: "The best way to predict your future is to create it.",
        author: "- Abraham Lincoln"
    },

    {
        text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
        author: "- Ralph Waldo Emerson"
    }
]

// load quotes from localStorage if available
let storedQuotes = localStorage.getItem('quotes');
if(storedQuotes) {
    try {
        const parsedQuotes = JSON.parse(storedQuotes);
        if(Array.isArray(parsedQuotes)) {
            quotes.length = 0; // Clear the existing quotes array
            // Add the parsed quotes to the quotes array
            quotes.push(...parsedQuotes);
        }
    } catch (error) {
        console.error("Error parsing stored quotes:", error);
    }
}

// This function handles the saving of custom quotes. It pushes the custom quote and author into the quotes array after vallidation.
saveButton.addEventListener('click', () => {
    let customQuote = customQuoteInput.value.trim();
    let customAuthor = customAuthorInput.value.trim();

    if(customQuote === '') {
        errorMsg.textContent = "Quote cannot be empty!";
        errorMsg.style.display = 'block';
        errorMsg.style.color = 'red';
        return;
    } else if(customAuthor === '') {
        errMsg.textContent = "Author cannot be empty!";
        errMsg.style.display = 'block';
        errMsg.style.color = 'red';
        return;
    } else {
        errorMsg.style.display = 'none';
        errMsg.style.display = 'none';

        // Add the custom quote to the quotes array
        // Ensure the quote is not already in the array
        quotes.push({
            text: customQuote,
            author: `- ${customAuthor}`
        });

        localStorage.setItem('quotes', JSON.stringify(quotes)); // Save to localStorage

        saveMsg.textContent = "Quote added successfully!";
        saveMsg.style.display = 'block';

        // Clear the input fields and closes the modal after saving
        customQuoteInput.value = '';
        customAuthorInput.value = '';

        setTimeout(() => {
            saveMsg.style.display = 'none';
            modalOverlay.classList.add('hidden');
        }, 1000); // hides after 1 second
    }
});



addButton.addEventListener('click', () => {
    modalOverlay.classList.add('active');
})

document.addEventListener('click', (event) => {
    if(event.target === modalOverlay || event.target === modalCloseButton) {
        modalOverlay.classList.remove('active');
    }
})

// This function generates a random RGB color and returns it as an object with r, g, b values and a color string.
// It is used to change the background color of the page and the text color of the quote
function getRandomColor () {
    const r = Math.floor(Math.random() * 256); // red
    const g = Math.floor(Math.random() * 256); // green
    const b = Math.floor(Math.random() * 256); // blue
    return {
        color: `rgb(${r}, ${g}, ${b})`,
        r, g, b
    };
}

let lastQuoteIndex = -1; // to track the last shown quote index

// This function shows a random quote from the quotes array and updates the background color.
// It also ensures that the same quote is not shown consecutively.
// it calculates the brightness of the background color to adjust the text color for better contrast.
// It also updates the color of the particles and shapes to match the text color.
function showRandomQuote () {
        quoteContent.classList.remove('show')

        setTimeout(() => {
        let randomIndex
        do{
            randomIndex = Math.floor(Math.random() * quotes.length);
        } while (quotes.length > 1 && randomIndex === lastQuoteIndex); // ensure a different quote is shown
        lastQuoteIndex = randomIndex; // update the last shown index
        quoteText.textContent = quotes[randomIndex].text;
        quoteAuthor.textContent = quotes[randomIndex].author;

        const { color, r, g, b } = getRandomColor()
        document.body.style.backgroundColor = color

        let brightness = (r * 299 + g * 587 + b * 114) / 1000;
        let textColor = brightness > 125 ? '#000' : '#fff';
        
        // Make particles adapt to contrast (same as text)
        const particles = document.querySelectorAll('.particle');
        particles.forEach(p => {
        p.style.backgroundColor = textColor;
        });

        shapes.forEach(shape => {
            shape.style.backgroundColor = textColor;
        });
        quoteText.style.color = textColor;
        quoteAuthor.style.color = textColor;
        button.style.color = textColor;
        addButton.style.color = textColor;
        copyMsg.style.color = textColor;
        copyButton.style.color = textColor;
        quoteContent.classList.add('show');
    }, 300); // delay to allow the fade-out effect to complete
}
showRandomQuote();

let quoteInterval = setInterval(showRandomQuote, 10000); // change quote every 10 seconds

button.addEventListener("click", () => {
    showRandomQuote(); // change quote on button click
});

copyButton.addEventListener("click", () => {
    let fullQuote = `"${quoteText.textContent}" - ${quoteAuthor.textContent}`;
    navigator.clipboard.writeText(fullQuote).then(() => {
        copyMsg.style.display = "inline";
        copyMsg.innerText = "Quote copied to clipboard!";

        setTimeout(() => {
            copyMsg.style.display = 'none'
        }, 1500); // hides after 1.5 seconds
        
    }).catch(err => {
        copyMsg.style.display = 'inline'
        copyMsg.innerText = 'Failed to copy quote' 
        console.error(err);
    });
});