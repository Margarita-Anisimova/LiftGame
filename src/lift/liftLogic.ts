import Lift from "./Lift";
import Button from "./button";
import { liftStates } from "./liftStates";

export default class LiftLogic {
    public state: liftStates;
    private onNeedFloor: boolean;
    protected parent: Lift;
    private stop: NodeJS.Timer;
    private task: Button | undefined;
    private inWay: boolean;
    private startFloor: Button;
    public queueUp: Button[];
    public queueDown: Button[];

    public currentQueue(): Button[] {
        return this.state == liftStates.down ? this.queueDown : this.queueUp;
    }


    constructor(parent: any) {
        this.parent = parent;
        this.start();
        this.startFloor = this.parent.buttons[0];
        this.inWay = false;
        this.onNeedFloor = false;
        this.state = liftStates.stop;
        this.queueUp = [];
        this.queueDown = [];
    }

    start() {
        window.app.ticker.add(() => {
            if (this.queueDown.length == 0) {
                if (this.queueUp.length == 0) {
                    this.state = liftStates.stop
                }
                else
                    this.state = liftStates.up
            }
            else if (this.queueUp.length == 0) {
                this.state = liftStates.down
            }

            // this.state = this.queueDown.length == 0 && this.queueUp.length == 0 ? liftStates.stop : this.state
            // this.state = this.queueDown.length == 0 ? liftStates.up : this.state
            // this.state = this.queueUp.length == 0 ? liftStates.down : this.state
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
                    setTimeout(() => { this.inWay = false; this.currentQueue().shift(); }, 1000);
                    this.onNeedFloor = true;
                }
            }
            // if (this.inWay) {
            //     if (this.state == liftStates.down && this.parent.cabin.cabin.y >= this.task!.button.y
            //         || this.state == liftStates.up && this.parent.cabin.cabin.y <= this.task!.button.y) {
            //         clearInterval(this.stop);
            //         this.startFloor = this.task!;
            //         if (!this.onNeedFloor) {
            //             setTimeout(() => { this.inWay = false; this.currentQueue().shift(); }, 1000);
            //             this.onNeedFloor = true;
            //         }
            //     }
            // }
        })
    }

    update(floor: Button | undefined) {
        if (floor!.number > this.startFloor.number) {
            this.stop = setInterval(() => {
                this.parent.cabin.cabin.y += 5
            }, 100)
            this.state = liftStates.down;
        }
        else {
            this.stop = setInterval(() => {
                this.parent.cabin.cabin.y -= 5;
            }, 100)
            this.state = liftStates.up;
        }
    }
}