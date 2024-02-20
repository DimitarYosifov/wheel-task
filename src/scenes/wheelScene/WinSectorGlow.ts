import { Sprite, Texture } from "pixi.js";

export class WinSectorGlow extends Sprite {

    private winGlowTexture: string;

    constructor(...params: [IWinGlow]) {
        super();
        Object.assign(this, params[0]);
        this.texture = Texture.from(this.winGlowTexture);
    }
}

interface IWinGlow {
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
    winGlowTexture: string;
}
