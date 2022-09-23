import {AnimatedSprite, ObservablePoint} from 'pixi.js'
import { KEY_INPUT_TYPE } from 'UserInputs/user-inputs.types';
import { CHARACTER_STATE, MOVE_DIRECTION_X } from './character.enum';
import { IBaseCharacter, ICharacterConfig } from './character.types';

export default abstract class BaseCharacter implements IBaseCharacter {
    
    private currentState: CHARACTER_STATE;
    private moveDirection: MOVE_DIRECTION_X;

    constructor(spawn_position: ObservablePoint) {
        this.currentState = CHARACTER_STATE.STANDING
        this.moveDirection = MOVE_DIRECTION_X.IN_PLACE
        this.position = spawn_position
    }

    get currentSprite(): AnimatedSprite {
        return this.getSprites().get(this.currentState);
    }

    get position(): ObservablePoint {
        return this.currentSprite.position
    }

    set position(point: ObservablePoint) {
        this.currentSprite.position.copyFrom(point)
    }

    set characterState(state: CHARACTER_STATE) {
        const old_position: ObservablePoint = this.position;
        this.currentState = state;
        this.position = old_position
    }

    public abstract update(inputs: KEY_INPUT_TYPE[]): void;
    public abstract getCharacterConfig(): ICharacterConfig;
    public abstract getSprites(): Map<CHARACTER_STATE, AnimatedSprite>
}
