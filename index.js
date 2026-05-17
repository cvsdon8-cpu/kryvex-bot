const TelegramBot = require("node-telegram-bot-api");
const admin = require("firebase-admin");

// Telegram Bot Token
const token = "8647957030:AAGpQlZRw-wE5WLOkteFVFCW0Oifvuu6E18";

// Firebase Config
const serviceAccount = require("./firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kryvex-system-default-rtdb.asia-southeast1.firebasedatabase.app/"
});

const db = admin.database();

const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  const noteId = Date.now();

  await db.ref("notes/" + noteId).set({
    user: chatId,
    text: text,
    time: new Date().toISOString()
  });

  bot.sendMessage(chatId, "✅ Note saved:\n" + text);
});

console.log("Bot Running...");