const fs = require('fs');

fs.readFile('universities.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  let universities = JSON.parse(data);
  universities = sortUniversities(universities);

  // Write the sorted data back to the file
  fs.writeFile('universities.json', JSON.stringify(universities, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Error writing to the file:', err);
      return;
    }
    console.log('The file has been saved with the sorted universities!');
  });
});

function sortUniversities(universities) {
    // Create a copy of the array to avoid mutating the original data
    const sortedUniversities = [...universities];
  
    // Group universities by country
    const universitiesByCountry = sortedUniversities.reduce((acc, university) => {
      if (!acc[university.country]) {
        acc[university.country] = [];
      }
      acc[university.country].push(university);
      return acc;
    }, {});
  
    // Sort university names within each country
    Object.keys(universitiesByCountry).forEach(country => {
      universitiesByCountry[country].sort((a, b) => a.name.localeCompare(b.name, 'tr')); // 'tr' for Turkish locale
    });
  
    // Flatten the sorted groups back into an array
    const sortedAndGroupedUniversities = Object.values(universitiesByCountry).flat();
  
    return sortedAndGroupedUniversities;
  }
  