const canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    colors_Array = Array.from(document.getElementsByClassName("jsColor")),
//Array.from() -> object로 부터 array를 만듬
    brushSize = document.getElementById("controler_range"),
    mode = document.getElementById("mode"),
    saveBtn = document.getElementById("save")

const CANVAS_SIZE = [1600,800]

canvas.width = CANVAS_SIZE[0]
canvas.height = CANVAS_SIZE[1]

//pixel modifier를 해줘야함

const INITIAL_COLOR = "#111";

ctx.fillStyle = "white"
ctx.fillRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1])

ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function onMouseMove(e){
    if(filling === false){
        const X = e.offsetX;
        const Y = e.offsetY;

        if(!painting){
            ctx.beginPath();
            ctx.moveTo(X,Y)
        }else{
            ctx.lineTo(X,Y);
            ctx.stroke();
            //ctx.closePath()
        }
    }
}
//clientX,Y -> 전체 윈도우에서의 좌표
//offsetX,Y -> 객체 내에서의 좌표

function changeColor(event){
    var color = event.target.style.backgroundColor
    var brushIcon = document.getElementById("brushPoint")
    var fillIcon = document.getElementById("bucket")
    
    ctx.fillStyle = color
    ctx.strokeStyle = color
    brushIcon.style.fill = color
    fillIcon.style.fill = color
}

colors_Array.forEach(color => color.addEventListener("click",changeColor))

function changeRange(e){
    ctx.lineWidth = e.target.value    
}

if(brushSize){
    brushSize.addEventListener("input",changeRange)
}//brushsize는 ㅇinput에 반응할꺼야

function changeMode(){
    if(filling == true){
        filling = false;
        mode.classList.add("brush")
        mode.classList.remove("fill")
    }else{
        filling = true;
        mode.classList.add("fill")
        mode.classList.remove("brush")        
    }
}

if(mode){
    mode.addEventListener("click",changeMode)
}

function fillMode(){
    if(filling === true){
        ctx.fillRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1])
    }
}

function saveImage(){
    const saveImage = canvas.toDataURL("img/png");
    const saveLink = document.createElement("a");
    saveLink.href = saveImage;
    saveLink.download = "Dda-ran";
    saveLink.click();
}

if(saveBtn){
    saveBtn.addEventListener("click", saveImage)
}

function mouseRightClick(e){
    e.preventDefault()
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mousedown", startPainting)
    canvas.addEventListener("mouseup", stopPainting)
    canvas.addEventListener("mouseleave", stopPainting)
    canvas.addEventListener("click", fillMode)

    window.addEventListener("contextmenu",mouseRightClick)
}