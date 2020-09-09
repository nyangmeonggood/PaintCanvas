const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.strokeStyle = "#111";
ctx.lineWidth = 2.5;

let painting =false;

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function onMouseMove(e){
    const X = e.offsetX;
    const Y = e.offsetY;
}
//clientX,Y -> 전체 윈도우에서의 좌표
//offsetX,Y -> 객체 내에서의 좌표

function onMouseDown(e){
    painting = true;
    console.log(painting)
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mousedown", startPainting)
    canvas.addEventListener("mouseup", stopPainting)
    canvas.addEventListener("mouseleace", stopPainting)
}