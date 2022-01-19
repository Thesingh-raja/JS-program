var canvas = document.querySelector("#myCanvas");
var ctx = canvas.getContext("2d");
const colorArray = ["#267BD1", "#F56147", "#DA1B1B", "#1BDA27"];
var colorContainer = document.querySelector(".color_container");
var clrBtn = document.querySelector(".clear");
var currentColor = colorArray[0];
//to clear the drawing
clrBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
//to download the drawing
var downloadBtn = document.querySelector(".download");
downloadBtn.addEventListener("click", () => {
  var link = document.createElement("a");
  link.download = new Date().toDateString() + ".png";
  link.href = canvas.toDataURL();
  link.click();
});
//inserting colors button
colorArray.forEach((color) => {
  const colorPlate = document.createElement("div");
  colorPlate.className = "color";
  colorPlate.style.backgroundColor = color;
  colorPlate.onclick = () => {
    currentColor = color;
  };
  colorContainer.insertAdjacentElement("beforeend", colorPlate);
});

console.log(ctx);

const draw = (event) => {
  const rect = canvas.getBoundingClientRect();
  ctx.lineWidth = 3;
// round paint brush
  ctx.lineCap = "round";
  ctx.lineTo(event.pageX - rect.left, event.pageY - rect.top);
  ctx.strokeStyle = currentColor;
  ctx.stroke();
   // this will move the position of pen
  ctx.moveTo(event.pageX - rect.left, event.pageY - rect.top);
};
var isMouseDown = false;

canvas.onmousedown = (event) => {
  isMouseDown = true;
  console.log(event);
  draw(event);
};

canvas.onmousemove = (event) => {
  if (isMouseDown) draw(event);
};

canvas.onmouseup = (event) => {
  ctx.beginPath();
  isMouseDown = false;
};


