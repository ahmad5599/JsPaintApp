const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const clearBtn = document.getElementById("jsClear");

const INITIAL_COLOR = "white";

canvas.height = 700;
canvas.width = 700;

initializingCanvas();
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}
function startPainting() {
  if (filling === false) {
    painting = true;
  }
}
function initializingCanvas() {
  ctx.fillStyle = "#2c2c2c"; // these will create your canvas background{used when saving image}
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //*$%@#$&&^&*&*()NOte important read the following comment
  ctx.strokeStyle = "#FFCC00"; //change strokeStyle to INITIAL_COLOR to set initial brush color
  ctx.fillStyle = INITIAL_COLOR;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke(); //ctx.closePath(); <----- use this function to understand paths and line
    ctx.save();
  }
}
function onColorClick(event) {
  const colorClicked = event.target.style.backgroundColor;
  ctx.strokeStyle = colorClicked;
  ctx.fillStyle = colorClicked;
}
function handleRangeChange(event) {
  const strockSize = event.target.value;
  ctx.lineWidth = strockSize;
}
function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
    ctx.strokeStyle = "white";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}
function onContextMenuClick(event) {
  event.preventDefault();
}
function handleSaveBtnClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "Paint[🎨]";
  link.click();
}
function handleClearBtnClick(event) {
  initializingCanvas();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("mousedown", handleCanvasClick); //here:i am using "mousedown" instead of "click" as the event to get better result
  canvas.addEventListener("contextmenu", onContextMenuClick);
}

Array.from(colors).forEach((colors) =>
  colors.addEventListener("click", onColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}
if (mode) {
  mode.addEventListener("click", handleModeClick);
}
if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveBtnClick);
}
if (clearBtn) {
  clearBtn.addEventListener("click", handleClearBtnClick);
}
