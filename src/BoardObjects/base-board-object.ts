import { Sprite } from "pixi.js";
import { KEY_INPUT_TYPE } from "UserInputs/user-inputs.types";
import { BOARD_OBJECT } from "./base-board-object.types";

export abstract class BaseBoardObject {
    abstract getObjectType(): BOARD_OBJECT;
    abstract getSprite(): Sprite;
    abstract onCollide(collided_obj: BaseBoardObject): void;
    abstract update(inputs?: KEY_INPUT_TYPE[]): void
}
