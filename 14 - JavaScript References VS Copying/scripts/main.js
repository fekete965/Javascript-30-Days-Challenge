(function() {
  // start with strings, numbers and booleans

  // Let's say we have an array
  const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];

  // and we want to make a copy of it.
  // const playersCopy = players;
  // console.log(players);
  // console.log(playersCopy);

  // You might think we can just do something like this:
  // playersCopy[0] = 'Tom';
  // console.log(players);
  // console.log(playersCopy);

  // however what happens when we update that array?
  // now here is the problem!
  // oh no - we have edited the original array too!
  // Why? It's because that is an array reference, not an array copy. They both point to the same array!
  // So, how do we fix this? We take a copy instead!

  // one way
  // const arr1 = players.slice();

  // or create a new array and concat the old one in
  // const arr2 = [].concat(players);

  // or use the new ES6 Spread
  // const arr3 = [...players];

  // now when we update it, the original one isn't changed
  // arr3[0] = 'Tom';
  // console.log(players);
  // console.log(arr3);

  // The same thing goes for objects, let's say we have a person object

  // with Objects
  // const person = {
  //   name: 'Wes Bos',
  //   age: 80
  // };

  // and think we make a copy:
  // const person2 = person;

  // how do we take a copy instead?
  // const person2 = Object.assign({}, person);
  // console.log('P1', person);
  // console.log('P2', person2);

  // person2.age = 100;
  // console.log('P1', person);
  // console.log('P2', person2);

  // We will hopefully soon see the object ...spread
  // const person3 = {
  //   ...person
  // };

  // Object.assign only copy the object until the 1. level
  // Little "cheat" ---> stringify the object then parse it (can cause perfomance issues)
  // const person4 = JSON.parse(JSON.stringify(person));

  // Things to note - this is only 1 level deep - both for Arrays and Objects. lodash has a cloneDeep method, but you should think twice before using it.

}());