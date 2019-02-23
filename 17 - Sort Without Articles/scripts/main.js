(function() {
  const bandsContainer = document.getElementById('bands');

  const bands = [
    'The Plot in You',
    'The Devil Wears Prada',
    'Pierce the Veil',
    'Norma Jean',
    'The Bled',
    'Say Anything',
    'The Midway State',
    'We Came as Romans',
    'Counterparts',
    'Oh, Sleeper',
    'A Skylit Drive',
    'Anywhere But Here',
    'An Old Dog'
  ];

  
  // Solution 1- using array
  // const articles = ['a', 'an', 'the'];
  // const sortedBands = bands.sort((bandA, bandB) => {
  //   const aTemp = bandA.split(' ');
  //   const bTemp = bandB.split(' ');

  //   const a = articles.indexOf(aTemp[0].toLowerCase()) > -1 ? aTemp[1] : aTemp[0];
  //   const b = articles.indexOf(bTemp[0].toLowerCase()) > -1 ? bTemp[1] : bTemp[0];

  //   // With ternary
  //   return a > b ? 1 : a < b ? -1 : 0;

  // Regular way
  //   // if (a > b) {
  //   //   return 1;
  //   // } else if (a < b) {
  //   //   return -1
  //   // } else {
  //   //   return 0;
  //   // };
  // });

  // Solution 2 - using Regexp
  const strip = (bandName) => {
    return bandName.replace(/^(a |the |an )/i, '').trim();
  };

  const sortedBands = bands.sort((bandA, bandB) => {
    const a = strip(bandA);
    const b = strip(bandB);

    // Using ternary
    return a > b ? 1 : a < b ? -1 : 0;

    // Regular way
    // if (a > b) {
    //   return 1;
    // } else if (a < b) {
    //   return -1
    // } else {
    //   return 0;
    // };
  });

  sortedBands.forEach((band) => {
    const li = document.createElement('li');
    li.textContent = band;

    bandsContainer.appendChild(li);
  });
}());