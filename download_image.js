const https = require("https");
const fs = require("fs");
const path = require("path");

function download(url, filepath, callback) {
  const filename = path.basename(url);

  const req = https.get(url, function (res) {
    const fileStream = fs.createWriteStream(path.resolve(filepath, filename));
    res.pipe(fileStream);

    fileStream.on("error", function (err) {
      console.log("Error writing to the stream.");
      console.log(err);
    });

    fileStream.on("close", function () {
      callback(filename);
    });

    fileStream.on("finish", function () {
      fileStream.close();
      //   console.log("Done!");
    });
  });

  req.on("error", function (err) {
    console.log("Error on request");
    console.log(err);
  });
}

// downloadFile(
//   "https://images.pexels.com/photos/12553640/pexels-photo-12553640.jpeg",
//   function (fn) {
//     console.log(fn);
//   }
// );

module.exports.download = download;
