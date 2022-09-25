import { Graphics, IPointData, Point, Sprite } from "pixi.js";
import { KEY_INPUT_TYPE } from "UserInputs/user-inputs.types";
import { BOARD_OBJECT } from "./base-board-object.types";

export abstract class BaseBoardObject {
    abstract get objectType(): BOARD_OBJECT;
    abstract get sprite(): Sprite | Graphics;
    
    abstract onCollide(collided_obj: BaseBoardObject): boolean;
    abstract update(inputs?: KEY_INPUT_TYPE[]): boolean

    get position(): Point {
        return this.sprite.position
    }

    set position(point: IPointData) {
        this.sprite.position.copyFrom(point)
    }

}
