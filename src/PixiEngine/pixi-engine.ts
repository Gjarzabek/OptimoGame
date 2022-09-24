import { Application, Loader } from "pixi.js";
import { UiController } from "UI/UI.controller";
import { PixiEngineService } from "./pixi-engine.service";

export class PixiEngine {

    public static readonly app = new Application({
        width: UiController.getWidth(),
        height: UiController.getHeight(),
        antialias: true,
        resolution: 1,
        resizeTo: UiController.resizeCanvasTo()
    })

    public static getResources() {
        return this.app.loader.resources;
    }

    public static launch() {
        // PixiEngineController.app.loader
        // .add(PixiEngineService.getAssetLoadPaths())
        // .load(
            // 1. Add sprites to stage
            // 2. 
        // )
    }
}