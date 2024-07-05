// ---------------
// VARIABLES
// ----------
const countriesContainer = document.querySelector(".countries-container");
const btnSort = document.querySelectorAll(".btnSort");
let dataCountries = [];
let sortMethod = "";

// ---------------
// FETCH
// ----------
async function fetchCountries() {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => (dataCountries = data));
  console.log(dataCountries);
  countriesDisplay();
}

// ---------------
// FONCTION
// ----------
const countriesDisplay = () => {
  countriesContainer.innerHTML = dataCountries
    // => FILTER method with inputSearch, use toLowerCase() to avoid the case
    .filter((country) =>
      country.translations.fra.common
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    )
    // => SORT method with btns
    .sort((a, b) => {
      if (sortMethod === "maxToMin") {
        return b.population - a.population;
      } else if (sortMethod === "minToMax") {
        return a.population - b.population;
      } else if ((sortMethod = "alpha")) {
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common
        );
      }
    })

    // => SLICE METHOD === .slice(startValue, endValue) here -> 0 to value of the input range
    .slice(0, inputRange.value)

    // => MAP METHOD -> Create a new array by applying a function to each element of the "original" array
    .map(
      (country) => `
  <div class="card">
  <img src=${country.flags.png} alt= "Drapeau ${
        country.translations.fra.common
      }">
  <h1>${country.translations.fra.common}</h1>
  <h2>${country.capital}</h2>
  <p>Population: ${country.population.toLocaleString()}</p>
  </div>
  `
    )
    .join("");
};

// ---------------
// ----------
window.addEventListener("load", fetchCountries);

// ------------
// EVENT
// ----------
// => SEARCHBAR EVENT with FILTER method
inputSearch.addEventListener("input", countriesDisplay);

// => INPUT RANGE EVENT with SLICE method
inputRange.addEventListener("input", () => {
  countriesDisplay();
  // => span "rangeValue" take the value of input range
  rangeValue.textContent = inputRange.value;
});

// => BTN EVENT with SORT method
btnSort.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    sortMethod = e.target.id;
    countriesDisplay();
  });
});
