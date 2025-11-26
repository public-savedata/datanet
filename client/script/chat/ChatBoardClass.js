import { MessageElement } from "./display/MessageElement.js";
import { ChatHistoryLoader } from "./history/ChatHistoryLoader.js";
export class ChatBoardClass {
    LoadHistory() {
        this.Container.innerHTML = "";
        var data = new ChatHistoryLoader().LoadChat();
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
