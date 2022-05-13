var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouseX = canvas.width/2;
var mouseY = canvas.height/2;
var pullTowardsMouse = false;

window.addEventListener("mousemove", function(e) {
	mouseX = e.clientX;
	mouseY = e.clientY;
});

window.addEventListener("mousedown", function(e) {
	pullTowardsMouse = true;
});

window.addEventListener("mouseup", function(e) {
	pullTowardsMouse = false;

	orbs.forEach(function(orb) {
		var xPositiveOrNegative = Math.random() < 0.5 ? -1 : 1;
		var yPositiveOrNegative = Math.random() < 0.5 ? -1 : 1;
		orb.xVelocity = xPositiveOrNegative * orb.xVelocity;
		orb.yVelocity = yPositiveOrNegative * orb.yVelocity;
	});
});

window.addEventListener("resize", function(e) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

function Orb(radius, fillColor) {
	this.radius = radius;
	this.fillColor = fillColor;

	// Prevent orbs from spawning past the canvas boundaries
	this.xCoordinate = this.radius + (canvas.width - this.radius * 2) * Math.random();
	this.yCoordinate = this.radius + (canvas.height - this.radius * 2) * Math.random();
	this.xVelocity = Math.random() * 2 - 1;
	this.yVelocity = Math.random() * 2 - 1;
	this.gravity = .15;
	this.xShift = 0;
	this.yShift = 0;
	this.friction = .83;

	this.update = function() {
		if (pullTowardsMouse == true) {
			this.xShift += (mouseX - this.xShift) * 0.05;	
			this.yShift += (mouseY - this.yShift) * 0.05;	

			// Create circling effect when mouse is down
			this.xCoordinate = this.xShift + Math.sin(this.xVelocity) * 50;
			this.yCoordinate = this.yShift + Math.cos(this.yVelocity) * 50;

			// Increment velocity --- The longer you hold, the more powerful the burst
			if (this.xVelocity < 0) {
				this.xVelocity -= (Math.random() * 0.15); 
			} else {
				this.xVelocity += (Math.random() * 0.15); 
			};

			if (this.yVelocity < 0) {
				this.yVelocity -= (Math.random() * 0.15); 
			} else {
				this.yVelocity += (Math.random() * 0.15); 
			};

			// Prevent orbs from going off screen
			this.xCoordinate = Math.max(Math.min(this.xCoordinate, canvas.width - this.radius), 0 + this.radius);
			this.yCoordinate = Math.max(Math.min(this.yCoordinate, canvas.height - this.radius), 0  + this.radius);

		} else {
			if (this.xCoordinate + this.radius + this.xVelocity > canvas.width || this.xCoordinate - this.radius + this.xVelocity < 0) {
				this.xVelocity = -this.xVelocity * this.friction;
			}
			if (this.yCoordinate + this.radius + this.yVelocity > canvas.height || this.yCoordinate - this.radius + this.yVelocity < 0) {
				this.yVelocity = -this.yVelocity * this.friction;	
				this.xVelocity = this.xVelocity * 0.99; 

			} else {
				this.yVelocity += this.gravity;
			}

			this.xCoordinate = this.xCoordinate + this.xVelocity;
			this.yCoordinate = this.yCoordinate + this.yVelocity;

			// Store the current position of the x and y coordinates for a smooth shift
			this.xShift = this.xCoordinate;
			this.yShift = this.yCoordinate;
		}

		this.draw();
	}

	this.draw = function() {
		// View variables if needed
		// c.fillText("yCoordinate:"+ Math.floor(this.yCoordinate),this.xCoordinate + 40,this.yCoordinate);
		// c.fillText("yVelocity:"+ Math.floor(this.yVelocity),this.xCoordinate + 40,this.yCoordinate + 20);
		// c.fillText("xShift: " + this.xShift ,this.xCoordinate + 40,this.yCoordinate + 40);

		c.beginPath()	
		c.arc(this.xCoordinate, this.yCoordinate, this.radius, 0, 2 * Math.PI, false);
		c.fillStyle = fillColor;
		c.fill();
		c.closePath();
	}
}

var fillColors = [
	"#2A3B30",
	"#ABFFD1",
	"#EBFFF5",
	"#9DFEFF",
	"#273B40"
];

var orbs = [];

for (var i = 0; i < 110; i++) {
	orbs.push(new Orb(Math.floor((Math.random() * 50) + 10), fillColors[Math.floor(Math.random() * 5)]));
}


function animate() {
  window.requestAnimationFrame(animate);	

	c.fillStyle = "rgba(0,0,0,0.25)";
	c.fillRect(0, 0, canvas.width, canvas.height);

	orbs.forEach(function(orb) {
		orb.update();
	});
}

animate();