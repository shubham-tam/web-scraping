const puppeteer = require("puppeteer");
const fs = require("fs/promises");
// const { info } = require("console");

(async () => {
  const url =
    "https://hamrobazaar.com/cars/maruti-suzuki/suzuki-brezza-zdi-2016-in-nepal/3f16e3ed36d545418acddfadad3f33eb";
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);

  const information = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll('div[class="feature__card"]')
    ).map((x) => x.textContent);
  });

  let name = await page.evaluate(() => {
    return Array.from(document.querySelector("section > div > h3").innerText);
  });

  //   console.log(information);
  //   console.log(nam);
  await fs.writeFile("brezza.txt", name.join(""));
  await fs.appendFile("brezza.txt", "\n");
  await fs.appendFile("brezza.txt", "\n");
  await fs.appendFile("brezza.txt", information.join("\r\n"));
  //   await fs.writeFile("brezza.txt", information.append("-"));
})();
