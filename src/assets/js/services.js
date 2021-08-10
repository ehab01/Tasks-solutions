
const getCountries = (async () => {
    const url ='https://restcountries.eu/rest/v2/';
    const response = await fetch(url);
    const result = await response.json();
  
    return result;
  })();

  const getNews = async (country) => {
     const key ='cc3718b24935490ca9f0a7940843036a';
    const url =`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${key}`;
    const response = await fetch(url);
    const result = await response.json();
  
    return result;
  };
  