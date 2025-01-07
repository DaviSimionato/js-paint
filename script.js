const canva = document.querySelector(".canva");
const clearBtn = document.querySelector(".clear");
const disableGridBtn = document.querySelector(".disable-grid");
const colorPicker = document.querySelectorAll(".color");
let counter = 0;
let click = false;
let grid = true;
let cursorMode = "paint";
let color = "#6b7280";
let pColor = "#6b7280";
let block = null;
function createCanva() {
    if(grid) {
        for(let i=0;i<820;i++) {
            let obj = document.createElement("div");
            // obj.classList.add(`el-${i}`);
            obj.classList.add("g-block", "w-[25px]", "h-[25px]", "border", `hover:bg-[${color}]`);
            canva.appendChild(obj);
        }
    }else {
        for(let i=0;i<820;i++) {
            let obj = document.createElement("div");
            // obj.classList.add(`el-${i}`);
            obj.classList.add("g-block", "w-[25px]", "h-[25px]", `hover:bg-[${color}]`);
            canva.appendChild(obj);
        }
    }
    block = document.querySelectorAll(".g-block");
    blockFuntions();
}
function deleteCanva() {
    block.forEach((b)=> {
        b.remove();
    });
}
createCanva();
window.addEventListener("mousedown", ()=> {
    click = true;
});
window.addEventListener("mouseup", ()=> {
    click = false;
});
clearBtn.addEventListener("click", ()=> {
    deleteCanva();
    createCanva();
});
function blockFuntions() {
    block.forEach((b, i)=> {
        b.addEventListener("mouseenter", ()=> {
            if(click) {
                if(cursorMode == "paint") {
                    while (b.classList.length > 0) {
                        b.classList.remove(b.classList.item(0));
                    }
                    if(grid) {
                        b.classList.add("g-block", "w-[25px]", "h-[25px]", "border", `hover:bg-[${color}]`, `bg-[${color}]`);
                    }else {
                        b.classList.add("g-block", "w-[25px]", "h-[25px]", `hover:bg-[${color}]`, `bg-[${color}]`);
                    }
                }
                if(cursorMode == "eraser") {
                    b.classList.remove(`bg-[${color}]`);
                }
            }
        });
        b.addEventListener("mousedown", ()=> {
            if(cursorMode == "paint") {
                b.classList.add(`bg-[${color}]`);
            }
            if(cursorMode == "eraser") {
                b.classList.remove(`bg-[${color}]`);
            }
        });
    });
}
disableGridBtn.addEventListener("click", ()=> {
    block.forEach((b)=> {
        b.classList.toggle("border")
    });
    if(grid) {
        disableGridBtn.innerHTML = "Habilitar grid";
        grid = false;
    }else {
        disableGridBtn.innerHTML = "Desabilitar grid";
        grid = true;
    }
});
colorPicker.forEach((c)=> {
    c.addEventListener("click", ()=> {
        colorPicker.forEach((c)=> {
            c.classList.remove("border-black", "border-2");
        });
        c.classList.add("border-black", "border-2");
        pColor = color;
        color = c.innerHTML;
        block.forEach((b)=> {
            b.classList.replace(`hover:bg-[${pColor}]`, `hover:bg-[${color}]`);
        });
    })
})
