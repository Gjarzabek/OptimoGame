import { BaseBoardObject } from 'BoardObjects/base-board-object';
import { BOARD_OBJECT } from 'BoardObjects/base-board-object.types';
import {AnimatedSprite, IPointData, Point} from 'pixi.js'
import { UiController } from 'UI/UI.controller';
import { KEY_INPUT_TYPE } from 'UserInputs/user-inputs.types';
import { CHARACTER_STATE, MOVE_DIRECTION_X } from './character.enum';
import { IBaseCharacter, ICharacterConfig } from './character.types';

export default abstract class BaseCharacter extends BaseBoardObject implements IBaseCharacter {
    
    private currentState: CHARACTER_STATE;
    private moveDirection: MOVE_DIRECTION_X;
    
    abstract get sprites(): Map<CHARACTER_STATE, AnimatedSprite>
    abstract get characterConfig(): ICharacterConfig;

    constructor(spawn_pos: IPointData) {
        super();
        this.currentState = CHARACTER_STATE.STANDING;
        this.moveDirection = MOVE_DIRECTION_X.IN_PLACE;
    }

    get sprite(): AnimatedSprite {
        return this.sprites.get(this.currentState);
    }
    
    get objectType(): BOARD_OBJECT {
        return BOARD_OBJECT.CHARACTER
    }

    get characterState() {
        return this.currentState;
    }

    set characterState(state: CHARACTER_STATE) {
        const old_position: Point = this.position;
        this.currentState = state;
        this.position = old_position
        switch (state) {
            case CHARACTER_STATE.RUN_LEFT:
                this.moveDirection = MOVE_DIRECTION_X.LEFT
                break;
            case CHARACTER_STATE.RUN_RIGHT:
                this.moveDirection = MOVE_DIRECTION_X.RIGHT
                break;
            case CHARACTER_STATE.STANDING:
                this.moveDirection = MOVE_DIRECTION_X.IN_PLACE
                break;
        }
        this.updateSprites();
    }

    private updateSprites() {
        this.sprites.forEach((sprite, state) => {
            if (this.currentState === state) {
                sprite.play()
                sprite.visible = true;
            }
            else {
                sprite.visible = false
                sprite.stop()
            }
        })
    }

    public onCollide(collided_obj: BaseBoardObject): boolean {
        return true;
    }

    public update(inputs: KEY_INPUT_TYPE[]): boolean {
        if (this.position.x < 0 || this.position.x > UiController.getWidth())
            this.position.x = UiController.getWidth()/2

        const isArrowLeft = inputs.find(el => el === KEY_INPUT_TYPE.ARROW_LEFT) != undefined;
        const isArrowRight = inputs.find(el => el === KEY_INPUT_TYPE.ARROW_RIGHT) != undefined;

        if (isArrowLeft) {
            this.characterState = CHARACTER_STATE.RUN_LEFT
        }
        else if (isArrowRight) {
            this.characterState = CHARACTER_STATE.RUN_RIGHT
        }
        else {
            this.characterState = CHARACTER_STATE.STANDING
        }
        const new_pos = {
            x: this.position.x + (this.moveDirection * this.characterConfig.move_speed),
            y: this.position.y
        }

        if (new_pos.x <= UiController.getWidth() && new_pos.x >= 0)
            this.position = new_pos

        return true;
    }

}
