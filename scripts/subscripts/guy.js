export class guy {
    constructor(width, height, x, y, movespeed) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.movespeed = movespeed;
        this.targetRaindrop = null;
        this.numcatches = 0;
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
            } else if (platformCenter > raindropCenter) {
                this.x -= this.movespeed;
            }
        }
    }

    // Update and draw the platform
    update(ctx, allraindrops) {
        this.scanenv(allraindrops);
        this.updatemovement();

        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
