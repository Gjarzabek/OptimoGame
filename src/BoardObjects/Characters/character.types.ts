import { AnimatedSprite, ObservablePoint } from "pixi.js";
import { KEY_INPUT_TYPE } from "UserInputs/user-inputs.types";
import { CHARACTER_STATE } from "./character.enum";

export interface IBaseCharacter {
    get position(): ObservablePoint,
    set position(point: ObservablePoint),

    get sprites(): Map<CHARACTER_STATE, AnimatedSprite>
    get characterConfig(): ICharacterConfig;
    
    set characterState(state: CHARACTER_STATE),
    
    update(inputs: KEY_INPUT_TYPE[]): void;
}


export interface ICharacterConfig {
    name: string,
    move_speed: number,
    assets: IAnimationAssetInfo[],
}

export interface IAnimationAssetInfo {
    frames_n: number,
    animation_name: string,
    animation_speed: number
    character_state: CHARACTER_STATE
}