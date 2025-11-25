import { readFile } from "fs";
import { join } from "path";
export class StaticFileHandler {
    ClientRoot;
    constructor(dir) {
        this.ClientRoot = join(dir, "client");
    }
    Handle(req, res) {
        if (req.url === '/') {
            const htmlPath = join(this.ClientRoot, 'index.html');
            // Serve HTML
            readFile(htmlPath, (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end(`${htmlPath} Error loading HTML file`);
                }
                else {
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end(data);
                }
            });
            return;
        }
        if (req.url?.endsWith("css")) {
            // Serve CSS
            const cssPath = join(this.ClientRoot, 'style/index.css');
            readFile(cssPath, (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error loading CSS file');
                }
                else {
                    res.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' });
                    res.end(data);
                }
            });
            return;
        }
        if (req.url?.endsWith("js")) {
            // Serve CSS
            const cssPath = join(this.ClientRoot, 'script/script.js');
            readFile(cssPath, (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error loading Js file');
                }
                else {
                    res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
                    res.end(data);
                }
            });
            return;
        }
        // 404 for other routes
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(` ${req.url} Not Found`);
    }
}
