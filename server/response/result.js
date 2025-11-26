export class TextResult {
    Res;
    constructor(Res) {
        this.Res = Res;
    }
    Text(arg) {
        if (this.Res.writableEnded)
            return;
        if (typeof arg != "string") {
            arg = JSON.stringify(arg, null, " ");
        }
        this.Res.setHeader("Access-Control-Allow-Origin", "*");
        this.Res.setHeader('Content-Type', "text/plain");
        this.Res.end(arg);
        return;
    }
    Json(arg) {
        if (this.Res.writableEnded)
            return;
        if (typeof arg != "string") {
            arg = JSON.stringify(arg, null, " ");
        }
        this.Res.writeHead(200, { 'Content-Type': "application/json" });
        this.Res.end(arg);
        return;
    }
}
