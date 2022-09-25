import { BaseBoardObject } from "BoardObjects/base-board-object";
import { BOARD_OBJECT } from "BoardObjects/base-board-object.types";
import BaseCharacter from "BoardObjects/Characters/base-character";
import { KnightCharacter } from "BoardObjects/Characters/Knight/knight-character";
import { Ground } from "BoardObjects/Obstacles/ground";
import { CollisionCalc } from "Helpers/collision-calc";
import { Application, Graphics } from "pixi.js";
import { UiController } from "UI/UI.controller";
import { UserInputsService } from "UserInputs/user-inputs.service";
import { KEY_INPUT_TYPE } from "UserInputs/user-inputs.types";
import { GameplayHelper } from "./gameplay.helper";

export class Gameplay {
   
    private app: Application;
    private boardObjectList: BaseBoardObject[];
    private _lifes: number = 10;
    private _score: number = 0;

    constructor() {
        this.app = new Application({
            width: UiController.getWidth(),
            height: UiController.getHeight(),
            antialias: true,
            resolution: 1,
            resizeTo: UiController.resizeCanvasTo(),
            autoStart: true
        })
        this.boardObjectList = [];
        this.app.loader.add(GameplayHelper.getAssetLoadPaths()).load(
           ()=>this.launch()
        )
    }

    get score() {
        return this._score
    }

    set score(val: number) {
        this._score = val;
        console.log('score: ', this._score)
    }

    get lifes() {
        return this._lifes
    }

    set lifes(val: number) {
        this._lifes = val;
        console.log('lifes: ', this._lifes)
    }

    get stageWidth() {
        return this.app.screen.width
    }

    get stageHeight() {
        return this.app.screen.height
    }

    public launch() {
        UiController.addElement(this.app.view)
        this.stageSetup();
        this.app.ticker.add((delta: number)=>{this.gameLoop(delta);});
    }

    private stageSetup() {
        this.addObjectToStage(
            new Ground({x: 0, y: this.stageHeight-5}, {x: this.stageWidth, y: 100})
        );
        this.addObjectToStage(
            new KnightCharacter({x: this.stageWidth/2, y: this.stageHeight - 45}, this.app.loader.resources)
        );
    }

    private addObjectToStage(obj: BaseBoardObject) {
        this.boardObjectList.push(obj)
        if (obj.getObjectType() != BOARD_OBJECT.CHARACTER)
            this.app.stage.addChild(obj.getSprite());
        else
            this.app.stage.addChild(...(obj as BaseCharacter).sprites.values());
    }

    private gameLoop(delta: number) {
        const inputs: KEY_INPUT_TYPE[] = UserInputsService.activatedInputs()

        for (const b_obj of this.boardObjectList)
            b_obj.update(inputs);
        
        for (let i = 0; i < this.boardObjectList.length - 1; ++i) {
            for(let j = i + 1; j < this.boardObjectList.length; ++j) {
                const obj_first = this.boardObjectList[i];
                const obj_second = this.boardObjectList[j];

                if (CollisionCalc.rectRect(obj_first.getSprite().getBounds(),obj_second.getSprite().getBounds())) {
                    const isWall: boolean = obj_first.getObjectType() === BOARD_OBJECT.OBSTACLE || obj_second.getObjectType() === BOARD_OBJECT.OBSTACLE
                    const isFood: boolean = obj_first.getObjectType() === BOARD_OBJECT.FOOD || obj_second.getObjectType() === BOARD_OBJECT.FOOD
                    const isCharacter: boolean = obj_first.getObjectType() === BOARD_OBJECT.CHARACTER || obj_second.getObjectType() === BOARD_OBJECT.CHARACTER

                    if (isWall && isFood) {
                        this.lifes = this.lifes - 1;
                    }
                    else if (isFood && isCharacter) {
                        this.score = this.score + 1
                    }
                }
            }
        }
    }

}