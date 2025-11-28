export class MessageElement {
    SetState(state, time = -1) {
        this.el.classList.remove("state-indicator");
        this.el.classList.remove("state-success");
        this.el.classList.add(`state-${state}`);
        if (time > 0)
            setTimeout(() => {
                this.el.classList.add(`hiding-status`);
                setTimeout(() => {
                    this.el.classList.remove(`state-${state}`);
                    this.el.classList.remove(`hiding-status`);
                }, 500);
            }, time);
    }
    el;
    _type;
    set type(v) {
        this._type = v;
        this.el.classList.remove("type-answer");
        this.el.classList.remove("type-sender");
        this.el.classList.add(`type-${this._type}`);
    }
    constructor() {
        this.el = document.createElement("message-element");
        this._type = "self";
    }
    ShowText(message) {
        var p = document.createElement("p");
        p.append(document.createTextNode(message));
        this.el.append(p);
    }
}
