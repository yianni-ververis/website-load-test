/**
 * @name WebsiteLoadTester
 * @param {number} delay - Delay in milliseconds for each session
 * @param {number} slides - Total number of slides to scroll 
 * @param {number} sessions - Total number of Sessions / Tabs to open 
 * @param {string} url - The testing URL
 * @param {number} timeout -  Wait in milliseconds until next scroll
 * @param {string} username - username if site is password protected
 * @param {string} password - Scenario to execute
 * @param {number} closeTabAfter - Memory management. Close the tabs after x seconds 
 * @example
    loadAndClick({ 
      timeout: 300000, // Wait in milliseconds until next click
      maxClicks: 1, 
      sessions: 10, // Total Sessions / Tabs
      sessionTimeout: 1 * 1000, // Wait in seconds for the next session
      selector: '.app a', // html query selector
      url: 'https://localhost:8081/',
      closeTabAfter: 3 * 60 * 1000,
      headless: true
    });
*/

const puppeteer = require('puppeteer');

let timeout;
let sessionsTotal;
let _closeTabAfter;

const wait = (ms) => {
  return new Promise(resolve => setTimeout(() => resolve(), ms));
}

const scenario = async ({ 
  sessionTimeout=2000,
  maxClicks=1,
  selector="a", 
  url, 
  sessions=1, 
  timeout = 50000, 
  closeTabAfter=0, 
  username = null, 
  password = null ,
  headless = true,
}) => {
  sessionsTotal = sessions;
  _closeTabAfter = closeTabAfter;
  console.info('Load-and-click Testing started.')
  console.log(`closeTabAfter: ${_closeTabAfter}, timeout: ${timeout}, sessionsTotal: ${sessionsTotal}`)
  const browser = await puppeteer.launch({
    headless,
    ignoreHTTPSErrors: true,
  });
  process.setMaxListeners(0);

  let sessionsIncr = 1;
  while (sessionsIncr <= sessionsTotal) {
    console.log(`---------------------`);
    console.log(`Tab: ${sessionsIncr}`);
    // Wait for the new tab to open
    const page = await browser.newPage();
    page.on('console', message =>
      console.log(`Console: ${message.type().substr(0, 3).toUpperCase()} ${message.text()}`))

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout });
    console.log(page.url());
    await page.waitForSelector(selector);
    await page.$eval(selector, e => e.click());
    console.log(page.url());
    setTimeout(() => page.close(), _closeTabAfter);
    // console.info(`End of Page testing. Closing page ${sessionsIncr} after ${_closeTabAfter}ms.`);
    // await page.close();
    if (sessionsIncr === sessionsTotal) {
      console.info('End of testing. Closing Browser.')
      await wait(sessionTimeout);
      browser.close();
      browser.process().kill('SIGINT');
      process.exit();
    }
    sessionsIncr +=1
  }
};

module.exports = scenario;

