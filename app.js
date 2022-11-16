const randBttn = document.querySelector("#randBttn");
const titleHolder = document.querySelector("#animeTitle");
const characterHolder = document.querySelector("#animeCharacter");
const quoteHolder = document.querySelector("#animeQuote");
const quoteContainer = document.querySelector("#quoteContainer");
const searchField = document.querySelector("#searchField");
const searchBttn = document.querySelector("#searchBttn");
const dummyContainer = document.querySelector("#dummyContainer");

randBttn.addEventListener("click", async () => {
  try {
    const res = await axios.get("https://animechan.vercel.app/api/random");
    let animeName = res.data.anime;
    let character = res.data.character;
    let quote = res.data.quote;
    addQuote(animeName, character, quote);
  } catch (e) {
    console.log("ERROR: " + e);
    alert("To many request sent, ERROR: " + e);
  }
});

searchBttn.addEventListener("click", async () => {
  const URL = "https://animechan.vercel.app/api/quotes/anime?title=";
  try {
    let title = searchField.value;
    const res = await axios.get(URL + title);
    let randQuote = Math.floor(Math.random() * res.data.length);

    addQuote(
      res.data[randQuote].anime,
      res.data[randQuote].character,
      res.data[randQuote].quote
    );
  } catch (e) {
    console.log("ERROR: " + e);
    alert("Anime name not supported yet... sorry!");
  }
});

searchField.addEventListener("click", () => (searchField.value = null));

function addQuote(animeName, character, quote) {
  titleHolder.innerText = animeName;
  characterHolder.innerText = `- ${character}`;
  quoteHolder.innerText = quote;
  quoteContainer.hidden = false;
}

function addCard() {
  let newCard = document.createElement("div");
  newCard.innerHTML = dummyContainer.innerHTML;
  quoteContainer.append(newCard);
}
