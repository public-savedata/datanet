import { createServer } from 'http';
import { readFile } from 'fs';
import { dirname, join  } from 'path';

import { fileURLToPath } from 'url';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

 




// توکن و chat_id ربات تلگرام
// const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN; 
// const CHAT_ID = process.env.CHAT_ID; 


const TELEGRAM_TOKEN =  "8255225111:AAGy6QaLC2bV8gNYOBvMuj2qz1LyaE757As";
const CHAT_ID = 6683911472; 

async function notifyTelegram(text) {
   try {

   const res = await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    chat_id: CHAT_ID,
    text
  });
 console.log("✅ پیام ارسال شد:", res.data);
  } catch (err) {
    // هندل خطا
    if (err.code === 'ECONNABORTED') {
      console.error("⏱️ درخواست تایم‌اوت شد (احتمالاً فیلتر یا کندی شبکه).");
    } else if (err.response) {
      console.error("❌ خطای تلگرام:", err.response.status, err.response.data);
    } else {
      console.error("⚠️ خطای شبکه:", err.message);
    }
  }


}

// استفاده:
// notifyTelegram("سلام! این پیام با axios فرستاده شد ✅");


const htmlPath = join(__dirname, 'index.html');

const server = createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    readFile(htmlPath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading HTML file');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
      }
    });
  } else if (req.method === 'POST' && req.url === '/send') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
      const params = new URLSearchParams(body);
      const message = params.get('message');

      // ارسال پیام به تلگرام
      notifyTelegram(message);
      // const fetch = (await import('node-fetch')).default;
      // await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     chat_id: CHAT_ID,
      //     text: message
      //   })
      // });

      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Thanks, your message was sent!');
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});