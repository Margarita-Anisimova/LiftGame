import Cabin from "./cabin";
import Button from "./button";
import LiftLogic from "./liftLogic";

export default class Lift {
    public cabin: Cabin;
    public buttons: Button[];
    public logic: LiftLogic;

    constructor() {
        this.buttons = this.createButton();
        this.cabin = new Cabin(this);
        this.logic = new LiftLogic(this);
    }

    createButton(): Button[] {
        let result: Button[] = [];
        for (let i = 0; i < 5; i++) {
            result.push(new Button(this, i))
        }
        return result;
    }
}