import { Container, TextStyle, Text } from "pixi.js";
import { config } from "../../configs/MainGameConfig";
import { App } from "../../App";
import { IGameData, WheelScene } from "./WheelScene";
import { GameConfig } from "./GameConfig";
import wheelGameData from "./wheelGameData.json"
import { ISector } from "./Sector";
export class TestingDebugger extends Container {

    public debugElements: Map<string, any>
    public debugData: IGameData;
    public debugCase: number = 0;
    public debugWheelSelectedIndex: number = 0;
    public debugWinningIndex: number = -1;
    private wrapper: Container;
    private wheelSelectionWrapper: Container = new Container();

    constructor() {
        super();
        this.wheelSelection();
        this.selectWinningsector();
    }

    private updateSectors() {
        const sectors = this.debugCase === 0 ? wheelGameData.sectors : this.debugData.sectors;
        for (let [index, sector] of sectors.entries()) {
            if (index === this.debugWinningIndex) {
                (this.wrapper.children[index] as Text).style.fill = `#74ff2f`;
            } else {
                (this.wrapper.children[index] as Text).style.fill = `#eefd79`;
            }
        }
    }
    private updateWheelsText() {
        for (let index = 0; index < 3; index++) {
            if (index === this.debugCase) {
                (this.wheelSelectionWrapper.children[index] as Text).style.fill = `#74ff2f`;
            } else {
                (this.wheelSelectionWrapper.children[index] as Text).style.fill = `#eefd79`;
            }
        }
    }

    private selectWinningsector() {
        const sectors = this.debugCase === 0 ? wheelGameData.sectors : this.debugData.sectors;
        let y = 100;
        this.wrapper = new Container();
        for (let [sectorIndex, sectorData] of sectors.entries()) {
            const style: TextStyle = new TextStyle({
                fontFamily: config.mainFont,
                fontSize: 30,
                fontWeight: "900",
                fill: '#eefd79',
                align: 'center',
                stroke: '#000000',
                strokeThickness: 4
            });
            y += 50;
            let text = new Text(`${sectorData.value || sectorData.bonusGameTitle}`, style);
            if (sectorIndex === 0) {
                text.style.fill = `#74ff2f`
            }
            text.interactive = text.buttonMode = true;
            text.anchor.set(0, 0.5)
            text.position.set(1600, 0 + y)
            this.wrapper.addChild(text);
            text.on('pointerdown', () => {
                this.debugWinningIndex = sectorIndex;
                this.updateSectors();
            })
        }
        this.addChild(this.wrapper);
    }

    private wheelSelection() {
        for (let index = 0; index < 3; index++) {
            const style: TextStyle = new TextStyle({
                fontFamily: config.mainFont,
                fontSize: 40,
                fontWeight: "900",
                fill: '#eefd79',
                align: 'center',
                stroke: '#000000',
                strokeThickness: 4
            });

            let text = new Text(`select wheel ${index}`, style);
            text.anchor.set(0, 0.5)
            text.position.set(75, 100 + 50 * index)
            if (index === 0) {
                text.style.fill = `#74ff2f`
            }
            this.wheelSelectionWrapper.addChild(text);

            text.interactive = text.buttonMode = true;
            text.on('pointerdown', () => {
                this.debugCase = index;
                this.updateWheelsText();
                if (this.debugCase !== 0) {
                    this.setDubugCase();
                }
                this.debugWinningIndex = -1;
                this.setDubugData();
                this.removeChild(this.wrapper);

                App.fade(1, 0)
                    .then(() => {
                        App.removeScene();
                        App.setScene(new WheelScene());
                        this.selectWinningsector();
                    })

            })
        }

        this.addChild(this.wheelSelectionWrapper);
    }

    private setDubugCase() {
        if (this.debugCase === 1) {
            this.debugElements = new Map()
                .set('Background', {
                    texture: `background`,
                    width: 1920,
                    height: 1080,
                })
                .set('Wheel', {
                    x: 960,
                    y: 540,
                    anchor: { x: 0.5, y: 0.5 },
                    scale: { x: 1.2, y: 1.2 },
                    wheelTexture: "wheel_4"
                })
                .set('SpinButton', {
                    x: 952,
                    y: 544,
                    anchor: { x: 0.5, y: 0.5 },
                    scale: { x: 2.1, y: 2.1 },
                    stateTextures: {
                        up: "spin_button_up",
                        down: "spin_button_off",
                        over: "spin_button_over",
                        off: "spin_button_off",
                    },
                    label: ``
                })
                .set('SpinEndPopupMessage', {
                    message: `YOU WON`,
                    x: 960,
                    y: 350,
                    anchor: { x: 0.5, y: 0.5 },
                    alpha: 0
                })
                .set('SpinEndPopupPrize', {
                    winAmount: 0,
                    x: 965,
                    y: 567,
                    anchor: { x: 0.5, y: 0.5 },
                    alpha: 0,
                    isBangup: true
                });
        }
        else {
            this.debugElements = new Map()
                .set('Background', {
                    texture: `background`,
                    width: 1920,
                    height: 1080,
                })
                .set('Wheel', {
                    x: 960,
                    y: 540,
                    anchor: { x: 0.5, y: 0.5 },
                    scale: { x: 1.1, y: 1.1 },
                    wheelTexture: "wheel_7"
                })
                .set('SpinButton', {
                    x: 965,
                    y: 547,
                    anchor: { x: 0.5, y: 0.5 },
                    scale: { x: 1.5, y: 1.5 },
                    stateTextures: {
                        up: "on",
                        down: "off",
                        over: "on",
                        off: "off",
                    },
                    label: `Spin`
                })
                .set('SpinEndPopupMessage', {
                    message: `YOU WON`,
                    x: 960,
                    y: 350,
                    anchor: { x: 0.5, y: 0.5 },
                    alpha: 0
                })
                .set('SpinEndPopupPrize', {
                    winAmount: 0,
                    x: 965,
                    y: 567,
                    anchor: { x: 0.5, y: 0.5 },
                    alpha: 0,
                    isBangup: true
                });
        }

    }

    private setDubugData() {
        if (this.debugCase === 1) {
            this.debugData = {
                "wheelSpinDuration": 5,
                "wheelSpinsCount": 4,
                "winningSector": 0,
                "currency": "$",
                "sectors": [
                    {
                        "monetary": true,
                        "value": 150,
                        "bonusGame": false,
                        "bonusGameTitle": ""
                    },
                    {
                        "monetary": true,
                        "value": 200,
                        "bonusGame": false,
                        "bonusGameTitle": ""
                    },
                    {
                        "monetary": true,
                        "value": 300,
                        "bonusGame": false,
                        "bonusGameTitle": ""
                    },
                    {
                        "monetary": true,
                        "value": 350,
                        "bonusGame": false,
                        "bonusGameTitle": ""
                    }
                ]
            }
        }
        else {
            this.debugData = {
                "wheelSpinDuration": 5,
                "wheelSpinsCount": 4,
                "winningSector": 0,
                "currency": "$",
                "sectors":

                    [
                        {
                            "monetary": true,
                            "value": 10,
                            "bonusGame": false,
                            "bonusGameTitle": ""
                        },
                        {
                            "monetary": true,
                            "value": 20,
                            "bonusGame": false,
                            "bonusGameTitle": ""
                        },
                        {
                            "monetary": true,
                            "value": 30,
                            "bonusGame": false,
                            "bonusGameTitle": ""
                        },
                        {
                            "monetary": true,
                            "value": 40,
                            "bonusGame": false,
                            "bonusGameTitle": ""
                        },
                        {
                            "monetary": true,
                            "value": 50,
                            "bonusGame": false,
                            "bonusGameTitle": ""
                        },
                        {
                            "monetary": true,
                            "value": 60,
                            "bonusGame": false,
                            "bonusGameTitle": ""
                        },
                        {
                            "monetary": true,
                            "value": 70,
                            "bonusGame": false,
                            "bonusGameTitle": ""
                        }
                    ]
            }
        }
    }
}
