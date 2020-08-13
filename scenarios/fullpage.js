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
    fullpage({ 
      delay: 5000, // Wait in milliseconds for the next session
      slides: 20, // How many slides to scroll in Fullpage.js
      sessions: 50, // Total sessions
      url: 'https://yoursite.com/', // The testing URL
      timeout: 300000, // Wait in milliseconds until next scroll
      username: 'user', // username if site is password protected
      password: 'pass', // password if needed
    });
*/

const puppeteer = require('puppeteer');

let timeout;
const tabTimeout = 2000;
let sessionsTotal;
let slidesTotal;
let _closeTabAfter;

const wait = (ms) => {
  return new Promise(resolve => setTimeout(() => resolve(), ms));
}

const browserLoad = async (browser, sessionsIncr, url, timeout, username, password) => {
  try {
    process.setMaxListeners(0);
    const page = await browser.newPage();
    if (username && password) await page.authenticate({ username, password })
    await page.goto(url, { waitUntil: 'load', timeout });
  
    let slideIncr = 1;  
    while (slideIncr <= slidesTotal) {
      console.log(`Tab: ${sessionsIncr}, Slide: ${slideIncr}`);
      if ((sessionsIncr === sessionsTotal) && (slideIncr === slidesTotal)) {
        console.info('End of testing. Closing Browser.')
        await wait(10000);
        // await browser.close();
        break;
      } else if ((sessionsIncr < sessionsTotal) && (slideIncr === slidesTotal) && _closeTabAfter) {
        await page.waitFor(_closeTabAfter);
        console.info(`End of Page testing. Closing page ${sessionsIncr} after ${_closeTabAfter}ms.`);
        await page.close();
        break;
      } else {
        await page.waitFor(timeout);
        await page.evaluate(() => window.fullpage_api.moveSectionDown() );
        slideIncr += 1;
      }
    }
  } catch(e) {
    console.error(e)
  }
}

const scenario = async ({ 
  delay=1000, 
  slides=1, 
  sessions=1, 
  closeTabAfter=0, 
  url, 
  timeout = 50000, 
  username = null, 
  password = null 
}) => {
  timeout = delay;
  slidesTotal = slides;
  sessionsTotal = sessions;
  _closeTabAfter = closeTabAfter;
  console.info('Testing started.')
  console.log(`closeTabAfter: ${_closeTabAfter}, timeout: ${timeout}, slidesTotal: ${slidesTotal}, sessionsTotal: ${sessionsTotal}`)
  const browser = await puppeteer.launch({headless: false});
  let sessionsIncr = 1;
  while (sessionsIncr <= sessionsTotal) {
    browserLoad(browser, sessionsIncr, url, timeout, username, password);
    await wait(tabTimeout);
    sessionsIncr +=1
  }
};

module.exports = scenario;

