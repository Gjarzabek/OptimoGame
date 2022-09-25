import { KNIGHT_CONFIG } from "BoardObjects/Characters/Knight/knight.config";
import { PathBuilder } from "Helpers/path-builder";
import { TextStyle } from "pixi.js";

export class GameplayHelper {
    
    public static readonly FOOD_ASSET_N = 62;

    public static readonly START_LIFES_N = 10;
    public static readonly START_SCORE_N = 0;

    public static readonly START_FOOD_SPAWN_RATE = 80;
    public static readonly START_FOOD_SPAWN_COUNTER = 0;
    
    private static foodSpawnRate = this.START_FOOD_SPAWN_RATE
    private static foodSpawnCounter = this.START_FOOD_SPAWN_COUNTER

    public static restartCounters() {
        this.foodSpawnRate = this.START_FOOD_SPAWN_RATE
        this.foodSpawnCounter = this.START_FOOD_SPAWN_COUNTER
    }

    public static checkFoodSpawn(): boolean {
        if (this.foodSpawnCounter > 200) {
            if (this.foodSpawnRate > 0)
                this.foodSpawnRate--;
            this.foodSpawnCounter = GameplayHelper.START_FOOD_SPAWN_COUNTER;
        }

        this.foodSpawnCounter++;       
        return !(this.foodSpawnCounter % this.foodSpawnRate);
    }

    public static get restartTextStyle(): TextStyle {
        return new TextStyle({
            fontFamily: "Arial",
            fontSize: 45,
            fill: "red",
            fontWeight: '900',
            align: "center"
        })
    }

    public static get gameOverTextStyle(): TextStyle {
        return new TextStyle({
            fontFamily: "Arial",
            fontSize: 40,
            fill: "white",
            fontWeight: '500',
            align: "center"
        })
    }

    public static get scoreTextStyle(): TextStyle {
        return new TextStyle({
            fontFamily: "Arial",
            fontSize: 36,
            fill: "white",
        })
    }

    public static get lifesTextStyle(): TextStyle {
        return new TextStyle({
            fontFamily: "Arial",
            fontSize: 20,
            fill: "red",
        })
    }

    public static get assetLoadPaths(): string[] {
        const paths: string[] = [];

        for (const asset_info of KNIGHT_CONFIG.assets) {
            for (let i = 0; i < asset_info.frames_n; ++i)
                paths.push(PathBuilder.character(KNIGHT_CONFIG.name, asset_info.animation_name, i))
        }

        for (let i = 0; i <= this.FOOD_ASSET_N; ++i)
            paths.push(PathBuilder.food(i))

        return paths;
    }

}