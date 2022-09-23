import { Rectangle } from "pixi.js";

export class CollisionCalc {

    public static rectRect(a: Rectangle, b: Rectangle): boolean {
        if (a.x + a.width >= b.x &&
            a.x <= b.x + b.width &&
            a.y + a.height >= b.y &&
            a.y <= b.y + b.height) {
              return true;
        }
        return false;
    };
    
}