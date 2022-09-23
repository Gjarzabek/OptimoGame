import { AnimatedSprite, ObservablePoint } from "pixi.js";
import { KEY_INPUT_TYPE } from "UserInputs/user-inputs.types";
import { CHARACTER_STATE } from "./character.enum";

export interface IBaseCharacter {
    get currentSprite(): AnimatedSprite,
    
    get position(): ObservablePoint,
    set position(point: ObservablePoint),

    set characterState(state: CHARACTER_STATE),

    update(inputs: KEY_INPUT_TYPE[]): void;
    getCharacterConfig(): ICharacterConfig;
    getSprites(): Map<CHARACTER_STATE, AnimatedSprite>
}


export interface ICharacterConfig {
    name: string,
    move_speed: number,
    assets: IAnimationAssetInfo[]
}

export interface IAnimationAssetInfo {
    frames_n: number,
    animation_name: string,
    character_state: CHARACTER_STATE
}