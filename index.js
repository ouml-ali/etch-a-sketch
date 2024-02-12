const MAX_GRID_SIZE = 400;


const sketchContainer = document.getElementById("container");



const gridAreaCalculation = MAX_GRID_SIZE * MAX_GRID_SIZE;

let rowsNumber = 16;
let columnsNumber = 16;

// createGridOfSquares(rowsNumber, columnsNumber);


function createGridOfSquares(rows, columns) {
    

    for (let i = 0; i < rows * columns; i++) {
        
        const squareDiv = document.createElement('div');
        squareDiv.classList.add('grid-square');

        let squareAreaCalculation = Math.sqrt(Math.floor(gridAreaCalculation / (rows * columns)));
        let squareSize = Math.sqrt(squareAreaCalculation);

        squareDiv.style.height = squareSize;
        squareDiv.style.width = squareSize;
        sketchContainer.appendChild(squareDiv);
    }
}

