import Lift from "./Lift";

export default class Button {
    protected parent: Lift;
    public readonly number: number;
    public button: PIXI.Sprite;

    constructor(parent: any, number: number) {
        this.parent = parent;
        this.number = number;
        this.draw()
    }

    draw() {
        this.button = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.button.width = 50;
        this.button.height = 50;
        this.button.x = 0;
        this.button.y = this.number * 50 + 10 * this.number;
        this.button.buttonMode = true;
        this.button.interactive = true;
        this.button.on('pointerdown', this.onClick.bind(this));

        window.app.stage.addChild(this.button);
    }

    onClick(): void {
        this.parent.logic.currentQueue().push(this);
        // let r = () => this.parent.logic.currentQueue()
        // if (this.parent.logic.currentQueue().length === 0) {
        //     this.parent.logic.currentQueue().push(this);
        // }
        // else if (this.parent.logic.directionDown) {
        //     if (this.parent.cabin.cabin.y < this.button.y)
        //         this.parent.queue.splice(this.findNeedPos(), 0, this);
        // }
    }

    // findNeedPos(): number {
    //     for (let i = 0; i < this.parent.queue.length; i++) {
    //         if (this.parent.queue[i].number > this.number) {
    //             return i;
    //         }

    //     }

    //     return this.parent.queue.length;
    // }

}