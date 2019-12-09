const canvas = document.getElementById('canvas');
canvas.width = 1200;
canvas.height = 700;
const ctx = canvas.getContext('2d');
let coord = [];
let reqId = 0;
let total = 0;

function setSettings() {
    const dynamicX = getRandomValue(0, canvas.width - 20);
    reqId = requestAnimationFrame(setSettings);
    coord.push({
        id: reqId,
        x: dynamicX,
        y: 0,
        width: 20,
        height: 20,
        color: getRandomColor(),
        speed: getRandomValue(1, 3)
    });

    coord.forEach((el)=> {
        if (!el.y <= canvas.height) {
            ctx.clearRect(el.x, (el.y - el.speed), el.width, el.height);
            ctx.fillStyle = el.color;
            ctx.fillRect(el.x, el.y, el.width, el.height);
            el.y += el.speed;
        }
    });
}

function getRandomColor() {
    const r = function () {
        return Math.floor(Math.random() * 200)
    };
    return "rgb(" + r() + "," + r() + "," + r() + ")";
}
function getRandomValue(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

document.getElementById("start").onclick = function (){
    coord = [];
    total = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(reqId);
    document.querySelector('.total').innerHTML = 0;
    setSettings();
};
document.getElementById("stop").onclick = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(reqId);
};
document.getElementById("canvas").onclick = function (e){
    coord.forEach((el)=>{
        if ( e.x>= el.x && e.x <= el.x + 30 && e.y>= el.y && e.y <= el.y + 30) {
            total += 10;
            ctx.clearRect(el.x, (el.y - el.speed), el.width, el.height);
            el.color = '#ffffff';
            document.querySelector('.total').innerHTML = total;
        }
    });

};
