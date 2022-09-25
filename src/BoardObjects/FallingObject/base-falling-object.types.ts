export interface IBaseFallingObject {
    get fallingObjectConfig(): IFallingObjectConfig,
}

export interface IFallingObjectConfig {
    fall_velocity_y: number,
    scale: number
}