export class guy {
    constructor(width, height, x, y, movespeed) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.movespeed = movespeed;
        this.targetRaindrop = null;
        this.numcatches = 0;
        this.spriteright = new Image();
        this.spriteright.src = "images/robotright.png"
        this.spriteleft = new Image();
        this.spriteleft.src = "images/robotleft.png"
        this.movedirection = 0;
    }

    // Find the nearest raindrop
    scanenv(allraindrops) {
        let closestRaindrop = null;
        // let minDistance = Infinity;

        // allraindrops.forEach(raindrop => {
        //     const distance = Math.abs(this.x + this.width / 2 - (raindrop.x + raindrop.width / 2));
        //     if (distance < minDistance) {
        //         minDistance = distance;
        //         closestRaindrop = raindrop;
        //     }
        // });
        allraindrops.forEach(raindrop =>{
            if (!closestRaindrop || raindrop.y > closestRaindrop.y){
                closestRaindrop = raindrop;
            }
        });

        this.targetRaindrop = closestRaindrop;
    }

    // Move towards the nearest raindrop
    updatemovement() {
        if (this.targetRaindrop) {
            const platformCenter = this.x + this.width / 2;
            const raindropCenter = this.targetRaindrop.x + this.targetRaindrop.width / 2;

            if (platformCenter < raindropCenter) {
                this.x += this.movespeed;
                this.movedirection = 0;
            } else if (platformCenter > raindropCenter) {
                this.x -= this.movespeed;
                this.movedirection = 1;
            }
        }
    }

    // Update and draw the platform
    update(ctx, allraindrops) {
        this.scanenv(allraindrops);
        this.updatemovement();

        ctx.fillStyle = "blue";
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        if (this.movedirection == 0){
            ctx.drawImage(this.spriteright, this.x, this.y-100, this.width, this.height+70);
        }
        else if (this.movedirection == 1){
            ctx.drawImage(this.spriteleft, this.x, this.y-100, this.width, this.height+70);
        }
    }
}
