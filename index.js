const MAX_GRID_SIZE = 400;

const sketchContainer = document.getElementById("container");

const colorPicker = document.getElementById("color-picker");

const pickColorButton = document.getElementById("colorpick-btn");

const randomColorButton = document.getElementById("random-color-btn");

const eraserButton = document.getElementById("eraser-btn");

const clearAllButton = document.getElementById("clear-btn");

const squareNumInput = document.getElementById("square-numbers");


const gridAreaCalculation = MAX_GRID_SIZE * MAX_GRID_SIZE;

let mouseDown = false;
let normalColorEnabled = true;
let randomColorEnabled = false;
let eraserEnabled = false;

let rowsNumber = 16;
let columnsNumber = 16;



createGridOfSquares(rowsNumber, columnsNumber);



// colorPicker.addEventListener("input", function() {
//   console.log("color picked :" + this.value );
// });

pickColorButton.addEventListener('click', function() {
    normalColorEnabled = true;
    randomColorEnabled = false;
    eraserEnabled = false;
})
randomColorButton.addEventListener('click', function() {
    normalColorEnabled = false;
    randomColorEnabled = true;
    eraserEnabled = false;
})

eraserButton.addEventListener('click', function() {
    normalColorEnabled = false;
    randomColorEnabled = false;
    eraserEnabled = true;
})

squareNumInput.addEventListener('change', function () {
    rowsNumber = columnsNumber = this.value;
    sketchContainer.textContent = "";
    createGridOfSquares(rowsNumber, columnsNumber);
})


function colorSquare(event) {
    if (mouseDown === true) {
        if (normalColorEnabled) {
            event.target.style.backgroundColor = `rgb(18 18 18 / 100%)` ;
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
        squareDiv.addEventListener('click', colorSquare);
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
