export enum CHARACTER_STATE {
    STANDING,
    RUN_LEFT,
    RUN_RIGHT
}

export interface ICharacterConfig {
    name: string,
    move_speed: number, // number between 0 and 1
}