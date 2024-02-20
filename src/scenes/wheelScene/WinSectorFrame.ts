import { Sprite, Texture } from "pixi.js";

export class WinSectorFrame extends Sprite {

    private winFrameTexture: string;

    constructor(...params: [IWinFrame]) {
        super();
        Object.assign(this, params[0]);
        this.texture = Texture.from(this.winFrameTexture);
    }
}

interface IWinFrame {
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
    alpha?: number;
    winFrameTexture: string;
}
