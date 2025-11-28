import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
export class LocalDataClass {
    FilePath;
    Data;
    constructor(dir) {
        this.FilePath = join(dir, "local", "data", "temp", "chat-1.json");
        this.Data = [];
    }
    get base2020() {
        return Math.floor(new Date("2020-01-01T00:00:00Z").getTime() / 1000);
    }
    load() {
        if (!existsSync(this.FilePath))
            return this;
        var txt = readFileSync(this.FilePath).toString();
        this.Data = JSON.parse(txt);
        return this;
    }
    Add(sender, message) {
        this.load();
        const now = Math.floor(Date.now() / 1000);
        // تایم‌استمپ شروع سال 2020 به ثانیه
        // اختلاف زمان فعلی با سال 2020
        const relativeTimestamp = now - this.base2020;
        const nr = { s: sender, t: "system", msg: message, dt: relativeTimestamp };
        this.Data.push(nr);
        this.Save();
        if (this.Data.length == 1)
            return false;
        return this.Data[this.Data.length - 1].s == sender;
    }
    Save() {
        writeFileSync(this.FilePath, JSON.stringify(this.Data));
    }
    DataAsUser(token) {
        var local = [];
        this.Data.filter(g => g.s == token || g.t == token).forEach(f => {
            local.push({
                type: "text", "from": f.s == token ? "self" : "user", message: f.msg, date: (f.dt + this.base2020) * 1000
            });
        });
        return local;
    }
}
