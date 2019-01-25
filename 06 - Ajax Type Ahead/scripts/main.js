(async function() {
  // Get DOM Elements
  const searchInput = document.getElementById('searchInput');
  const containerList = document.getElementById('containerList');
  const loader = document.getElementById('loader');

  // Functions
  const removeLoader = () => {
    searchInput.removeAttribute('disabled');
    searchInput.setAttribute('placeholder', 'Filter: city or state');
    loader.remove();
  };

  const showError = () => {
    searchInput.setAttribute('placeholder', 'Something went wrong.');
    
    loader.remove();
  };

  const fetchCities = async () => {
    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
    
    try {
      const response = await fetch(endpoint);
      const cities = await response.json();

      return cities;
    } catch(error) {
      console.error(error);
      showError();
    } finally {
      removeLoader();
    };
  };
  
  const citiesArr = await fetchCities();

  const getCities = () => citiesArr;

  // Solution with Recursion - slow
  // const highlightText = (input, partial) => {
  //   if (Array.isArray(input) === true) {
  //     input = input.join('');
  //   } else if (typeof input !== 'string') {
  //     throw new Error('Input must be a string or array.');
  //   };

  //   partial = partial.toUpperCase();
  //   const result = [];

  //   const helperFunction = (string) => {
  //     if (string.length > 0) {
  //       const stringArr = string.split('');
  //       const capitalString = string.toUpperCase();
  //       const idx = capitalString.indexOf(partial);

  //       if (idx >= 0) {
  //         const remain = stringArr.splice(idx + partial.length, stringArr.length).join('');
  //         stringArr.splice(idx, 0, '<span>');
  //         stringArr.push('</span>');

  //         result.push(stringArr.join(''));
  //         helperFunction(remain);
  //       } else {
  //         result.push(stringArr.join(''));
  //       };
  //     };

  //     return false;
  //   };

  //   helperFunction(input);

  //   return result.join('');
  // };

  // Faster solution
  const highlightText = (input, value) => {
    const inputSplit = input.toLowerCase().split(value.toLowerCase());
    let inputIndex = inputSplit[0].length;
    let result = input.substring(0, inputSplit[0].length);

    for (let i = 1; i < inputSplit.length; i++) {
        const highlightLength = inputIndex + value.length;
        result += `<span class="hl">${input.substring(inputIndex, highlightLength)}</span>${input.substring(highlightLength, highlightLength + inputSplit[i].length)}`;
        inputIndex = highlightLength + inputSplit[i].length;
    };

    return result;
  };

  const filterCities = (string) => {
    return getCities().filter((e) => {
      const regex = new RegExp(string, 'gi');

      const cityIncludes = e.city.match(regex);
      const stateIncludes = e.state.match(string);
      
      if (cityIncludes || stateIncludes) {
        return true;
      };

      return false;
    });
  };

  const createListDom = ({ filteredCities, value }) => {
    const citiesList = document.createElement('ul');

    filteredCities.forEach((e) => {
      const listEl = document.createElement('li');
      const nameDiv = document.createElement('div');

      const city = highlightText(e.city, value);
      const state = highlightText(e.state, value);

      nameDiv.innerHTML = `${city}, ${state}`;
      listEl.appendChild(nameDiv);

      const populationDiv = document.createElement('div');
      populationDiv.innerText = e.population;
      listEl.appendChild(populationDiv);

      citiesList.appendChild(listEl);
    });

    return citiesList;
  };

  const renderListToDom = (details) => {
    const listDom = createListDom(details);

    containerList.innerHTML = '';
    containerList.appendChild(listDom);
  };
  
  const handleInputOnChange = (e) => {
    const value = e.target.value.trim();
    let filteredCities = [];

    if (value.length > 0 && value !== '') {
      filteredCities = filterCities(value);
    };
    
    renderListToDom({ filteredCities, value });
  };

  searchInput.addEventListener('input', handleInputOnChange);

  
}());