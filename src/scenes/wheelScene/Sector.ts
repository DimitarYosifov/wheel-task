import { TextStyle, Text, Container } from "pixi.js";
import wheelGameData from "./wheelGameData.json"
import { config } from "../../configs/MainGameConfig";
import { App } from "../../App";

export class Sector extends Container {

    private sectorReward: Text;
    private reward: string | number;
    private sectorIndex: number;
    private distance: number;
    private gameData: ISector[];

    constructor(sector: ISector, sectorIndex: number, distance: number) {
        super();
        this.sectorIndex = sectorIndex;
        this.distance = distance;
        this.gameData = App.testingDebugger.debugCase === 0 ? wheelGameData.sectors : App.testingDebugger.debugData.sectors;
        const style = new TextStyle({
            fontFamily: config.mainFont,
            fontSize: 50,
            fontWeight: "900",
            fill: '#eefd79',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 4
        });

        this.reward = sector.value || sector.bonusGameTitle;
        this.sectorReward = new Text(this.reward, style);
        this.sectorReward.anchor.set(0.5);

        this.setTextPositionAndAngle();
        this.addChild(this.sectorReward)
    }

    private setTextPositionAndAngle() {
        const startAngle: number = Math.PI * -0.5;
        const theta: number = ((Math.PI * 2) / this.gameData.length);
        const angle: number = (theta * this.sectorIndex);
        const radius: number = this.distance;
        const x: number = radius * (Math.cos(angle + startAngle));
        const y: number = radius * (Math.sin(angle + startAngle));
        const degrees = angle * (180 / Math.PI)
        this.sectorReward.position.set(x, y);
        this.sectorReward.angle = degrees;
    }
}

export interface ISector {
    monetary: boolean,
    value: number,
    bonusGame: boolean,
    bonusGameTitle: string
}
