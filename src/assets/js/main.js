//self invoked function to load countries and render it as soon as page loaded

(function () {
  getCountries.then((countries) => {
    countries;
    var template = document.getElementById("template").innerHTML;
    var rendered = Mustache.render(template, countries);

    document.getElementById("target").innerHTML = rendered;

    hideSpinner("main-spinner");
    loadGlider();
  });
})();

//this function called by card click and we get card id and then render the country then render news
function getCountryWithId(id) {
  showSpinner("news-spinner");
  getCountries.then((countries) => {
    var selectedCountry = countries.find((country) => {
      return country.name === id;
    });

    var neighbors = countries
      .filter((country) => {
        return (
          country.region === selectedCountry.region &&
          country.subregion === selectedCountry.subregion
        );
      })
      .map(function (country) {
        return country.name;
      });

    selectedCountry.neighbors = neighbors;

    var template = document.getElementById("country-card").innerHTML;
    var rendered = Mustache.render(template, selectedCountry);

    document.getElementById("card-target").innerHTML = rendered;
    renderNews(selectedCountry.alpha2Code);
  });
}
//for rendering news for selected country
function renderNews(countryCode) {
  getNews(countryCode).then((news) => {
    news;
    var template = document.getElementById("news-card").innerHTML;
    var rendered = Mustache.render(template, news["articles"]);

    document.getElementById("news-target").innerHTML = rendered;

    hideSpinner("news-spinner");
  });
}

function hideSpinner(id) {
  document.getElementById(id).style.display = "none";
}
function showSpinner(id) {
  document.getElementById(id).style.display = "block";
}
