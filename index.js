const { chromium } = require('playwright');

const seeds = [47,48,49,50,51,52,53,54,55,56];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);
    await page.waitForSelector("table");

    const numbers = await page.$$eval('table td', cells =>
      cells.map(td => Number(td.innerText)).filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a, b) => a + b, 0);
    grandTotal += sum;
  }

  console.log("FINAL TOTAL:", grandTotal);

  await browser.close();
})();