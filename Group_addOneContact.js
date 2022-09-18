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

const myGroupName = "WhatsAppAutomation";
const contactName = "Divyesh Jivani";

client.on("ready", () => {
  console.log("Client is ready!");
  client.getChats().then((chats) => {
    const myGroup = chats.find((chat) => chat.name === myGroupName);
    myGroup
      .addParticipants(["919328330033@c.us"]) // Pass an array of contact IDs [id1, id2, id3 .....]
      .then(() =>
        console.log(
          `Successfully added ${contactName} to the group ${myGroupName}`
        )
      );
  });
});

client.initialize();
