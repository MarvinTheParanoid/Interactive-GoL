let resolution = 50; 
let gridWidth = Math.floor(window.innerWidth / resolution);
let gridHeight = Math.floor(window.innerHeight / resolution);
let refreshRate = 500;

let canvas = document.querySelector("#canvas");
canvas.width  = gridWidth * resolution;
canvas.height = gridHeight * resolution;

let ctx = canvas.getContext('2d');

let grid = Array.from(Array(gridWidth), () => new Array(gridHeight).fill(0));

document.onmousemove = mouseDraw;

function draw () {
    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridHeight; j++) {
            ctx.fillStyle = (grid[i][j])?  'green' : 'white'; 
            ctx.fillRect(i * resolution, j * resolution, resolution, resolution);
        }
    }
}


function mouseDraw (e) {
    let x = Math.floor(e.clientX / resolution);
    let y = Math.floor(e.clientY / resolution);
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
