// The title of the game to be displayed on the title screen
title = "STACK";

// The description, which is also displayed on the title screen
description = `
Stack to the top
`;

// The array of custom sprites
characters = [
];

// Game design variable container
const G = {
	WIDTH: 100,
	HEIGHT: 150,
    TOTALSLAB: 40
};

// Game runtime options
// Refer to the official documentation for all available options
options = {
	viewSize: {x: G.WIDTH, y: G.HEIGHT},
    //isCapturing: true,
    //isCapturingGameCanvasOnly: true,
    //captureCanvasScale: 2,
    //isPlayingBgm: true,
    //isReplayEnabled: true,
   // theme: "dark"
};

/**
* @typedef {{
    * pos: Vector,
    * speed: number,
    * width: number
    * }} Slab
    */
    
    /**
    * @type  { Slab [] }
    */
    
    let slabs; // slabs
    let fallingFlag; //flag for falling slab
    let currentSlab; //current slab
    let gameOver = false;   // game over

// The game loop function
function  update() {
	// The init function
	if (!ticks) {
        //generate a slab at the bottom as an init
        // might have to init an array instead?
        /*slabs.push({
            pos: vec(G.WIDTH/2,G.HEIGHT/2),
            speed: 1
        });*/
        // Initializing array of slabs (currently 10 for testing)
        slabs = times(G.TOTALSLAB, () => {
            // Random number generator function
            // rnd( min, max )
            const posX = G.WIDTH/2;
            const posY = G.HEIGHT-1;
            // An object of type Slab with appropriate properties
            return {
                // Creates a Vector
                pos: vec(posX, posY),
                // More RNG
                speed: 1,
                width: 50,
            };
        
        });

        
        // Choose a color to draw
        color("light_black");
        // Draw the slab as a square of size 10
        box(slabs[0].pos, 50,2);

        this.goingRight = true;
        currentSlab = 1;
        fallingFlag = false;
	}
    // update loop begins
        //console.log("x value: " + slabs[currentSlab].pos.x);
        //console.log("y value: " + slabs[currentSlab].pos.y);

        // Choose a color to draw
        color("light_black");
        // Draw the slab as a square of size 10
        for (let i = 0; i< G.TOTALSLAB; i++)
        {
            box(slabs[i].pos, 50,2); 

        }
        slabs[currentSlab].pos.y = 11;
        
        

    if(input.isJustPressed && fallingFlag == false) // if space/mouse is pressed. this might be buggy. we'll see
    {
        //activate boolean
        fallingFlag = true;
        console.log("FALLING");
        currentSlab++;

    }
    

    if(!fallingFlag)
    {
    
    // 11 is kind of a magic number; I just experimented until I found the right height
    // It's the height of the moving slab to be dropped. will add it as a const var in the const G container
    if(slabs[currentSlab].pos.x == G.WIDTH)
    {
        this.goingRight = false;
    }
    else if (slabs[currentSlab].pos.x == 0)
    {
        this.goingRight = true;
    }


    if(this.goingRight == true)
    {
        slabs[currentSlab].pos.x += slabs[currentSlab].speed; //move the slab on top back and forth
    }
    else if (this.goingRight == false) slabs[currentSlab].pos.x -= slabs[currentSlab].speed;
    
    

    // Choose a color to draw
    color("light_black");
    // Draw the slab as a rectangle
    box(slabs[currentSlab].pos, 50,2);
    }

    if(fallingFlag)
    {
        color("light_black");
        // Draw the slab as a rectangle
        box(slabs[currentSlab - 1].pos, 50, 2);

        slabs[currentSlab - 1].pos.y += slabs[currentSlab - 1].speed;
        // Check collision, then turn falling flag back to false
        if(slabs[currentSlab - 1].pos.y + 2 >= slabs[currentSlab - 2].pos.y) {
            fallingFlag = false;

            // Align the current slab to the center of the previous slab
            slabs[currentSlab - 1].pos.x = slabs[currentSlab - 2].pos.x;

            // Calculate the overlap between the current and the previous slab
            const overlap = getOverlap(slabs[currentSlab - 1], slabs[currentSlab - 2]);

            // If there is no overlap, end the game
            if (overlap === 0) {
                gameOver;
                return;
            }

            // Update the width of the current slab to the overlap
            slabs[currentSlab - 1].width = overlap;

            // Prepare the next slab with the same width as the current slab
            if (currentSlab < G.TOTALSLAB - 1) {
                slabs[currentSlab].width = overlap;  // Set the width of the next slab to the overlap
                slabs[currentSlab].pos.x = G.WIDTH / 2;  // Center the next slab
                slabs[currentSlab].pos.y = 11;  // Set the height for the next slab to fall from
            }

            addScore(1);
            console.log("HIT!!!!!!");
        }
    }

    function getOverlap(slab1, slab2) {
        // Calculate the left and right edges of THE slabs
        const left1 = slab1.pos.x - slab1.width / 2;
        const right1 = slab1.pos.x + slab1.width / 2;
        const left2 = slab2.pos.x - slab2.width / 2;
        const right2 = slab2.pos.x + slab2.width / 2;
    
        // Find the overlap range
        const maxLeft = Math.max(left1, left2);
        const minRight = Math.min(right1, right2);
    
        return Math.max(0, minRight - maxLeft);
    }
}
