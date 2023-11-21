const fs = require('fs');

// Read the JSON file
fs.readFile('uni.json', 'utf8', (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  // Parse the data as JSON
  let universitiesData = JSON.parse(data);

  // Custom sort function to sort by country, then by university name
  universitiesData.sort((a, b) => {
    if (a.country < b.country) return -1;
    if (a.country > b.country) return 1;
    return a.name.localeCompare(b.name);
  });

  // Convert the sorted data back to JSON format
  const sortedData = JSON.stringify(universitiesData, null, 2);

  // Write the sorted data to a new file
  fs.writeFile('outputfile.json', sortedData, 'utf8', (err) => {
    if (err) {
      console.error("Error writing to the file:", err);
      return;
    }
    console.log("Successfully written sorted data to file.");
  });
});