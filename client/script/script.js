import { ChatBoardClass } from "./chat/ChatBoardClass.js";
const form = document.getElementById('messageForm');
const resultDiv = document.getElementById('result');
const ChatBoard = new ChatBoardClass();
ChatBoard.Container = document.querySelector("message-history");
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const message = formData.get('message');
    var dev = ChatBoard.CreateTextMessage("sender", message, "indicator");
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
ChatBoard.LoadHistory();
