# BEEM ASSESSMENT

## Instruction

- Clone this repo
- In terminal in the ./nodejs directory, run node get.raw.data.js
- You should see first a data.txt, then a data.json file created in the nodejs directory
- There's still a small bug, open the data.json file, scroll to the bottom and manually add a closing curly brace \(}\)
- Start your server by runing the command node server.js in the same directory
- The endpoint for getting countries and networks by mcc and mnc is localhost:8000/countries
- The request body should have mcc and mnc keys with the corresponding search values
- For getting all the networks in a given country by country name or mcc, the path is /networks
- The request body should contain either an mcc or a country key and the corresponding search value
- Explore the responses on postman

## Remarks:
- 