function getRandom (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var container = document.getElementById("flyingText_container")

var texts = [
    "Happy New Year", "新年快乐", "Bonne Année", "あけましておめでとうございます", "새해 복 많이 받으세요", "Frohes Neues Jahr",
    "שָׁנָה טוֹבָה", "Καλή χρονιά", "Good Luck", "Stay Healthy", "恭喜发财", "Manigong Bagong Taon", "Bonne Chance"
]

function createText() {
    var text = document.createElement("li");
    text.innerHTML = texts[getRandom(0, texts.length)];
    text.className = "flyingText";
    text.style.top = getRandom(15, 70) + "px";
    container.appendChild(text);
}

setInterval(createText, getRandom(2000, 4000));

setInterval(() => {
    container.removeChild(container.childNodes[0]);
}, 5000);
