let resolution = 10;
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
// let canvasCells = canvasWidth * canvasHeight;
let gridWidth = Math.floor(canvasWidth / resolution);
let gridHeight = Math.floor(canvasHeight / resolution);
// let gridCells = gridWidth * gridHeight;
let cellWidth = canvasWidth / gridWidth;
let cellHeight = canvasHeight / gridHeight;
let refreshRate = 200;


let canvas = document.querySelector("#canvas");
canvas.width  = canvasWidth;
canvas.height = canvasHeight;

let ctx = canvas.getContext('2d');

let grid = Array.from(Array(gridWidth), () => new Array(gridHeight).fill(0)); //this should be a function

document.onmousemove = mouseDraw;

function draw () {
    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridHeight; j++) {
            if (grid[i][j]) {
                ctx.fillStyle = 'green';
                ctx.fillRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
            } else {
                ctx.fillStyle = 'white';
                ctx.fillRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
            }
        }
    }
}


function mouseDraw (e) {
    let x = Math.floor(e.clientX / cellWidth);
    let y = Math.floor(e.clientY / cellHeight);
    grid[x][y] = 1;
    draw()
}

function updateGrid (){
    let newGrid = Array.from(Array(gridWidth), () => new Array(gridHeight).fill(0));
    for (let i = 0; i < gridWidth; i++) { //can this be a function?
        for (let j = 0; j < gridHeight; j++) {
            let alive = grid[i][j];
            let sum = getNeighbours(i,j);
            newGrid[i][j] = rules(alive, sum);
        }
    }
    grid = newGrid;
    draw();
}

function getNeighbours(x,y){
    let sum = 0;
    for (let i = -1; i < 2; i++){
        for (let j = -1; j < 2; j++){
            let neighbourX = (x + i + gridWidth) % gridWidth;
            let neighbourY = (y + j + gridHeight) % gridHeight;
            sum += grid[neighbourX][neighbourY]
        }
    }
    sum -= grid[x][y]
    return sum 
}

function rules (alive, sum) {
    if (alive == 0 && sum == 3) {
        return 1
    } else if (alive == 1 && (sum < 2 || sum > 3)) {
        return 0
    } else {
        return alive
    }
}

setInterval(updateGrid, refreshRate);

// does the draw want to be 4 cells but the game work off of two cells?
// do i want to have a delay before drawing cells undergo game logic?
