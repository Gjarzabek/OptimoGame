import { CHARACTER_NAME, CHARACTER_STATE } from "../character.enum";
import { ICharacterConfig } from "../character.types";

export const KNIGHT_CONFIG: ICharacterConfig = {
    name: CHARACTER_NAME.KNIGHT,
    move_speed: 1,
    assets: [
        {
            character_state: CHARACTER_STATE.STANDING,
            animation_name: 'idle',
            animation_speed: 0.1,
            frames_n: 4,
        },
        {
            character_state: CHARACTER_STATE.RUN_LEFT,
            animation_name: 'left',
            animation_speed: 0.15,
            frames_n: 6,
        },
        {
            character_state: CHARACTER_STATE.RUN_RIGHT,
            animation_name: 'right',
            animation_speed: 0.15,
            frames_n: 6,
        }
    ],
}