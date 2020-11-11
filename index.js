/**
 * @name WebsiteLoadTester
 * @param {string} scenario - Scenario to execute
 * @example
 * npm run test fullpage
 * yarn test simple
*/

const fullpage = require('./scenarios/fullpage');
const simple = require('./scenarios/simple');
const loadAndClick = require('./scenarios/load-and-click');

const handleArguments = process.argv.slice(2);

if (handleArguments[0] === 'fullpage') {
  fullpage({ 
    delay: 5000, // Wait in milliseconds for the next session
    slides: 10, // How many slides to scroll in Fullpage.js
    sessions: 3, // Total Sessions / Tabs
    url: 'https://alvarotrigo.com/fullPage/', // your fullpage.js testing URL
    timeout: 300000, // Wait in milliseconds until next scroll
    closeTabAfter: 50 * 60 * 1000
  });
} else if (handleArguments[0] === 'loadAndClick') {
  loadAndClick({ 
    timeout: 300000, // Wait in milliseconds until next click
    maxClicks: 1, 
    sessions: 1000, // Total Sessions / Tabs
    sessionTimeout: 1 * 1000, // Wait in seconds for the next session
    selector: '.app a', // html query selector
    url: 'https://localhost:8081/',
    closeTabAfter: 3 * 60 * 1000,
    headless: true
  });
}