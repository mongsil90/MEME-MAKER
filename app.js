const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.querySelector("#linewidth");
const color = document.getElementById("color");
const colorOption = Array.from(document.getElementsByClassName("color-option"));

canvas.width = 600;
canvas.height = 600;

let paintOn = false;


function onMove(event) {
    if(paintOn) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}

function paintStart() {
    paintOn = true;
}

function paintEnd() {
    paintOn = false;
    ctx.beginPath();
}


function onLineWidth(event) {
    onColorAndWidthChoice(event);
}


function onColorChange(event) {
    onColorAndWidthChoice(event);
}

function onColorOption(event) {
    onColorOptionClick(event)
}


function onColorAndWidthChoice(event) {
    if(event.target.id === "color") {
        const colorValue = event.target.value;
        ctx.strokeStyle = colorValue;
        ctx.fillStyle = colorValue;
    } else if(event.target.id === "linewidth") {
        ctx.lineWidth = event.target.value;
    }
}

function onColorOptionClick(event) {
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", paintStart);
canvas.addEventListener("mouseup", paintEnd);
canvas.addEventListener("mouseleave", paintEnd);
lineWidth.addEventListener("change", onLineWidth);
color.addEventListener("change", onColorChange);
colorOption.forEach(color => color.addEventListener("click", onColorOption));