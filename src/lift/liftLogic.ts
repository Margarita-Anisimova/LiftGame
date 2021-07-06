import Lift from "./Lift";
import Button from "./button";

export default class LiftLogic {
    public directionDown: boolean;
    private onNeedFloor: boolean;
    protected parent: Lift;
    private stop: NodeJS.Timer;
    private task: Button | undefined;
    private inWay: boolean;
    private startFloor: Button;
    public queueUp: Button[];
    public queueDown: Button[];

    public currentQueue(): Button[] {
        // return this.directionDown ? this.queueDown : this.queueUp;
        return this.queueDown;
    }

    constructor(parent: any) {
        this.parent = parent;
        this.start();
        this.startFloor = this.parent.buttons[0];
        this.inWay = false;
        this.onNeedFloor = false;
        this.directionDown = true;
        this.queueUp = [];
        this.queueDown = [];
    }

    start() {
        window.app.ticker.add(() => {
            this.task = this.currentQueue()[0];
            if (!this.inWay && this.currentQueue().length != 0) {
                this.onNeedFloor = false;
                this.update(this.task);
                this.inWay = true;
            }
            if (this.inWay && this.parent.cabin.cabin.y === this.task!.button.y) {
                clearInterval(this.stop);
                this.startFloor = this.task!;
                if (!this.onNeedFloor) {
                    setTimeout(() => this.inWay = false, 1000);
                    this.onNeedFloor = true;
                    this.currentQueue().shift();
                }
            }
        });
    }

    update(floor: Button | undefined) {
        if (floor!.number > this.startFloor.number) {
            this.stop = setInterval(() => {
                this.parent.cabin.cabin.y += 5;
            }, 100)
            this.directionDown = true;
        }
        else {
            this.stop = setInterval(() => {
                this.parent.cabin.cabin.y -= 5;
            }, 100)
            this.directionDown = false;
        }
    }
}