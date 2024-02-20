import { Sprite, Texture } from "pixi.js";
import wheelGameData from "./wheelGameData.json"
import { Sector } from "./Sector";
import { App } from "../../App";

export class Wheel extends Sprite {

    private wheelTexture: string;

    constructor(...params: [IWheel]) {
        super();
        Object.assign(this, params[0]);
        this.texture = Texture.from(this.wheelTexture);
        this.createSectors();
    }

    private createSectors(): void {
        const gameData = App.testingDebugger.debugCase === 0 ? wheelGameData : App.testingDebugger.debugData;

        for (let [sectorIndex, sectorData] of gameData.sectors.entries()) {
            if (!sectorData.monetary && sectorData.bonusGame) {
                //this sector is empty
                continue;
            }
            const distance: number = this.width * 0.3 / this.scale.x;
            const sector = new Sector(sectorData, sectorIndex, distance);
            this.addChild(sector);
        }
    }
}

interface IWheel {
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
    wheelTexture: string;
}
