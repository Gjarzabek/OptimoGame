import { BaseBoardObject } from "BoardObjects/base-board-object";
import { BOARD_OBJECT } from "BoardObjects/base-board-object.types";
import { GameplayHelper } from "Helpers/gameplay";
import { PathBuilder } from "Helpers/path-builder";
import { IPointData, LoaderResource, Sprite } from "pixi.js";
import { KEY_INPUT_TYPE } from "UserInputs/user-inputs.types";
import { BaseFallingObject } from "../base-falling-object";
import { FOOD_CONFIG } from "./food.config";

export class Food extends BaseFallingObject {

    private _sprite: Sprite;

    constructor(spawn_pos: IPointData, resources: {[key: string]: LoaderResource;}) {
        super(spawn_pos);
        const key = PathBuilder.food(Math.round(Math.random() * GameplayHelper.FOOD_ASSET_N))
        this._sprite = new Sprite(resources[key].texture)
        this._sprite.position.copyFrom(spawn_pos)
        this._sprite.anchor.set(0.5);
        this._sprite.scale.set(FOOD_CONFIG.scale)
    }

    get sprite(): Sprite {
        return this._sprite
    }

    get objectType(): BOARD_OBJECT {
        return BOARD_OBJECT.FOOD;
    }

    get fallingObjectConfig() {
        return FOOD_CONFIG;
    }

    public onCollide(collided_obj: BaseBoardObject): boolean {
        const collided_obj_type = collided_obj.objectType;
        if (collided_obj_type === BOARD_OBJECT.CHARACTER || collided_obj_type === BOARD_OBJECT.GROUND)
            return false;
        return true;
    }

}