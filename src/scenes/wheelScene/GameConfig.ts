export class GameConfig {
    public static elements: Map<string, any> = new Map()
        .set('Background', {
            texture: `background`,
            width: 1920,
            height: 1080,
        })
        .set('Wheel', {
            x: 960,
            y: 540,
            anchor: { x: 0.5, y: 0.5 },
            wheelTexture: "wheel"
        })
        .set('WinSectorFrame', {
            winFrameTexture: `win_frame`,
            x: 963,
            y: 122,
            anchor: { x: 0.5, y: 0 },
            scale: { x: 1, y: 1 }
        })
        .set('WinSectorGlow', {
            winGlowTexture: `win_glow`,
            x: 963,
            y: 122,
            anchor: { x: 0.5, y: 0 },
            scale: { x: 1, y: 1 },
            alpha: 0
        })
        .set('SpinButton', {
            x: 965,
            y: 547,
            anchor: { x: 0.5, y: 0.5 },
            scale: { x: 1, y: 1 },
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
