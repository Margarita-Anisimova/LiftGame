import Cabin from "./cabin";
import Button from "./button";
import LiftLogic from "./liftLogic";

export default class Lift {
    public cabin: Cabin;
    public buttons: Button[];
    public logic: LiftLogic;
    //public background: PIXI.Sprite;

    constructor() {
        this.buttons = this.createButton();
        this.cabin = new Cabin(this);
        this.logic = new LiftLogic(this);
        // this.background = this.makeBg();
    }

    createButton(): Button[] {
        let result: Button[] = [];
        for (let i = 0; i < 5; i++) {
            result.push(new Button(this, i))
        }
        return result;
    }

    makeBg(): PIXI.Sprite {
        const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
        bg.width = window.sceneWidth;
        bg.height = window.sceneHeight;
        window.app.stage.addChild(bg);
        return bg;
    }
}