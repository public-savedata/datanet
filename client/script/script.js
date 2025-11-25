"use strict";
const form = document.getElementById('messageForm');
const resultDiv = document.getElementById('result');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const message = formData.get('message');
    var dev = new MessageElement();
    dev.type = "sender";
    dev.ShowText(message);
    dev.SetState("indicator");
    // setTimeout(() => {
    //     
    // }, 3000);
    try {
        const res = await fetch('/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ message })
        });
        const text = await res.text();
        if (text.startsWith("{")) {
            var data = JSON.parse(text);
            if (data.result) {
                dev.SetState("success", 3000);
                return;
            }
            dev.SetState("error");
            return;
        }
        resultDiv.textContent = text;
        resultDiv.style.color = "red";
        dev.SetState("error");
    }
    catch (err) {
        resultDiv.textContent = "Error: " + err.message;
        resultDiv.style.color = "red";
        dev.SetState("error");
    }
});
class MessageElement {
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
        document.querySelector("message-history").append(this.el);
        this._type = "sender";
    }
    ShowText(message) {
        var p = document.createElement("p");
        p.append(document.createTextNode(message));
        this.el.append(p);
    }
}
function LoadHistory() {
    document.querySelector("message-history").innerHTML = "";
}
LoadHistory();
