import { Application, DisplayObject, utils } from "pixi.js";
import gsap from "gsap";
import { TestingDebugger } from "./scenes/wheelScene/TestingDebugger";

export class App {

    public static app: Application;
    public static currentScene: IScene;

    private static _width: number;
    private static _height: number;
    public static testingDebugger: TestingDebugger;

    public static get width(): number {
        return App._width;
    }
    public static get height(): number {
        return App._height;
    }

    public static initialize(width: number, height: number, background: number): void {
        App._width = width;
        App._height = height;

        const minDPR = 2;

        App.app = new Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio > minDPR ? window.devicePixelRatio : minDPR || 1,
            autoDensity: true,
            antialias: true,
            backgroundColor: background,
            width: width,
            height: height
        });

        window.addEventListener("resize", App.resize);
        App.resize();
        (globalThis as any).__PIXI_APP__ = App.app;
    }

    public static resize(): void {
        const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        const scale = Math.min(screenWidth / App.width, screenHeight / App.height);

        const enlargedWidth = Math.floor(scale * App.width);
        const enlargedHeight = Math.floor(scale * App.height);

        const horizontalMargin = (screenWidth - enlargedWidth) / 2;
        const verticalMargin = (screenHeight - enlargedHeight) / 2;

        App.app.view.style.width = `${enlargedWidth}px`;
        App.app.view.style.height = `${enlargedHeight}px`;
        App.app.view.style.marginLeft = App.app.view.style.marginRight = `${horizontalMargin}px`;
        App.app.view.style.marginTop = App.app.view.style.marginBottom = `${verticalMargin}px`;
    }

    public static setScene(newScene: IScene): void {
        App.currentScene = newScene;
        App.app.stage.addChildAt(App.currentScene, 0);
    }

    public static fade(from: number, to: number) {
        App.currentScene.alpha = from;
        return new Promise<void>((resolve, reject) => {
            gsap.to(App.currentScene, 0.5,
                {
                    delay: 0.1,
                    alpha: to,
                    onComplete: () => {
                        resolve();
                    },
                }
            );
        })
    }

    public static removeScene(scene: IScene = App.currentScene) {
        // if (scene) {
        App.app.stage.removeChild(App.currentScene);
        App.currentScene.destroy();
        // }
    }
}

export interface IScene extends DisplayObject {
    createBackground(): void;
}
