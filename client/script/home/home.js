import { AccountEditor } from "../user/auth/edit/AccountEditor.js";
const canvas = document.getElementById("appCanvas");
const ctx = canvas.getContext("2d");
const size = 360;
const cellSize = size / 3;
let progress = 0; // پیشرفت کلی انیمیشن (۰ تا ۱)
const icons = {
    chat: { "data": "M19.388672 5.0019531C18.773756 5.0054834 18.150314 5.044942 17.521484 5.1230469C10.697094 5.9702662 5.1745505 11.367451 4.171875 18.171875C3.6819078 21.498548 4.3584219 24.635174 5.7148438 27.355469L4.0429688 34.140625 A 1.50015 1.50015 0 0 0 5.8574219 35.957031L12.648438 34.287109C15.368982 35.642479 18.506526 36.317138 21.832031 35.826172C28.634317 34.822374 34.029726 29.301856 34.876953 22.478516C35.971423 13.67555 29.565762 6.0333486 21.207031 5.0976562C20.609979 5.0308211 20.003588 4.9984229 19.388672 5.0019531 z M36.990234 14.509766C37.900234 17.149766 38.199609 19.999609 37.849609 22.849609C36.839609 31.029609 30.429531 37.589062 22.269531 38.789062C21.349531 38.929062 20.42 39 19.5 39C19.01 39 18.509531 38.979687 18.019531 38.929688C20.229531 40.969687 23.059922 42.360078 26.169922 42.830078C29.409922 43.300078 32.63 42.790312 35.5 41.320312L42.140625 42.960938C42.260625 42.990938 42.38 43 42.5 43C42.89 43 43.280547 42.850547 43.560547 42.560547C43.930547 42.190547 44.080937 41.650625 43.960938 41.140625L42.320312 34.5C43.790313 31.63 44.310078 28.419922 43.830078 25.169922C43.170078 20.709922 40.600234 16.879766 36.990234 14.509766 z" },
    account: { "data": "M24.021484 4.0800781C18.507484 4.0800781 14.021484 8.5660781 14.021484 14.080078C14.021484 19.594078 18.507484 24.080078 24.021484 24.080078C31.088484 24.080078 39.269281 15.474422 39.613281 15.107422C40.156281 14.530422 40.156281 13.629734 39.613281 13.052734C39.269281 12.685734 31.088484 4.0800781 24.021484 4.0800781 z M41.498047 23C41.224047 23.001 40.946969 23.025172 40.667969 23.076172C39.783969 23.235172 38.939563 23.696156 38.226562 24.410156L36.878906 25.757812L43.242188 32.121094L44.589844 30.773438C45.303844 30.060437 45.764828 29.216031 45.923828 28.332031C45.973828 28.053031 45.997047 27.775953 45.998047 27.501953C46.001047 26.307953 45.540688 25.179313 44.679688 24.320312C43.820687 23.460313 42.692047 22.998 41.498047 23 z M34.757812 27.878906L26.427734 36.208984C26.070734 36.565984 25.807969 37.011141 25.667969 37.494141L24.097656 42.974609C24.025656 43.164609 23.993 43.365406 24 43.566406C24.013 43.929406 24.155594 44.288406 24.433594 44.566406C24.710594 44.843406 25.067688 44.986 25.429688 45C25.630688 45.007 25.834391 44.975344 26.025391 44.902344L31.505859 43.332031C31.988859 43.192031 32.431062 42.930266 32.789062 42.572266L41.121094 34.242188L34.757812 27.878906 z M12.5 28C10.019 28 8 30.019 8 32.5L8 33.699219C8 39.045219 14.025109 43.312922 22.037109 43.919922C22.026109 43.825922 22.005953 43.733672 22.001953 43.638672C21.986953 43.197672 22.051359 42.769375 22.193359 42.359375L23.742188 36.943359C23.978188 36.130359 24.416719 35.388922 25.011719 34.794922L31.806641 28L12.5 28 z" },
    about: { "data": "M24,4C12.972,4,4,12.972,4,24c0,3.186,0.77,6.343,2.232,9.172l-2.139,7.657c-0.242,0.867,0.003,1.802,0.64,2.439c0.475,0.475,1.115,0.732,1.771,0.732c0.224,0,0.449-0.03,0.67-0.092l7.661-2.139C17.662,43.23,20.817,44,24,44c11.028,0,20-8.972,20-20S35.028,4,24,4z M22.5,14.5c0-0.828,0.671-1.5,1.5-1.5s1.5,0.672,1.5,1.5v12c0,0.828-0.671,1.5-1.5,1.5s-1.5-0.672-1.5-1.5V14.5z M24,35c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2s2,0.895,2,2C26,34.105,25.105,35,24,35z" },
};
const Data = [
    { icon: icons.chat.data, text: "Message", theme: ["#1A3177", "#2C51BE", "#829AE3"], command: "nav:chat-screen" },
    { icon: icons.account.data, text: "Profile", theme: ["#510869", "#820DAF", "#B86EDA"], command: "nav:account/edit" },
    { icon: icons.about.data, text: "About", theme: ["#363636", "#707070", "#a0a0a0"], command: "nav:about-screen" },
];
function drawGrid(progress) {
    ctx.clearRect(0, 0, size, size);
    ctx.strokeStyle = "#00eeff2d"; // نئون آبی
    ctx.shadowColor = "#00f0ff";
    ctx.shadowBlur = 10;
    ctx.lineWidth = 2;
    // خط افقی اول (شروع از ۰٪)
    if (progress > 0) {
        ctx.beginPath();
        ctx.moveTo(0, cellSize);
        ctx.lineTo(size * Math.min(progress, 1), cellSize);
        ctx.stroke();
    }
    // خط افقی دوم (شروع بعد از ۵۰٪)
    if (progress > 0.5) {
        const p = Math.min((progress - 0.5) / 0.5, 1);
        ctx.beginPath();
        ctx.moveTo(0, 2 * cellSize);
        ctx.lineTo(size * p, 2 * cellSize);
        ctx.stroke();
    }
    // ستون‌ها (شروع بعد از ۷۰٪)
    if (progress > 0.7) {
        const p = Math.min((progress - 0.7) / 0.3, 1);
        for (let i = 1; i < 3; i++) {
            const x = i * cellSize;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, size * p);
            ctx.stroke();
        }
    }
}
let Items = [];
class DashCommandRuntime {
    IsSelected;
    constructor() {
        this.IsSelected = false;
    }
}
class VmDashboardButton {
    Item;
    Runtime;
    constructor(item) {
        this.Item = item;
        this.Runtime = new DashCommandRuntime();
    }
}
Items = Data.map(t => new VmDashboardButton(t));
function drawItems() {
    ctx.fillStyle = "#333";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    var d = "M109.37,69.63,69.63,109.37a8,8,0,0,1-11.26,0L18.63,69.63a8,8,0,0,1,0-11.26L58.37,18.63a8,8,0,0,1,11.26,0l39.74,39.74A8,8,0,0,1,109.37,69.63Z";
    Items.forEach((v, index) => {
        ctx.shadowBlur = 0;
        const row = Math.floor(index / 3);
        const col = index % 3;
        const x = col * cellSize + cellSize / 2;
        const y = row * cellSize + cellSize / 2;
        // رسم SVG به صورت Path
        const Back = new Path2D(d);
        const path = new Path2D(v.Item.icon);
        ctx.save();
        ctx.translate(x - 65, y - 70);
        ctx.fillText(index.toString(), 10, 0);
        ctx.stroke(Back);
        if (v.Runtime.IsSelected)
            ctx.fill(Back);
        ctx.restore();
        ctx.save();
        ctx.translate(x - 18, y - 35);
        ctx.strokeStyle = v.Item.theme[1];
        ctx.fillStyle = v.Item.theme[2];
        ctx.shadowColor = v.Item.theme[0];
        ctx.shadowBlur = 10;
        ctx.scale(0.7, 0.7);
        ctx.stroke(path);
        ctx.shadowBlur = 0;
        ctx.fill(path);
        ctx.restore();
        ctx.fillStyle = v.Item.theme[2];
        // متن زیر آیکن
        ctx.fillText(v.Item.text, x, y + 15);
    });
    Items.forEach(t => t.Runtime.IsSelected = false);
}
let skip = false;
function animate() {
    progress += 0.01; // سرعت انیمیشن
    if (progress > 1)
        progress = 1;
    skip = !skip;
    if (skip)
        drawGrid(progress);
    if (progress < 1) {
        requestAnimationFrame(animate);
    }
    else {
        drawItems();
    }
}
animate();
function getCanvasCoordinates(evt) {
    const rect = canvas.getBoundingClientRect();
    const x = (evt.clientX || evt.touches?.[0]?.clientX) - rect.left;
    const y = (evt.clientY || evt.touches?.[0]?.clientY) - rect.top;
    return { x, y };
}
function handleClick(evt) {
    const { x, y } = getCanvasCoordinates(evt);
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);
    const index = row * 3 + col;
    if (Items[index]) {
        var trg = Items[index];
        const command = trg.Item.command;
        trg.Runtime.IsSelected = true;
        console.log("Executing:", command);
        // اینجا می‌تونی دستور واقعی رو صدا بزنی
        // مثلا: navigateTo(command) یا dispatch(command)
        drawItems();
        setTimeout(() => {
            transitionOut(() => { RunCommand(command); });
        }, 500);
    }
}
canvas.addEventListener("mousedown", handleClick);
canvas.addEventListener("touchstart", handleClick);
document.querySelector("#page-goback")?.addEventListener("click", _ => {
    RunCommand("nav:home-screen");
});
function RunCommand(command) {
    if (command.startsWith("nav:")) {
        var trg = command.split(":")[1];
        document.querySelectorAll("page-screen").forEach(pg => {
            pg.style.display = pg.hasAttribute("data-url") && pg.getAttribute("data-url") == trg ? "contents" : "none";
        });
        if (trg == "home-screen") {
            skip = false;
            setTimeout(animate, 100);
        }
        if (trg == "account/edit") {
            skip = false;
            setTimeout(animate, 100);
            new AccountEditor().Init();
        }
    }
}
// function transitionToPage(newPage: any) {
//     let alpha = 1;
//     function fadeOut() {
//         ctx.globalAlpha = alpha;
//         drawCurrentPage(); // صفحه فعلی
//         alpha -= 0.05;
//         if (alpha > 0) {
//             requestAnimationFrame(fadeOut);
//         } else {
//             currentPage = newPage;
//             fadeIn();
//         }
//     }
//     function fadeIn() {
//         alpha = 0;
//         function step() {
//             ctx.globalAlpha = alpha;
//             drawPage(currentPage); // صفحه جدید
//             alpha += 0.05;
//             if (alpha < 1) {
//                 requestAnimationFrame(step);
//             } else {
//                 ctx.globalAlpha = 1;
//             }
//         }
//         step();
//     }
//     fadeOut();
// }
function transitionOut(callback) {
    // 1. ذخیره تصویر فعلی Canvas
    const image = new Image();
    image.src = canvas.toDataURL();
    let offsetX = 0;
    let alpha = 1;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // 2. تنظیم Opacity و موقعیت
        ctx.globalAlpha = alpha;
        ctx.drawImage(image, offsetX, 0);
        // 3. کاهش Opacity و انتقال به چپ
        offsetX -= 10;
        alpha -= 0.05;
        if (alpha > 0) {
            requestAnimationFrame(animate);
        }
        else {
            ctx.globalAlpha = 1;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            callback(); // اجرای صفحه جدید
        }
    }
    animate();
}
