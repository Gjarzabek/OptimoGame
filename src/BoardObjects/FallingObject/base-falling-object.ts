import { BaseBoardObject } from "BoardObjects/base-board-object";
import { IPointData } from "pixi.js";
import { KEY_INPUT_TYPE } from "UserInputs/user-inputs.types";
import { IBaseFallingObject, IFallingObjectConfig } from "./base-falling-object.types";

export abstract class BaseFallingObject extends BaseBoardObject implements IBaseFallingObject {

    constructor(spawn_pos: IPointData) {
        super();
    }

    public abstract get fallingObjectConfig(): IFallingObjectConfig;

    public update(inputs?: KEY_INPUT_TYPE[]): boolean {
        this.position = {
            x: this.position.x,
            y: this.position.y + this.fallingObjectConfig.fall_velocity_y
        }
        return true;
    }

}