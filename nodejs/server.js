const { createServer } = require("http");
const { parse } = require("url");

const _data = require("./data");

createServer((req, res) => {
  const { pathname } = parse(req.url, true);
  let responseObject;
  req.on("data", async (chunk) => {
    responseObject =
      pathname.slice(1) === "countries"
        ? await getCountryAndNetworkName(JSON.parse(chunk.toString()))
        : pathname.slice(1) === "networks"
        ? await getCountryNetworks(JSON.parse(chunk.toString()))
        : errorResponse(404, `The path ${pathname.slice(1)} does not exist`);
  });
  req.on("end", () => {
    const { status } = responseObject;
    res.writeHead(status, { "Content-Type": "application/json" });
    res.write(JSON.stringify(responseObject));
    res.end();
  });
}).listen(8000, () => console.log("server running"));

const errorResponse = (status, message) => ({ status, message });
const successResponse = (status, data) => ({ status, data });
const lower = (str) => str.toLowerCase();

async function getCountryAndNetworkName(body) {
  const { mcc, mnc } = body;
  const val = `${mcc}-${mnc}`;
  const keys = Object.keys(_data);
  const key = keys.find((one) => one.includes(val));
  if (!mcc) return errorResponse(400, "MCC missing");
  if (!mnc) return errorResponse(400, "MNC missing");
  if (!key) return errorResponse(404, "bad code combination");
  try {
    const { country, network } = _data[key];
    return successResponse(200, { country, network });
  } catch (error) {
    return errorResponse(500, "Internal error");
  }
}

async function getCountryNetworks(body) {
  const { mcc, country } = body;
  if (!(mcc || country))
    return errorResponse(400, "please provide search key");
  const keys = Object.keys(_data);
  const [searchVal, name] = mcc ? [mcc, "Country Code"] : [country, "Country"];
  const found = keys.filter((k) => lower(k).includes(lower(searchVal)));
  if (found.length === 0) return errorResponse(404, `No ${name} ${searchVal}`);
  try {
    const networks = found.map((f) => _data[f].network);
    return successResponse(200, { [`${searchVal} networks`]: networks });
  } catch (error) {
    return errorResponse(500, "Internal error");
  }
}
