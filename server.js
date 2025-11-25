import { createServer } from 'http';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import { StaticFileHandler } from './server/static/StaticFileHandler.js';
//#region jsonbin
// شناسه Bin و کلید API
const BIN_ID = "692581ccae596e708f6fb4e7";
const API_KEY = "$2a$10$N/qqhqA0Od9QEwb8OEBW6OxPwkhyJJNt4TL2cAR6hvSrVfYkgOqmu";
// داده جدیدی که می‌خواهی ذخیره کنی
const newData = {
    name: "Hossein",
    project: "Telegram Notification System",
    status: "updated"
};
async function updateBin() {
    try {
        const response = await axios.put(`https://api.jsonbin.io/v3/b/${BIN_ID}`, newData, {
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": API_KEY
            }
        });
        console.log("Updated successfully:", response.data);
    }
    catch (error) {
        console.error("Error updating bin:", error.response?.data || error.message);
    }
}
//updateBin();
//#region TELEGRAM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// توکن و chat_id ربات تلگرام
// const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN; 
// const CHAT_ID = process.env.CHAT_ID; 
const TELEGRAM_TOKEN = "8255225111:AAGy6QaLC2bV8gNYOBvMuj2qz1LyaE757As";
const CHAT_ID = 6683911472;
async function notifyTelegram(text, callback) {
    try {
        const res = await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text
        });
        console.log("✅ پیام ارسال شد:", res.data);
        return callback({ result: true, message: "ok" });
    }
    catch (err) {
        // هندل خطا
        if (err.code === 'ECONNABORTED') {
            return callback({ result: false, message: "Low Speed network" });
        }
        if (err.response) {
            return callback({ result: false, message: `Server Faild:${err.response.status}` });
        }
        return callback({ result: false, message: `Network Error:${err.message}` });
    }
}
// استفاده:
// notifyTelegram("سلام! این پیام با axios فرستاده شد ✅");
const server = createServer((req, res) => {
    if (req.method === 'GET') {
        new StaticFileHandler(__dirname).Handle(req, res);
        return;
    }
    if (req.method === 'POST' && req.url === '/send') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', async () => {
            const params = new URLSearchParams(body);
            const message = params.get('message');
            // ارسال پیام به تلگرام
            notifyTelegram(message, (data) => {
                res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end(JSON.stringify(data));
            });
            // const fetch = (await import('node-fetch')).default;
            // await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({
            //     chat_id: CHAT_ID,
            //     text: message
            //   })
            // });
        });
    }
    else {
        res.writeHead(404);
        res.end('Not Found');
    }
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
