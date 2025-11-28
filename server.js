import { createServer } from 'http';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { LocalDataClass } from './server/localize/LocalDataClass.js';
import { LocalDataInit } from './server/localize/LocalDataInit.js';
import { TextResult } from './server/response/result.js';
import { StaticContentHandler } from './server/static/StaticContentHandler.js';
import { TelegramBot } from './server/telegram/telegram-bot.js';
//#region TELEGRAM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// توکن و chat_id ربات تلگرام
// const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN; 
// const CHAT_ID = process.env.CHAT_ID; 
const server = createServer((req, res) => {
    if (req.method === 'GET') {
        // Custom Api
        if (req.url?.startsWith("/api/chat/data/")) {
            var sender = req.url.substring("/api/chat/data/".length).split("/")[0];
            new TextResult(res).Json(new LocalDataClass(__dirname).load().DataAsUser(sender));
            return;
        }
        if (req.url == "/init") {
            var s = new LocalDataInit();
            s.Init(__dirname);
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
            const sender = params.get('sender');
            const message = params.get('message');
            var QuickRes = new LocalDataClass(__dirname).Add(sender, message);
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            // if (!QuickRes) {
            //   res.end(JSON.stringify({ result: true, message: "ok" }));
            //   return;
            // }
            // Telegram Notification
            new TelegramBot().Notify(message, (data) => {
                res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end(JSON.stringify(data));
            });
        });
        return;
    }
    res.writeHead(404);
    res.end('Not Found');
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
