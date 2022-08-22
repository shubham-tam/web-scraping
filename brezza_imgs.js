const puppeteer = require("puppeteer");
const Downloader = require("./download_image");
const path = require("path");

const filepath = path.resolve(__dirname, "images");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const url = "insert URL ";
  // "https://hamrobazaar.com/cars/maruti-suzuki/brezza-zdi-in-kathmandu/e018f76340634793bab89d523731165f";
  // "https://hamrobazaar.com/";
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle0" });

  const imageUrls = await page.$$eval(".item img", (imgs) =>
    imgs.map((img) => img.getAttribute("src"))
  );

  imageUrls.forEach((imageUrl) => {
    Downloader.download(imageUrl, filepath, function (filename) {
      console.log("Download Complete for " + filename);
    });
  });
  await browser.close();
})();
