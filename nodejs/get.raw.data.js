const { request } = require("https");
const fs = require("fs");

const { saveToJson } = require("./text.to.json");

function fetchRawData() {
  const writeSt = fs.createWriteStream("data.txt", {});
  const req = request("https://www.mcc-mnc.com/", (response) => {
    response.on("data", (chunk) => {
      let line = chunk.toString().replace(/(<([^>]+)>)/gi, "@#");
      line = line.replace(/\t/g, "");
      writeSt.write(line.trim(), () => {});
    });
    response.on("end", () => saveToJson());
  });
  req.end();
}

fetchRawData();
module.exports = {fetchRawData}
