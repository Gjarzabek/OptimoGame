import { BaseBoardObject } from "BoardObjects/base-board-object";
import { BOARD_OBJECT } from "BoardObjects/base-board-object.types";
import { Graphics, IPointData } from "pixi.js";
import { KEY_INPUT_TYPE } from "UserInputs/user-inputs.types";

export class Ground extends BaseBoardObject {
    
    private _graphics: Graphics;

    constructor(pos: IPointData, size: IPointData) {
        super();
        this._graphics = new Graphics();
        this._graphics.lineStyle({width: 1, color: 0x3E3E3E, alpha: 1});
        this._graphics.beginFill(0x3E3E3E);
        this._graphics.drawRect(pos.x, pos.y, size.x, size.y);
        this._graphics.endFill();
        this._graphics.visible = true;
    }
    
    get objectType(): BOARD_OBJECT {
        return BOARD_OBJECT.GROUND;
    }
    
    get sprite(): Graphics {
        return this._graphics
    }
    
    onCollide(collided_obj: BaseBoardObject): boolean {
        return true;
    }
    
    update(inputs?: KEY_INPUT_TYPE[]): boolean {
        return true;
    }

}