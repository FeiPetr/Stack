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
    * speed: number
    * }} Slab
    */
    
    /**
    * @type  { Slab [] }
    */
    
    let slabs; // slabs
    

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

        slabs = times(10, () => {
            // Random number generator function
            // rnd( min, max )
            const posX = G.WIDTH/2;
            const posY = G.HEIGHT-1;
            // An object of type Slab with appropriate properties
            return {
                // Creates a Vector
                pos: vec(posX, posY),
                // More RNG
                speed: 1
            };
        });




            // Choose a color to draw
            color("light_black");
            // Draw the slab as a square of size 10
            box(slabs[0].pos, 50,2);

    


        this.goingRight = true;


	}
    // Choose a color to draw
    color("light_black");
    // Draw the slab as a square of size 10
    box(slabs[0].pos, 50,2);
    
    for (let i = 1; i < 10; i++)
    {
        slabs[i].pos.y = 11;
        // 11 is kind of a magic number; I just experimented until I found the right height
        // It's the height of the moving slab to be dropped. will add it as a const var in the const G container
        if(slabs[i].pos.x == G.WIDTH)
        {
            this.goingRight = false;
        }
        else if (slabs[i].pos.x == 0)
        {
            this.goingRight = true;
        }


        if(this.goingRight == true)
        {
            slabs[i].pos.x += slabs[i].speed; //move the slab on top back and forth
        }
        else if (this.goingRight == false) slabs[i].pos.x -= slabs[i].speed;
         
        

        // Choose a color to draw
        color("light_black");
        // Draw the slab as a rectangle
        box(slabs[i].pos, 50,2);
    }



}
