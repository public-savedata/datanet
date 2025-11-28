import { MessageElement } from "./display/MessageElement.js";
import { ChatHistoryLoader } from "./history/ChatHistoryLoader.js";
export class ChatBoardClass {
    ScrollToEnd() {
        this.Container.parentElement.scrollTop = this.Container.clientHeight;
    }
    async LoadHistory() {
        this.Container.innerHTML = "";
        var data = await new ChatHistoryLoader().LoadChat();
        data.forEach(f => {
            if (f.type == "text")
                this.CreateTextMessage(f.from, f.message, "none");
        });
        this.ScrollToEnd();
    }
    Container;
    CreateTextMessage(mode, message, initialState) {
        var dev = new MessageElement();
        dev.type = mode;
        dev.ShowText(message);
        dev.SetState(initialState);
        this.Container.append(dev.el);
        return dev;
    }
}
