export class ChatHistoryLoader {
    LoadChat() {
        fetch("/api/chat/data").then(f => f.json()).then(g => {
        });
    }
}
