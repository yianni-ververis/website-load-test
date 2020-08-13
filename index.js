/**
 * @name WebsiteLoadTester
 * @param {string} scenario - Scenario to execute
 * @example
 * npm run test fullpage
*/

const fullpage = require('./scenarios/fullpage');

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
}