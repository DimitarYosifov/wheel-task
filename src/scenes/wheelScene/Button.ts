import { Sprite, Text, TextStyle, Texture } from "pixi.js";
import { config } from "../../configs/MainGameConfig";

export class Button extends Sprite {

    private spin: Function;
    private stateTextures: IStateTextures;
    private label: string = ``;
    private labelText: Text;

    constructor(spin: Function, ...params: [IButton]) {
        super();
        Object.assign(this, params[0]);
        this.texture = Texture.from(this.stateTextures.up);
        this.spin = spin;
        this.setInteraction();
        if (this.label) {
            this.addLabel();
        }
    }

    private addLabel() {
        const style = new TextStyle({
            fontFamily: config.mainFont,
            fontSize: 240,
            fontWeight: "900",
            fill: '#eefd79',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 4
        });
        this.labelText = new Text(this.label, style);
        this.labelText.anchor.set(0.5);
        this.addChild(this.labelText);

        if (this.labelText.width > this.texture.width) {
            (this.labelText.style.fontSize as number) *= this.texture.width / this.labelText.width * 0.9;
        }
    }

    private setInteraction(): void {

        this.interactive = this.buttonMode = true;
        this.buttonMode = true;

        this.once('pointerdown', () => {
            this.interactive = this.buttonMode = false;
            this.texture = Texture.from(this.stateTextures.down);
            this.spin();
        })

        this.once('pointerup', () => { })

        this.on('pointerover', () => {
            this.texture = Texture.from(this.stateTextures.over);
        })

        this.on('pointerout', () => {
            this.texture = Texture.from(this.stateTextures.up);
        })
    }
}

interface IButton {
    scale?: {
        x: number;
        y: number;
    }
    x: number;
    y: number;
    anchor?: {
        x: number;
        y: number;
    }
    label: string
    stateTextures: IStateTextures
}

interface IStateTextures {
    up: string;
    down: string;
    over: string;
    off: string;
}
