const reader = require("xlsx");
const qrcode = require("qrcode-terminal");
const xlsxFile = require("read-excel-file/node");

let xlsx = require("xlsx");
let file = xlsx.readFile("./temp2.xlsx");

let sheet = file.Sheets[file.SheetNames[0]];
const mp = new Map();

const { Client } = require("whatsapp-web.js");
const client = new Client();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
  index = 2;
  while (sheet[`A${index}`].v != 0) {
    let number = sheet[`A${index}`].v;
    let message = sheet[`B${index}`].v;
    const chatId = "91" + number + "@c.us";
    mp.set(chatId, message);
    index++;
    // console.log(number + " " + message);
  }

  let ind = 0;
  for (let [chatId, text] of mp) {
    setTimeout(function () {
      client.sendMessage(chatId, text);
      console.log(chatId + " -> " + text);
    }, ind++ * 10000);
  }
});

client.initialize();
