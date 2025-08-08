const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

ctx.fillRect(200, 200, 20, 60);
ctx.fillRect(310, 200, 20, 60);

ctx.fillRect(225, 200, 80, 50);
ctx.fillRect(235, 255, 62, 35);

ctx.fillRect(235, 295, 25, 60);
ctx.fillRect(270, 295, 25, 60);

ctx.arc(265, 165, 25, 0, 2 * Math.PI);
ctx.fill();

ctx.beginPath();
ctx.arc(255, 160, 5, 0, 1 * Math.PI);
ctx.arc(275, 160, 5, 0, 1 * Math.PI);
ctx.fillStyle = "blue";
ctx.fill();