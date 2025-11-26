import axios from "axios";
export class TelegramBot {
    TELEGRAM_TOKEN = "8255225111:AAGy6QaLC2bV8gNYOBvMuj2qz1LyaE757As";
    CHAT_ID = 6683911472;
    /** Send Message to Chat Id */
    async Notify(text, callback) {
        try {
            const res = await axios.post(`https://api.telegram.org/bot${this.TELEGRAM_TOKEN}/sendMessage`, {
                chat_id: this.CHAT_ID,
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
}
