import Lift from "./Lift";
import { liftStates } from "./liftStates";

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
        if (!this.parent.logic.queueDown.includes(this) && !this.parent.logic.queueUp.includes(this)) {
            if (this.parent.logic.currentQueue().length === 0) {
                this.parent.logic.state = this.parent.cabin.cabin.y < this.button.y ? liftStates.down : liftStates.up;
                this.parent.logic.currentQueue().push(this);
            }
            else if (this.parent.cabin.cabin.y < this.button.y)
                this.parent.logic.queueDown.splice(this.findNeedPos(this.parent.logic.queueDown, true), 0, this);
            else {
                this.parent.logic.queueUp.splice(this.findNeedPos(this.parent.logic.queueUp, false), 0, this);
            }
        }

    }

    findNeedPos(queue: Button[], down: boolean): number {
        for (let i = 0; i < queue.length; i++) {
            if (down
                ? queue[i].number > this.number
                : queue[i].number < this.number) {
                return i;
            }

        }

        return queue.length
    }

}