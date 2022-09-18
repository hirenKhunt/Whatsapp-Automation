const reader = require("xlsx");
const qrcode = require("qrcode-terminal");
const xlsxFile = require("read-excel-file/node");
let xlsx = require("xlsx");
let file = xlsx.readFile("./temp2.xlsx");

let sheet = file.Sheets[file.SheetNames[0]];
let numbers = [];

const { Client, MessageMedia } = require("whatsapp-web.js");
const client = new Client();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
  index = 2;
  while (sheet[`A${index}`].v != 0) {
    let number = sheet[`A${index}`].v;
    const chatId = "91" + number + "@c.us";
    numbers.push(chatId);
    index++;
    // console.log(number + " " + message);
  }

  let ind = 0;
  for (let chatId of numbers) {
    setTimeout(function () {
      const attachmentPdf = MessageMedia.fromFilePath(
        "./Multimedia/Book1.xlsx"
      );
      client.sendMessage(chatId, attachmentPdf);
      console.log(chatId);
    }, ind++ * 10000);
  }
});

client.initialize();
