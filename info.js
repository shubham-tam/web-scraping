const puppeteer = require("puppeteer");
const fs = require("fs/promises");

(async () => {
  const url = "insert URL";
  // "https://hamrobazaar.com/cars/maruti-suzuki/brand-new-suzuki-vitara-brezza-for-sale-in-kathmandu/2f546300b03a40798a0e681632a326d4";
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);

  const information = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll('div[class="feature__item"]')
    ).map((x) => x.textContent);
  });

  let name = await page.evaluate(() => {
    return Array.from(document.querySelector("section > div > h3").innerText);
  });
  // Rename the file "brezza.txt" with "X.txt" and the same for information

  fs.writeFile("brezza.txt", name.join(""));
  fs.appendFile("brezza.txt", "\n");
  fs.appendFile("brezza.txt", "\n");
  fs.appendFile("brezza.txt", information.join("\r\n"));

  await browser.close();
})();
