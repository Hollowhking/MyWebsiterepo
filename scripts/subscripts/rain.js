export class rain{
    constructor(width, height, x, y){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speedx = 0;
        this.speedy = 0;
        this.grav = Math.random();
        this.contact = false;
    }

    
    update(ctx, color, platforms) {
        //Apply gravity:
        this.speedy += this.grav;
    
        //Update position:
        this.y += this.speedy;
    
        //reset on bottom bounds:
        if (this.y > ctx.canvas.height) {
            this.y = 0; // Reset to top
            this.speedy = 0; // Reset speed
            this.x = Math.random() * ctx.canvas.width;
        }

        //Reset when contact with platform
        platforms.forEach(guy => {
            if (this.x + this.width >= guy.x &&
                this.x <= guy.x + guy.width &&
                this.y + this.height >= guy.y &&
                this.y <= guy.y + guy.height){
                    this.y = 0;
                    this.speedy = 0;
                    this.x = Math.random() * ctx.canvas.width;
                    guy.numcatches += 1;
                }
        });
    
        // Draw:
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
}