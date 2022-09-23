import BaseCharacter from "Characters/base-character";
import { CHARACTER_NAME, CHARACTER_STATE } from "Characters/character.enum";
import { ICharacterConfig } from "Characters/character.types";
import { AnimatedSprite, ObservablePoint } from "pixi.js";
import { KEY_INPUT_TYPE } from "UserInputs/user-inputs.types";

export class VikingCharacter extends BaseCharacter {
    constructor(spawn_pos: ObservablePoint) {
        super(spawn_pos);
    }
    
    public getCharacterConfig(): ICharacterConfig {
        return {
            name: CHARACTER_NAME.VIKING,
            assets: [
                {
                    character_state: CHARACTER_STATE.STANDING,
                    animation_name: 'idle',
                    frames_n: 4,
                },
                {
                    character_state: CHARACTER_STATE.RUN_LEFT,
                    animation_name: 'left',
                    frames_n: 6,
                },
                {
                    character_state: CHARACTER_STATE.RUN_RIGHT,
                    frames_n: 6,
                    animation_name: 'right',
                }
            ],
            move_speed: 1,
        }
    }
    public getSprites(): Map<CHARACTER_STATE, AnimatedSprite> {
        return new Map()
    }
    
    public update(inputs: KEY_INPUT_TYPE[]): void {
        console.log('update-inputs:', inputs)
    }

}