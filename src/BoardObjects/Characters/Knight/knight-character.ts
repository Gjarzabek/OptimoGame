import { BaseBoardObject } from "BoardObjects/base-board-object";
import { PathBuilder } from "Helpers/path-builder";
import { AnimatedSprite, ObservablePoint, Texture } from "pixi.js";
import { PixiEngine } from "PixiEngine/pixi-engine";
import { KEY_INPUT_TYPE } from "UserInputs/user-inputs.types";
import BaseCharacter from "../base-character";
import { CHARACTER_NAME, CHARACTER_STATE } from "../character.enum";
import { ICharacterConfig } from "../character.types";
import { KNIGHT_CONFIG } from "./knight.config";

export class KnightCharacter extends BaseCharacter {

    private _spritesMap: Map<CHARACTER_STATE, AnimatedSprite>;

    constructor(spawn_pos: ObservablePoint) {
        super(spawn_pos);

        this._spritesMap = new Map<CHARACTER_STATE, AnimatedSprite>()

        const resources = PixiEngine.getResources();
        for (let asset_info of KNIGHT_CONFIG.assets) {
            let textures: Texture[] = [];

            for (let i = 0; i < asset_info.frames_n; ++i) {
                const key = PathBuilder.character(KNIGHT_CONFIG.name, asset_info.animation_name, i)
                textures.push(resources[key].texture);
            }

            const animatedSpr = new AnimatedSprite(textures);
        
            animatedSpr.anchor.set(0.5);
            animatedSpr.animationSpeed = asset_info.animation_speed;
            animatedSpr.position.copyFrom(spawn_pos)
            animatedSpr.visible = this.characterState === asset_info.character_state;
            
            this._spritesMap.set(asset_info.character_state, animatedSpr);
        }
    }

    get characterConfig(): ICharacterConfig {
        return KNIGHT_CONFIG;
    }

    get sprites(): Map<CHARACTER_STATE, AnimatedSprite> {
        return this._spritesMap;
    }
    
    public update(inputs: KEY_INPUT_TYPE[]): void {
        console.log('update-inputs:', inputs)
    }

    public onCollide(collided_obj: BaseBoardObject): void {
        console.log('Knight collided with:', collided_obj.getObjectType())
    }

}