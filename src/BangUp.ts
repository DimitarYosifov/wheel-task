import { Text } from "pixi.js";
import gsap from "gsap";

export default class BangUp {
    constructor(target: Text, duration: number, startVal: number, endVal: number, delay = 0, currency: string, onStart = null, onUpdate = null, onComplete = null) {
        const tween = gsap.to(target, duration,
            {
                delay: delay,
                onStart: () => {
                    target.text = `${startVal.toFixed(2)}${currency}`;
                },
                onUpdate: () => {
                    let currentValue = startVal + ((endVal - startVal) * tween.progress());
                    target.text = `${Math.ceil(currentValue).toFixed(2)}${currency}`;
                },
                onComplete: () => {
                    target.text = `${endVal.toFixed(2)}${currency}`;
                }
            }
        );
    }
}
