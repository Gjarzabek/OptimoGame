import { KnightCharacter } from "BoardObjects/Characters/Knight/knight-character";
import { KNIGHT_CONFIG } from "BoardObjects/Characters/Knight/knight.config";
import { PathBuilder } from "Helpers/path-builder";

export class PixiEngineService {
    
    private static readonly FOOD_ASSET_N = 62;
    
    public static getAssetLoadPaths(): string[] {
        const paths: string[] = [];
        
        for (const asset_info of KNIGHT_CONFIG.assets) {
            for (let i = 0; i < asset_info.frames_n; ++i)
                paths.push(PathBuilder.character(KNIGHT_CONFIG.name, asset_info.animation_name, i))
        }

        for (let i = 0; i <= this.FOOD_ASSET_N; ++i)
            paths.push(PathBuilder.food(i))

        return paths;
    }

    public static gameLoop() {

    }

    public startGame() {

    }

    public restartGame() {
        
    }

}