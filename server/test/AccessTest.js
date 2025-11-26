import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
export class AccessTest {
    Report = ["", "", ""];
    run(__dirname) {
        this.TryCreateFolder(__dirname);
        this.TryCreateFile(__dirname);
    }
    TryCreateFolder(__dirname) {
        var dir = join(__dirname, "client", "test");
        if (existsSync(dir)) {
            this.Report[0] = "Folder Exists";
            return;
        }
        try {
            mkdirSync(dir);
            this.Report[0] = "Successuly Created";
            return;
        }
        catch (error) {
            this.Report[0] = "Error On Create";
            return;
        }
    }
    TryCreateFile(__dirname) {
        var html = join(__dirname, "client", "test", "test.html");
        if (existsSync(html)) {
            this.Report[1] = "File Exists";
            return;
        }
        try {
            writeFileSync(html, "sample Html File");
            this.Report[1] = "Successuly Created";
            return;
        }
        catch (error) {
            this.Report[1] = "Error On Create";
            return;
        }
    }
    GetReport() {
        return [
            "--- Testing ---",
            `Create Folder: ${this.Report[0]}`,
            `Create File: ${this.Report[1]}`,
        ].join("\n");
    }
}
