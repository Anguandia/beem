const fs = require("fs");
const lines = require("readline");

let init = "{\n";

function saveToJson() {
  let MCC, MNC, ISO, country, countryCode, network;
  const inputStream = fs.createReadStream("data.txt");
  const readline = lines.createInterface({
    input: inputStream,
    crlfDelay: Infinity,
  });

  // extract rows containing the target data from html filtered string
  const rowPattern = /^[0-9].*$/;
  readline.on("line", (line) => {
    if (rowPattern.test(line.slice(4))) {
      [, MCC, MNC, ISO] = line.split(/[@#]{1,}/);
      // extract actual data to an array
      const seg = line.split(/[@#]{1,}/).slice(4);
      countryCode = seg.find((e) => /[\d]+/.test(e));
      [country, network] = seg.join(" ").replace(/[\d]+/, "==").split("==");
      [country, network] = [country, network].map((c) => (c ? c.trim() : ""));
      function writeJson() {
        let content = `"${MCC}-${MNC}-${country}": ${JSON.stringify({
          country,
          ISO,
          network,
          "Country Code": countryCode,
        })}`;
        content = init == "{\n" ? content : `,\n${content}`;
        init += content;
        return init;
      }
      const writeStream = fs.createWriteStream("data.json", {
        autoClose: true,
        emitClose: true,
      });
      writeStream.write(writeJson(line), () => {});
    }
  });
}

module.exports = { saveToJson };
