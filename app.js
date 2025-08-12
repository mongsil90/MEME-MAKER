const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.querySelector("#linewidth");
const color = document.getElementById("color");
const colorOption = Array.from(document.getElementsByClassName("color-option"));
const modeChange = document.querySelector("#mode-change");
const destroyBtn = document.querySelector("#destroy");
const eraserBtn = document.querySelector("#eraser");
const fileInput = document.querySelector("#file");
const textInput = document.querySelector("#text-input");
const saveImg = document.querySelector("#save-img");

canvas.width = 600;
canvas.height = 600;
ctx.lineCap = "round";
let paintOn = false;
let modeBtn = false;

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


function onmodeClick() {
    if(modeBtn) {
        modeBtn = false;
        modeChange.innerText = "Draw";
    } else {
        modeBtn = true;
        modeChange.innerText = "Fill";
    }
}

function onBgmouseDown() {
    if(modeBtn) {
        ctx.fillRect(0, 0, 600, 600);
    }
}


function onDestroyClick() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 600, 600);
}

function onEraserClick() {
    ctx.strokeStyle = "white";
    paintOn = false;
    modeChange.innerText = "Fill";
}


function onImgInput(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image, 0, 0, 600, 600);
        fileInput.value = null;
    }
}


function onDuobleClick(event) {
    const text = textInput.value;
    if(text !== "") {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = "50px serif";
        ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore();
    }
}


function onSaveImgClick(event) {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}


canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", paintStart);
canvas.addEventListener("mouseup", paintEnd);
canvas.addEventListener("mouseleave", paintEnd);

lineWidth.addEventListener("change", onLineWidth);
color.addEventListener("change", onColorChange);

colorOption.forEach(color => color.addEventListener("click", onColorOption));

modeChange.addEventListener("click", onmodeClick);
canvas.addEventListener("mousedown", onBgmouseDown);

destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);

fileInput.addEventListener("change", onImgInput);

canvas.addEventListener("dblclick", onDuobleClick);

saveImg.addEventListener("click", onSaveImgClick);