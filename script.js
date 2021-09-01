// Global variables
let resolution = 30; 
let refreshRate = 200;
let startAge = 10;
let maturity = false;


// Setup
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');

let gridWidth;
let gridHeight;
let grid;
setup();

// listners

window.addEventListener('resize', setup);

setInterval(updateGrid, refreshRate);

document.onmousemove = mouseDraw;

let touch = false;
canvas.addEventListener('touchstart', () => touch = true);
canvas.addEventListener('touchend', () => touch = false);
canvas.addEventListener('touchend', touchDraw, false);



// main functions

function setup() {
    resizeCanvas();
    grid = createGrid(); // in future - grid = (grid)? resizeGrid(): createGrid();
}

function resizeCanvas () {
    gridWidth = Math.floor(window.innerWidth / resolution);
    gridHeight = Math.floor(window.innerHeight / resolution);

    canvas.width  = gridWidth * resolution;
    canvas.height = gridHeight * resolution;
}

function createGrid () {
    return Array.from(Array(gridWidth), () => new Array(gridHeight).fill(0));
}

function draw () {
    for (let i = 0; i < gridWidth; i++) {
        for (let j = 0; j < gridHeight; j++) {
            ctx.fillStyle = setColor(grid[i][j]);
            ctx.fillRect(i * resolution, j * resolution, resolution, resolution);
        }
    }
}

function updateGrid (){
    let newGrid = createGrid(); 
    for (let i = 0; i < gridWidth; i++) { 
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
            if (maturity){
                sum += (grid[neighbourX][neighbourY] == 1);
            } else {
                sum += (grid[neighbourX][neighbourY] > 0);
            }
        }
    }
    sum -= (grid[x][y] > 0);
    return sum 
}

function rules (alive, sum) { 

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
    let maxL = 90; 
    let stepL = (maxL - minL) / startAge;
    let l = maxL - (stepL * cellAge);
    return `hsl(123,73%,${l}%)`
}


// button functions


//helper functions

function mouseDraw (e) {
    let x = Math.floor(e.clientX / resolution);
    let y = Math.floor(e.clientY / resolution);
    grid[x][y] = startAge;
    draw()
}

function touchDraw(e) {
    if (!touch) {return};
    let x = Math.floor(e.touches[0].clientX / resolution);
    let y = Math.floor(e.touches[0].clientY / resolution);
    grid[x][y] = startAge;
    draw()
}



// Buttons

let resetButton = document.querySelector(".reset > .icon");
resetButton.addEventListener('click', reset);
function reset () {
    resetButton.style.animation = "spinLeft 0.2s"
    grid = Array.from(Array(gridWidth), () => new Array(gridHeight).fill(0));
    resetButton.addEventListener('animationend', () => this.style.animation = null);
    settingsToggle();
}

let settingsButton = document.querySelector(".settings > .icon");
settingsButton.addEventListener('click', settingsToggle);
function settingsToggle (){
    let settings = document.querySelector(".button.settings");
    let width = settings.style.width;
    if (width == "50px" || width == ""){
        settings.style.width = "300px";
    } else {
        settings.style.width = "50px";
    }
}

