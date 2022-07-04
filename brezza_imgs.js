const puppeteer = require("puppeteer");
const Downloader = require("./download_image");
const path = require("path");

const filepath = path.resolve(__dirname, "images");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const url =
    "https://hamrobazaar.com/cars/maruti-suzuki/suzuki-brezza-zdi-2016-in-nepal/3f16e3ed36d545418acddfadad3f33eb";

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });

  const imageUrls = await page.$$eval(".item img[src]", (imgs) =>
    imgs.map((img) => img.getAttribute("src"))
  );

  imageUrls.forEach((imageUrl) => {
    Downloader.download(imageUrl, filepath, function (filename) {
      console.log("Download Complete for " + filename);
    });
  });

  // console.log(imageUrls);
})();
