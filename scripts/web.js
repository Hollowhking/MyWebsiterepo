// Import necessary classes
import { rain } from "./subscripts/rain.js";
import { guy } from "./subscripts/guy.js";

let canvas = document.getElementById("backgroundCanvas");
let ctx = canvas.getContext("2d");

// Set canvas dimensions to match the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Simulation settings
let maxnumraindropsonscreen = 10;
let rainarray = [];
let guysarray = [];
let numguys = 1;

// Initialize and start the game
function startgame() {
    // Initialize raindrops
    rainarray = [];
    for (let i = 0; i < maxnumraindropsonscreen; i++) {
        let curraindrop = new rain(10, 10, getRandomInt(canvas.width - 10), 0);
        rainarray.push(curraindrop);
    }

    // Initialize the platform
    guysarray = [];
    for (let i = 0; i < numguys; i++) {
        let curguy = new guy(200, 60, getRandomInt(canvas.width - 100), canvas.height - 50, 5);
        guysarray.push(curguy);
    }

    // Start the animation loop
    requestAnimationFrame(updateGameArea);
}

// Update the game area
function updateGameArea() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set background color
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update all platforms (guys)
    guysarray.forEach((thisguy) => {
        thisguy.update(ctx, rainarray);
    });

    // Update all raindrops
    rainarray.forEach((raindrop) => {
        raindrop.update(ctx, "black", guysarray);
    });
    
    // guysarray.forEach((thisguy) => {
    //     ctx.font = "50px serif";
    //     ctx.fillText('Caught: '+thisguy.numcatches, 50, 250);
    // });

    // Loop the animation
    requestAnimationFrame(updateGameArea);
}

// Utility function to generate random integers
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Adjust canvas size on window resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Start the game when the page loads
window.onload = () => {
    console.log("Starting simulation...");
    startgame();
};
