export class ChatHistoryLoader {
    async LoadChat() {
        var req = await fetch("/api/chat/data/" + top.user.token);
        var json = await req.json();
        return json;
    }
}
