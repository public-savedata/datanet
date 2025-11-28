import { existsSync, mkdirSync } from "fs";
import { join } from "path";
export class LocalDataInit {
    ReportData = [];
    Init(__dirname) {
        var folders = ["local", "data", "temp"];
        var dir = __dirname;
        if (existsSync(join(dir, ...folders))) {
            this.ReportData.push("Everything OK");
            return;
        }
        this.ReportData.push("Initializing ...");
        folders.forEach(dirname => {
            dir = join(dir, dirname);
            if (!existsSync(dir))
                mkdirSync(dir);
        });
    }
    GetReport() {
        return this.ReportData.join("\n");
    }
}
