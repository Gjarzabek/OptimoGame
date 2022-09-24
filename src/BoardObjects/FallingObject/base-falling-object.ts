import { BaseBoardObject } from "BoardObjects/base-board-object";
import { ObservablePoint, Sprite } from "pixi.js";
import { IBaseFallingObject } from "./base-falling-object.types";

export abstract class BaseFallingObject extends BaseBoardObject implements IBaseFallingObject {

    constructor(spawn_pos: ObservablePoint) {
        super();
    }

}