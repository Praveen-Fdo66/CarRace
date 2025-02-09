const canvas = document.getElementById("raceCanvas");
const ctx = canvas.getContext("2d");

class Car {
    constructor(y, number) {
        this.x = canvas.width - 100; // Start from the right side
        this.y = y;
        this.width = 100;
        this.height = 50;
        this.speed = Math.random() * 7 + 1; // Random speed (1-8)
        this.number = number;
        this.bodyColor = this.getRandomColor();
        this.windowColor = this.getRandomColor();
    }

    // Get a random color
    getRandomColor() {
        return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    }

    // Draw the car
    draw() {
        ctx.fillStyle = this.bodyColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Draw windows
        ctx.fillStyle = this.windowColor;
        ctx.fillRect(this.x + 10, this.y + 10, 20, 20);
        ctx.fillRect(this.x + 40, this.y + 10, 20, 20);
        ctx.fillRect(this.x + 70, this.y + 10, 20, 20);

        // Draw wheels
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.x + 20, this.y + 50, 10, 0, Math.PI * 2);
        ctx.arc(this.x + 80, this.y + 50, 10, 0, Math.PI * 2);
        ctx.fill();

        // Draw car number
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(this.number, this.x + 45, this.y + 30);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.strokeText(this.number, this.x + 45, this.y + 30);
    }

    // Move the car to the left
    move() {
        this.speed = Math.random() * 7 + 1; // Change speed every frame
        this.x -= this.speed; // Move left
    }
}

const cars = [];
const numCars = 4;
const carSpacing = 150; // Distance between each car

// Initialize cars
for (let i = 0; i < numCars; i++) {
    cars.push(new Car(100 + i * carSpacing, i + 1));
}

// Draw all cars initially
function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    cars.forEach(car => car.draw()); // Draw each car
}

drawScene();

let raceInterval;

// Start race function
function startRace() {
    clearInterval(raceInterval); // Clear previous race if any

    raceInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

        let winner = null;
        cars.forEach(car => {
            car.move();
            car.draw();

            // Check if any car reaches the left edge
            if (car.x <= 0) {
                winner = car;
            }
        });

        // If a car wins, stop the race
        if (winner) {
            clearInterval(raceInterval);
            alert(`Car ${winner.number} wins!`);
        }
    }, 50);
}

document.getElementById("startRace").addEventListener("click", startRace);
