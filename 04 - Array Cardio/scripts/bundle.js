(function () {
    "use strict";

    const inventors = [
      { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
      { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
      { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
      { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
      { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
      { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
      { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
      { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
      { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
      { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
      { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
      { first: 'Hanna', last: 'HammarstrÃ¶m', year: 1829, passed: 1909 }
    ];

    const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'];


    // Array.prototype.filter()
    // 1. Filter the list of inventors for those who were born in the 1500's
    const filtered = inventors.filter((inventor) => inventor.year >= 1500 && inventor.year < 1600);
    console.table(filtered);
    

    // Array.prototype.map()
    // 2. Give us an array of the inventors' first and last names
    const inventorsName = inventors.map((inventor) => `${inventor.first} ${inventor.last}` )
    console.table(inventorsName);


    // Array.prototype.sort()
    // 3. Sort the inventors by birthdate, oldest to youngest
    const ordered = inventors.sort((a, b) => {
        if (a.year > b.year) return 1;
        else if (a.year < b.year) return -1;
        else return 0;
    });
    console.table(ordered);


    // Array.prototype.reduce()
    // 4. How many years did all the inventors live?
    const totalYears = inventors.reduce((total, inventor) => {
        return total + (inventor.passed - inventor.year);
    }, 0);
    
    console.log(totalYears)


    // 5. Sort the inventors by years lived
    const oldest = inventors.sort((a, b) => {
        const aDeduct = a.passed - a.year;
        const bDeduct = b.passed - b.year;

        if (aDeduct > bDeduct) return 1;
        else if (bDeduct > aDeduct) return -1;
        else return 0;
    });

    console.table(oldest);


    // 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
    // https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris

    // const list = [
    //     "Boulevards of Paris",
    //     "City walls of Paris",
    //     "Thiers wall",
    //     "Wall of Charles V",
    //     "Wall of Philip II Augustus",
    //     "City gates of Paris",
    //     "Haussmann's renovation of Paris",
    //     "Boulevards of the Marshals",
    //     "Boulevard Auguste-Blanqui",
    //     "Boulevard Barbès",
    //     "Boulevard Beaumarchais",
    //     "Boulevard de l'Amiral-Bruix",
    //     "Boulevard des Capucines",
    //     "Boulevard de la Chapelle",
    //     "Boulevard de Clichy",
    //     "Boulevard du Crime",
    //     "Boulevard Haussmann",
    //     "Boulevard de l'Hôpital",
    //     "Boulevard des Italiens",
    //     "Boulevard de la Madeleine",
    //     "Boulevard de Magenta",
    //     "Boulevard Montmartre",
    //     "Boulevard du Montparnasse",
    //     "Boulevard Raspail",
    //     "Boulevard Richard-Lenoir",
    //     "Boulevard de Rochechouart",
    //     "Boulevard Saint-Germain",
    //     "Boulevard Saint-Michel",
    //     "Boulevard de Sébastopol",
    //     "Boulevard de Strasbourg",
    //     "Boulevard du Temple",
    //     "Boulevard Voltaire",
    //     "Boulevard de la Zone"
    // ];

    // If you opened the link //
    // const category = document.querySelector('.mw-category');
    // const links = Array.prototype.slice.call(category.querySelectorAll('a'));
    // const list = links.map((link) => link.textContent);
    // const boulevards = list.filter((el) => el.includes('de'));

    console.table(boulevards);

    // 7. sort Exercise
    // Sort the people alphabetically by last name
    const sortedLastName = people.sort((a, b) => {
        const aLast = a.split(', ')[1];
        const bLast = b.split(', ')[1];

        if (aLast > bLast) return 1;
        else if (bLast > aLast) return -1
        else return 0;
    });

    console.table(sortedLastName);


    // 8. Reduce Exercise
    // Sum up the instances of each of these
    const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];
    const sumData = data.reduce((sum, word) => sum += word, '');

    console.log(sumData);

}());