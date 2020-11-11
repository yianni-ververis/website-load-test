### Website Load Tester

This is a command line tool that opens multiple tabs on Chromium and handles interactions, to load test the website server/cluster and the Qlik Associative Engine.

### Scenarios

##### Fullpage.js
- It opens tabs, immitates scrolling for navigation and triggers engine api calls.
- enter the paramaters in the index.js and then run
- `npm run test fullpage`

##### Load and Click
- It opens tabs, gets the first link based on identifier and clicks to navigate.
- enter the paramaters in the index.js and then run
- `npm run test loadAndClick`
