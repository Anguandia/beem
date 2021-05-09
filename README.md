# BEEM ASSESSMENT

## Instruction

- Clone this repo
### Scrape data only
  - In terminal in the ./nodejs directory, run node get.raw.data.js
  - You should see first a data.txt, then a data.json file created in the nodejs directory
### Start application
- If you started by scraping data from the source, you now have a local json data file, start your server by runing the command node server.js in the same directory or npm start
- If you didnt scrape data separately or just want to test the express scaping and starting of the server, just run nmp start. This will first scrape data, the start the server
### Testing the server
- The endpoint for getting countries and networks by mcc and mnc is localhost:8000/countries
- The request body should have mcc and mnc keys with the corresponding search values
- For getting all the networks in a given country by country name or mcc, the path is /networks
- The request body should contain either an mcc or a country key and the corresponding search value
- Explore the responses on postman

## Remarks:
- 
