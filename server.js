import { createServer } from 'http';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { StaticContentHandler } from './server/static/StaticContentHandler.js';
import { TelegramBot } from './server/telegram/telegram-bot.js';
import { TextResult } from './server/response/result.js';
import { AccessTest } from './server/test/AccessTest.js';
//#region TELEGRAM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// توکن و chat_id ربات تلگرام
// const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN; 
// const CHAT_ID = process.env.CHAT_ID; 
const server = createServer((req, res) => {
    if (req.method === 'GET') {
        // Custom Api
        if (req.url == "/api/chat/data") {
            new TextResult(res).Json([]);
            return;
        }
        if (req.url == "/test") {
            var s = new AccessTest();
            s.run(__dirname);
            new TextResult(res).Text(s.GetReport());
            return;
        }
        var st = new StaticContentHandler(req, res);
        st.Handle(join(__dirname, "client"));
        return;
    }
    if (req.method === 'POST' && req.url === '/send') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', async () => {
            const params = new URLSearchParams(body);
            const message = params.get('message');
            // ارسال پیام به تلگرام
            new TelegramBot().Notify(message, (data) => {
                res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end(JSON.stringify(data));
            });
        });
    }
    res.writeHead(404);
    res.end('Not Found');
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
