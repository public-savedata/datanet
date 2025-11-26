import { readFile, existsSync } from "fs";
import { join } from "path";
export class StaticContentHandler {
    Handle(clientDir) {
        var url = decodeURIComponent(this.Req.url).split("?")[0];
        if (url.endsWith("/"))
            url += "index.html";
        var Mime = this.GetMimeType(url);
        if (Mime.length > 0) {
            this.SendFile(join(clientDir, url));
            return;
        }
        if (this.Res.writableEnded)
            return;
        this.Res.writeHead(404, { "Content-Type": "text/plain" });
        this.Res.write(`Unable to Handle Request`);
        this.Res.end();
    }
    Req;
    Res;
    GetMimeType(url) {
        if (url.endsWith(".txt"))
            return "text/plain";
        if (url.endsWith(".css"))
            return "text/css";
        if (url.endsWith(".js"))
            return "text/javascript";
        if (url.endsWith(".svg"))
            return "image/svg+xml";
        if (url.endsWith(".html"))
            return "text/html";
        if (url.endsWith(".less"))
            return "text/less";
        if (url.endsWith(".html"))
            return "text/html";
        if (url.endsWith(".ico"))
            return "image/x-icon";
        return "";
    }
    Redirect(newlink) {
        if (this.Res.writableEnded)
            return;
        this.Res.statusCode = 302;
        this.Res.setHeader('Location', newlink);
        this.Res.end();
        return;
    }
    SendFile(url) {
        if (this.Res.writableEnded)
            return;
        readFile(url, (err, data) => {
            //Error Parsing
            if (err) {
                if (existsSync(url + ".js")) {
                    this.Redirect(this.Req.url + ".js");
                    return;
                }
                if (existsSync(url + "/index.html")) {
                    this.Redirect(this.Req.url + "/");
                    return;
                }
                this.Res.writeHead(404, { "Content-Type": "text/plain" });
                this.Res.write(err + "\n");
                this.Res.end();
                return;
            }
            //File Parsing
            //  this.Res.setHeader('Cache-Control', 'max-age=3600');
            this.Res.writeHead(200, { 'Content-Type': this.GetMimeType(url) });
            this.Res.end(data);
            return;
        });
    }
    constructor(req, res) {
        this.Req = req;
        this.Res = res;
    }
}
