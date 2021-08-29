/*
* - change mouseover to set to age
*    - if > 1, reduce by one each time - e.g. can't die unless age 1
*    - if 1 use game logic
*    - Setting - maturity age?? e.g. doesn't replicate if older than 1
*/


let resolution = 50; 
let refreshRate = 500;
let startAge = 5;
let maturity = false;

let gridWidth = Math.floor(window.innerWidth / resolution);
let gridHeight = Math.floor(window.innerHeight / resolution);

let canvas = document.querySelector("#canvas");
canvas.width  = gridWidth * resolution;
canvas.height = gridHeight * resolution;

let ctx = canvas.getContext('2d');

let grid = Array.from(Array(gridWidth), () => new Array(gridHeight).fill(0));

document.onmousemove = mouseDraw;

function draw () {
    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridHeight; j++) {
            ctx.fillStyle = setColor(grid[i][j]);
            //ctx.fillStyle = (grid[i][j])?  'green' : 'white'; // different colors for different ages ?? shades? e.g % change - this should be a function that can be changed later
            ctx.fillRect(i * resolution, j * resolution, resolution, resolution);
        }
    }
}


function mouseDraw (e) {
    let x = Math.floor(e.clientX / resolution);
    let y = Math.floor(e.clientY / resolution);
    grid[x][y] = startAge;
    draw()
}

function updateGrid (){
    let newGrid = Array.from(Array(gridWidth), () => new Array(gridHeight).fill(0)); //new funct - or create from other array? - only update changes??
    for (let i = 0; i < gridWidth; i++) { //can itteration be a generator - do these exist in JS?
        for (let j = 0; j < gridHeight; j++) {
            let alive = grid[i][j] ;
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
            sum += (grid[neighbourX][neighbourY] > 0); //if maturity true, it should not count as a neighbour?
        }
    }
    sum -= (grid[x][y] > 0);
    return sum 
}

function rules (alive, sum) { //make each rule clear - not combinations

    if (alive == 0 && sum == 3) { 
        return 1
    } else if (alive == 1 && (sum < 2 || sum > 3)) {
        return 0
    } else {
        return (alive > 1)? alive - 1 : alive
    }
}

function setColor (cellAge) {
    if (cellAge == 0) { return 'white'}
    let minL = 30;
    let maxL = 80; 
    let stepL = (maxL - minL) / startAge;
    let l = maxL - (stepL * cellAge);
    return `hsl(123,73%,${l}%)`

    // if (cellAge > 1) {
    //     return "orange"
    // } else if (cellAge == 1) {
    //     return "green"
    // } else { return "white"}
}

setInterval(updateGrid, refreshRate);

// does the draw want to be 4 cells but the game work off of two cells?
// do i want to have a delay before drawing cells undergo game logic?
