import { config } from "../../configs/MainGameConfig";
import { TextStyle, Text } from "pixi.js";
import BangUp from "../../BangUp";
import wheelGameData from "./wheelGameData.json";
import { App } from "../../App";

export class SpinEndPopupMessage extends Text {

    public message: string;

    constructor(...params: [ISpinEndPopup]) {
        super();
        Object.assign(this, params[0]);
        this.addMessage();
    }

    private addMessage() {
        const style = new TextStyle({
            fontFamily: config.mainFont,
            fontSize: 240,
            fontWeight: "900",
            fill: '#eefd79',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 4
        });

        this.text = this.message;
        this.style = style;
    }
}

export class SpinEndPopupPrize extends Text {

    private winAmount: number;
    private isBangup: boolean;

    constructor(...params: [ISpinEndPopup]) {
        super();
        Object.assign(this, params[0]);
        this.addWin();
    }

    private addWin() {
        const style = new TextStyle({
            fontFamily: config.mainFont,
            fontSize: 240,
            fontWeight: "900",
            fill: '#eefd79',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 4
        });
        this.text = this.winAmount;
        this.style = style;
    }

    public showWin(): void {
        let gameData = App.testingDebugger.debugCase === 0 ? wheelGameData : App.testingDebugger.debugData;
        let winSector = -1;
        if (App.testingDebugger.debugWinningIndex === -1) {
            winSector = wheelGameData.winningSector;
        } else {
            winSector = App.testingDebugger.debugWinningIndex;
        }

        const bonusGameTitle = gameData.sectors[winSector].bonusGameTitle;
        if (bonusGameTitle !== "") {
            this.text = bonusGameTitle;
        }
        else if (this.isBangup) {
            new BangUp(this, 2, 0, gameData.sectors[winSector].value, 0, gameData.currency);
        }
        else {
            this.text = `${gameData.sectors[winSector].value.toFixed(2)}${gameData.currency}`;
        }
    }
}

interface ISpinEndPopup {
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
    alpha: number;
    message?: string;
    winAmount?: number;
    isBangup?: boolean;
}
