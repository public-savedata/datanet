import { ChatBoardClass } from "./chat/ChatBoardClass.js";
import { AuthenticationDataLoader } from "./user/auth/AuthenticationDataLoader.js";
import { MainFrame } from "./home/MainFrame.js";
const form = document.getElementById('messageForm');
const resultDiv = document.getElementById('result');
const ChatBoard = new ChatBoardClass();
ChatBoard.Container = document.querySelector("message-history");
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const message = formData.get('message');
    var dev = ChatBoard.CreateTextMessage("self", message, "indicator");
    ChatBoard.ScrollToEnd();
    try {
        resultDiv.textContent = "";
        const res = await fetch('/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ message: message, sender: top.user.auth.uid })
        });
        const text = await res.text();
        console.log(text);
        if (text.startsWith("{")) {
            var data = JSON.parse(text);
            if (data.result) {
                dev.SetState("success", 3000);
                form.reset();
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
new AuthenticationDataLoader().Load();
ChatBoard.LoadHistory();
MainFrame.UpdateAuthentication();
// navigator.getBattery().then(function (battery) {
//     if (battery.level < 0.2) {
//         // باتری زیر ۲۰٪ → انیمیشن‌ها رو خاموش کن
//         document.body.classList.add("low-battery");
//     }
// });
