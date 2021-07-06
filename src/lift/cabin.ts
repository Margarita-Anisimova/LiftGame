import Lift from "./Lift";

export default class Cabin {
    protected parent: Lift;
    private busy: boolean;
    public cabin: PIXI.Graphics;

    constructor(parent: any) {
        this.parent = parent;
        this.busy = false;
        this.draw();
    }

    draw(): void {
        this.cabin = new PIXI.Graphics();
        this.cabin.beginFill(0x59131b);
        this.cabin.drawRect(100, 0, 50, 50);
        this.cabin.endFill();
        window.app.stage.addChild(this.cabin);
    }
}