(function() {
  //Array Cardio Day 2
  const people = [
    { name: 'Wes', year: 1988 },
    { name: 'Kait', year: 1986 },
    { name: 'Irv', year: 1970 },
    { name: 'Lux', year: 2015 }
  ];

  const comments = [
    { text: 'Love this!', id: 523423 },
    { text: 'Super good', id: 823423 },
    { text: 'You are the best', id: 2039842 },
    { text: 'Ramen is my fav food ever', id: 123523 },
    { text: 'Nice Nice Nice!', id: 542328 }
  ];

  // Some and Every Checks

  const checkAge = (yearOfDob, targetAge) => {
    if (typeof yearOfDob !== 'number' || typeof targetAge !== 'number') {
      throw new Error('Input has to be a number');
    };
    const currentYear = new Date().getFullYear();
    const age = currentYear - yearOfDob;

    return age >= targetAge;
  };

  // Array.prototype.some() // is at least one person 19 or older?
  const atLeastOne = people.some((person) => checkAge(person.year, 19));
  console.log(`Is at least one person 19 or older? --> ${atLeastOne}`);
  
  // Array.prototype.every() // is everyone 19 or older?
  const everyone = people.every((person) => checkAge(person.year, 19))
  console.log(`Is at least one person 19 or older? --> ${everyone}`);
  
  
  // Find is like filter, but instead returns just the one you are looking for
  
  // Array.prototype.find() // find the comment with the ID of 823423
  const targetId1 = 823423;
  const target1 = comments.find((comment) => comment.id === targetId1);
  console.log('comment with the ID of 823423:');
  console.log(target1);
  
  
  // Array.prototype.findIndex() // Find the comment with this ID 823423
  const targetId2 = 823423;
  const idx = comments.findIndex((comment) => comment.id === targetId2);
  console.log(`Comment's index: ${idx}`);

  // delete the comment with the ID of 823423
  console.log(`Comments array after removal:`);
  comments.splice(idx, 1);

  console.log(comments);
}());