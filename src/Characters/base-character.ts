import {AnimatedSprite, ObservablePoint} from 'pixi.js'
import { CHARACTER_STATE } from './character.types';
import { KEY_INPUT_TYPE} from 'UserInputs/user-inputs.types'

export default abstract class BaseCharacter {
    
    private currentState: CHARACTER_STATE;
    private sprites: Map<CHARACTER_STATE, AnimatedSprite> = new Map<CHARACTER_STATE, AnimatedSprite>();

    constructor() {
        this.currentState = CHARACTER_STATE.STANDING
    }

    get currentSprite(): AnimatedSprite {
        return this.sprites.get(this.currentState);
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

    public abstract getCharacterName(): string;
    public abstract update(inputs: KEY_INPUT_TYPE[]): void;
}
