const MAX_GRID_SIZE = 400;
const gridAreaCalculation = MAX_GRID_SIZE * MAX_GRID_SIZE;

const sketchContainer = document.getElementById("container");
const colorPicker = document.getElementById("color-picker");
const pickColorButton = document.getElementById("colorpick-btn");
const randomColorButton = document.getElementById("random-color-btn");
const eraserButton = document.getElementById("eraser-btn");
const clearAllButton = document.getElementById("clear-btn");
const squareNumInput = document.getElementById("square-numbers");
const gridSizeDiv = document.getElementById("grid-size");



let mouseDown = false;
let mouseClicked = false;
let normalColorEnabled = true;
let randomColorEnabled = false;
let eraserEnabled = false;

let rowsNumber = 16;
let columnsNumber = 16;
let pickedColor = '0 0 0';


gridSizeDiv.textContent = rowsNumber + " x " + rowsNumber;
pickColorButton.classList.add('active-btn');

createGridOfSquares(rowsNumber, columnsNumber);


colorPicker.addEventListener("input", function(event) {
    pickedColor = event.target.value;
    pickColorButton.classList.add('active-btn');
    randomColorButton.classList.remove('active-btn');
    eraserButton.classList.remove('active-btn');
    const r = parseInt(pickedColor.substring(1,3), 16);
    const g = parseInt(pickedColor.substring(3,5), 16);
    const b = parseInt(pickedColor.substring(5,7), 16);
    pickedColor = `${r} ${g} ${b}`;
    normalColorEnabled = true;
    randomColorEnabled = false;
    eraserEnabled = false;
});

pickColorButton.addEventListener('click', function() {
    this.classList.add('active-btn');
    randomColorButton.classList.remove('active-btn');
    eraserButton.classList.remove('active-btn');
    normalColorEnabled = true;
    randomColorEnabled = false;
    eraserEnabled = false;
})
randomColorButton.addEventListener('click', function() {
    this.classList.add('active-btn');
    pickColorButton.classList.remove('active-btn');
    eraserButton.classList.remove('active-btn');
    normalColorEnabled = false;
    randomColorEnabled = true;
    eraserEnabled = false;
})

eraserButton.addEventListener('click', function() {
    this.classList.add('active-btn');
    pickColorButton.classList.remove('active-btn');
    randomColorButton.classList.remove('active-btn');
    normalColorEnabled = false;
    randomColorEnabled = false;
    eraserEnabled = true;
})

squareNumInput.addEventListener('input', function () {
    rowsNumber = columnsNumber = this.value;
    sketchContainer.textContent = "";
    gridSizeDiv.textContent = this.value + " x " + this.value;
    createGridOfSquares(rowsNumber, columnsNumber);
})


function colorSquare(event) {
    if (mouseDown || mouseClicked) {
        if (normalColorEnabled) {
            event.target.style.backgroundColor = `rgb(${pickedColor} / 100%)` ;
        }       
        if(randomColorEnabled) {
            event.target.style.backgroundColor = `rgb(${getRandomNumber(0, 255)} ${getRandomNumber(0, 255)} ${getRandomNumber(0, 255)} / 100%)`;
        }
        if(eraserEnabled) {
            event.target.style.backgroundColor = 'inherit';
        }
    }
}

function activateColoring(event) {
    event.preventDefault();
    mouseDown = true;
    colorSquare(event);
}

function desactivateColoring() {
    mouseDown = false;
}

function clearSquareColor(squareDiv) {
    squareDiv.style.backgroundColor = 'inherit';
}


function createGridOfSquares(rows, columns) {
    for (let i = 0; i < rows * columns; i++) {
        const squareDiv = document.createElement('div');

        let squareAreaCalculation = gridAreaCalculation / (rows * columns);
        let squareSize = Math.sqrt(squareAreaCalculation);

        squareDiv.style.height = squareSize + "px";
        squareDiv.style.width = squareSize + "px";
        squareDiv.draggable = false;

        squareDiv.addEventListener('mouseover', colorSquare);
        squareDiv.addEventListener('mousedown', activateColoring);
        squareDiv.addEventListener('mouseup', desactivateColoring);

        clearAllButton.addEventListener('click', function() {
            clearSquareColor(squareDiv) 
        })
        
        sketchContainer.appendChild(squareDiv);
    }
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
