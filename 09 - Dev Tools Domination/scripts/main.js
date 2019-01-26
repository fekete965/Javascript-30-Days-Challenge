(function() {
  const dogs = [{ name: 'Snickers', age: 2 }, { name: 'Hugo', age: 8 }];

  const p = document.getElementById('myParagraph');

  const makeGreen = (e) => {
    e.target.style.color = '#BADA55';
    e.target.style.fontSize = '50px';
  };

  p.addEventListener('click', makeGreen);

  // Regular
  console.log('Hello! :)');
  
  // Interpolated
  console.log('Hello! I am a %s string!', 'DUCK');


  // Styled
  console.log('%cI am a Styled message.', 'color: purple');

  // warning!
  console.warn('I am a Warning message.');

  // Error :|
  console.error('I am an Error message.');

  // Info
  console.info('I am an Info message.');

  // Testing
  console.assert(1 === 2, 'That is wrong.');

  // Clearing
  // console.clear();
  
  // Viewing DOM Elements
  console.dir(p);

  // Grouping together
  dogs.forEach((dog) => {
    // console.group(`${dog.name}`);
    console.groupCollapsed(`${dog.name}`);
      console.log(`This is ${dog.name}`);
      console.log(`${dog.name} is ${dog.age} year(s) old.`);
      console.log(`${dog.name} is ${dog.age * 7} dog year(s) old.`);
    console.groupEnd(`${dog.name}`);
  });

  // counting
  console.count('Wes');
  console.count('Mark');
  console.count('Wes');
  console.count('Mark');
  console.count('Mark');
  console.count('Wes');
  console.count('Wes');
  console.count('Mark');

  // timing
  console.time('Fetching Data');
  fetch('https://restcountries.eu/rest/v2/all')
  .then((res) => res.json())
  .then((json) => {
    console.timeEnd('Fetching Data');
    console.table(json);
  }).catch((err) => {
    console.log(err);
  });


}());