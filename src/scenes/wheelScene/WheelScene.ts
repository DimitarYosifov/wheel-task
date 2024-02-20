import { App, IScene } from "../../App";
import { Container, Sprite } from "pixi.js";
import gsap from "gsap";
import { Button } from "./Button";
import { Wheel } from "./Wheel";
import { WinSectorFrame } from "./WinSectorFrame";
import { WinSectorGlow } from "./WinSectorGlow";
import wheelGameData from "./wheelGameData.json"
import { SpinEndPopupMessage } from "./SpinEndPopup";
import { SpinEndPopupPrize } from "./SpinEndPopup";
import { GameConfig } from "./GameConfig";
import { TestingDebugger } from "./TestingDebugger";
import { ISector } from "./Sector";

export class WheelScene extends Container implements IScene {

    private background: Sprite;
    private wheel: Wheel;
    private winSectorFrame: WinSectorFrame;
    private winSectorGlow: WinSectorGlow;
    private spinButton: Button;
    private spinEndPopupMessage: SpinEndPopupMessage;
    private spinEndPopupPrize: SpinEndPopupPrize;
    private gameElements: Map<string, any>
    private gameData: IGameData;
    constructor() {
        super();
        if (App.testingDebugger && App.testingDebugger.debugCase > 0) {
            this.gameElements = App.testingDebugger.debugElements;
        } else {
            this.gameElements = GameConfig.elements;
        }
        this.gameData = App.testingDebugger.debugCase === 0 ? wheelGameData : App.testingDebugger.debugData;

        this.createBackground();
        this.createWheel();
        this.createWinSectorFrame();
        this.createWinSectorGlow();
        this.createSpinButton();
        this.createPopup();

    }

    public createBackground(): void {
        const params = this.gameElements.get("Background");
        this.background = Sprite.from(params.texture);
        this.background.width = params.width;
        this.background.height = params.height;
        this.addChild(this.background);
    }

    private createWheel(): void {
        this.wheel = new Wheel(this.gameElements.get("Wheel"));
        this.addChild(this.wheel);
    }

    private createWinSectorFrame(): void {
        if (this.gameElements.has("WinSectorFrame")) {
            this.winSectorFrame = new WinSectorFrame(this.gameElements.get("WinSectorFrame"));
            this.addChild(this.winSectorFrame);
        }
    }

    private createWinSectorGlow(): void {
        if (this.gameElements.has("WinSectorGlow")) {
            this.winSectorGlow = new WinSectorGlow(this.gameElements.get("WinSectorGlow"));
            this.addChild(this.winSectorGlow);
        }
    }

    private createSpinButton(): void {
        this.spinButton = new Button(
            this.spin.bind(this),
            this.gameElements.get("SpinButton")
        )
        this.addChild(this.spinButton);
    }

    private createPopup(): void {
        this.spinEndPopupMessage = new SpinEndPopupMessage(this.gameElements.get("SpinEndPopupMessage"));
        this.spinEndPopupPrize = new SpinEndPopupPrize(this.gameElements.get("SpinEndPopupPrize"));
        this.addChild(this.spinEndPopupMessage);
        this.addChild(this.spinEndPopupPrize);
    }

    private spin(): void {
        const step = 2 / this.gameData.sectors.length;
        let additionalRotation: number = 0;
        if (App.testingDebugger.debugWinningIndex === -1) {
            additionalRotation = Math.PI * (2 - step * this.gameData.winningSector);
        } else {
            additionalRotation = Math.PI * (2 - step * App.testingDebugger.debugWinningIndex);
        }
        const totalRotation = Math.PI * 2 * this.gameData.wheelSpinsCount + additionalRotation;
        const timeline = gsap.timeline();

        timeline.to(this.wheel,
            {
                duration: 0.1,
                repeat: 1,
                yoyo: true,
                rotation: Math.PI / -20,
            }
        );
        timeline.to(this.wheel,
            {
                duration: this.gameData.wheelSpinDuration,
                ease: "Back.easeOut(0.5)",
                rotation: totalRotation,
            }
        );
        if (this.gameElements.has("WinSectorGlow")) {
            timeline.to(this.winSectorGlow,
                {
                    duration: 0.5,
                    alpha: 0.75,
                    repeat: 3,
                    yoyo: true
                }
            );
        }
        timeline.from(this.spinEndPopupMessage.scale,
            {
                x: 0,
                y: 0,
                duration: 0.3,
                onStart: () => {
                    this.spinEndPopupMessage.alpha = 1;
                }
            }
        );
        timeline.from(this.spinEndPopupPrize.scale,
            {
                x: 0,
                y: 0,
                duration: 0.3,
                onStart: () => {
                    this.spinEndPopupPrize.alpha = 1;
                    this.spinEndPopupPrize.showWin();
                }
            }
        );
    }
}

export interface IGameData {
    wheelSpinDuration: number,
    wheelSpinsCount: number,
    winningSector: number,
    currency: string,
    sectors: ISector[];
}
