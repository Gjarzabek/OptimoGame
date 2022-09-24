import { BaseBoardObject } from 'BoardObjects/base-board-object';
import { BOARD_OBJECT } from 'BoardObjects/base-board-object.types';
import {AnimatedSprite, ObservablePoint} from 'pixi.js'
import { KEY_INPUT_TYPE } from 'UserInputs/user-inputs.types';
import { CHARACTER_STATE, MOVE_DIRECTION_X } from './character.enum';
import { IBaseCharacter, ICharacterConfig } from './character.types';

export default abstract class BaseCharacter extends BaseBoardObject implements IBaseCharacter {
    
    private currentState: CHARACTER_STATE;
    private moveDirection: MOVE_DIRECTION_X;
    
    abstract get sprites(): Map<CHARACTER_STATE, AnimatedSprite>
    abstract get characterConfig(): ICharacterConfig;

    public abstract update(inputs: KEY_INPUT_TYPE[]): void;

    constructor(spawn_position: ObservablePoint) {
        super();
        this.currentState = CHARACTER_STATE.STANDING;
        this.moveDirection = MOVE_DIRECTION_X.IN_PLACE;
    }

    public getSprite(): AnimatedSprite {
        return this.sprites.get(this.currentState);
    }
    
    public getObjectType(): BOARD_OBJECT {
        return BOARD_OBJECT.CHARACTER
    }

    get position(): ObservablePoint {
        return this.getSprite().position
    }

    set position(point: ObservablePoint) {
        this.getSprite().position.copyFrom(point)
    }

    get characterState() {
        return this.currentState;
    }

    set characterState(state: CHARACTER_STATE) {
        const old_position: ObservablePoint = this.position;
        this.currentState = state;
        this.position = old_position
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

}
