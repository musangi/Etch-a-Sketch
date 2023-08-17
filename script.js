const default_color = '#93066d';
const default_mode = 'color';
const default_size = 16;

let current_color = default_color;
let current_mode = default_mode;
let current_size = default_size;

function setCurrentColor(newColor) {
    current_color = newColor;
}

function setCurrentMode(newMode) {
    activateButton(newMode);
    current_mode = newMode;
}

function setCurrentSize(newSize){
    currentSize = newSize;
}

const color_picker = document.getElementById('colorPicker');
const colorBtn =  document.getElementById('colorBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');
const grid = document.getElementById('grid');

color_picker.oninput = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode('color');
rainbowBtn.onclick = () => setCurrentMode('rainbow');
eraserBtn.onclick = () => setCurrentMode('eraser');
clearBtn.onclick = () => reloadGrid();
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);

let mouseDown = false;
document.body.onmousedown= (e) => (mouseDown = true);
document.body.onmouseup = (e) => (mouseDown = false);

function changeSize(value) {
    setCurrentSize(value);
    updateSizeValue(value);
    reloadGrid();
}

function updateSizeValue(value) {
    sizeValue.textContent = `${value} x ${value}`;
}

function reloadGrid(){
    const gridElements =  document.querySelectorAll('.grid-element');
    gridElements.forEach(gridElement => {
        gridElement.style.cssText = "background-color: ''";
    })
}

function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for( let i = 0; i < size * size ; i++){
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.addEventListener('mouseover', changeColor);
        gridElement.addEventListener('mousedown', changeColor);
        grid.appendChild(gridElement);
    }
}

function changeColor(e) {
    if(e.type === 'mouseover' && !mouseDown) {
        return false;
    }
    if( current_mode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.cssText = `background-color: rgb(${randomR}, ${randomG}, ${randomB})`;
    } else if (current_mode === 'color') {
        e.target.style.cssText = `background-color: ${current_color}`;
    } else if (current_mode === 'eraser') {
        e.target.style.cssText = "background-color: #fefefe";
    }
}

function activateButton(newMode) {
    if(current_mode == 'rainbow') {
        rainbowBtn.classList.remove('active');
    } else if (current_mode === 'color') {
        colorBtn.classList.remove('active');
    } else if (current_mode === 'eraser') {
        eraserBtn.classList.remove('active');
    }

    if(newMode === 'rainbow') {
        rainbowBtn.classList.add('active');
    } else if (newMode === 'color') {
        colorBtn.classList.add('active');
    } else if (newMode === 'eraser') {
        eraserBtn.classList.add('active');
    }
}

window.onload = () => {
    setupGrid(default_size);
    activateButton(default_mode);
}