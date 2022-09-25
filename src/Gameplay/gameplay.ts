import { BaseBoardObject } from "BoardObjects/base-board-object";
import { BOARD_OBJECT } from "BoardObjects/base-board-object.types";
import BaseCharacter from "BoardObjects/Characters/base-character";
import { KnightCharacter } from "BoardObjects/Characters/Knight/knight-character";
import { Food } from "BoardObjects/FallingObject/Food/food";
import { Ground } from "BoardObjects/Obstacles/ground";
import { CollisionCalc } from "Helpers/collision-calc";
import { Application, Graphics, Text } from "pixi.js";
import { UiController } from "UI/UI.controller";
import { UserInputsService } from "UserInputs/user-inputs.service";
import { KEY_INPUT_TYPE } from "UserInputs/user-inputs.types";
import { GameplayHelper } from "../Helpers/gameplay";

export class Gameplay {
   
    private app: Application;
    private boardObjectList: BaseBoardObject[] | null;

    private lifesTextSprite = new Text("Lifes: 10", GameplayHelper.lifesTextStyle);
    private scoreTextSprite = new Text("Score: 0", GameplayHelper.scoreTextStyle);

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

        this.lifesTextSprite.position.copyFrom({x: 20, y: 20})
        this.scoreTextSprite.position.copyFrom({x: 20, y: 50})
        this.scoreTextSprite.visible = true;

        this.app.loader.add(GameplayHelper.assetLoadPaths).load(
           ()=>this.launch()
        )
    }

    get score() {
        return this._score
    }

    set score(val: number) {
        this._score = val;
        this.scoreTextSprite.text = `Score: ${this._score}`
    }

    get lifes() {
        return this._lifes
    }

    set lifes(val: number) {
        this._lifes = val;
        this.lifesTextSprite.text = `Lifes: ${this._lifes}`
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
        this.app.stage.removeChildren()

        GameplayHelper.restartCounters();
        this.lifes = GameplayHelper.START_LIFES_N;
        this.score = GameplayHelper.START_SCORE_N;

        this.app.stage.addChild(this.lifesTextSprite)
        this.app.stage.addChild(this.scoreTextSprite)

        this.addObjectToStage(
            new Ground({x: 0, y: this.stageHeight-5}, {x: this.stageWidth, y: 100})
        );
        this.addObjectToStage(
            new Ground({x: 0, y: this.stageHeight-5}, {x: this.stageWidth, y: 100})
        );
        this.addObjectToStage(
            new KnightCharacter({x: this.stageWidth/2, y: this.stageHeight - 45}, this.app.loader.resources)
        );
        this.addObjectToStage(
            new Food({x: this.stageWidth/2, y: 0}, this.app.loader.resources)
        );

        this.app.start();
    }

    private gameOverStageSetup() {
        this.app.stop();

        for (const obj of this.boardObjectList)
            this.removeObjectFromStage(obj);
        this.boardObjectList = [];

        const gameOverText = new Text('Game Over', GameplayHelper.gameOverTextStyle)
        const restartText = new Text('Click To Restart', GameplayHelper.restartTextStyle)
        
        //@ts-ignore - container don't have interactive attribute in typescript
        restartText.interactive = true; restartText.on('click', () => {this.stageSetup()})        

        gameOverText.anchor.set(0.5)
        gameOverText.position.copyFrom({x: this.stageWidth/2, y: this.stageHeight/2 - 120})

        restartText.anchor.set(0.5)
        restartText.position.copyFrom({x: this.stageWidth/2, y: this.stageHeight/2})
        
        this.app.stage.addChild(gameOverText)
        this.app.stage.addChild(restartText)
    }

    private addObjectToStage(obj: BaseBoardObject) {
        this.boardObjectList.push(obj)
        if (obj.objectType != BOARD_OBJECT.CHARACTER)
            this.app.stage.addChild(obj.sprite);
        else
            this.app.stage.addChild(...(obj as BaseCharacter).sprites.values());
    }

    private removeObjectFromStage(obj: BaseBoardObject) {
        this.app.stage.removeChild(obj.sprite)
        obj.sprite.destroy();
    }

    private spawnFood() {
        if (GameplayHelper.checkFoodSpawn()) {
            this.addObjectToStage(
                new Food({x: Math.random() * this.stageWidth, y: 0}, this.app.loader.resources)
            );
        }
    }

    private gameLoop(delta: number) {
        if (this.lifes <= 0) {
            this.gameOverStageSetup()
        }
    
        this.spawnFood();

        const inputs: KEY_INPUT_TYPE[] = UserInputsService.activatedInputs()

        for (let i = 0; i < this.boardObjectList.length; ++i) {
            if (!this.boardObjectList[i].update(inputs)) {
                this.removeObjectFromStage(this.boardObjectList[i])
                this.boardObjectList[i] = null;
            }
        }

        for (let i = 0; i < this.boardObjectList.length - 1; ++i) {
            const obj_first = this.boardObjectList[i];
            
            if (obj_first === null)  continue;

            for(let j = i + 1; j < this.boardObjectList.length; ++j) {
                const obj_second = this.boardObjectList[j];

                if (obj_second === null) continue;

                if (CollisionCalc.rectRect(obj_first.sprite.getBounds(),obj_second.sprite.getBounds())) {
                    const isGround: boolean = obj_first.objectType === BOARD_OBJECT.GROUND || obj_second.objectType === BOARD_OBJECT.GROUND
                    const isFood: boolean = obj_first.objectType === BOARD_OBJECT.FOOD || obj_second.objectType === BOARD_OBJECT.FOOD
                    const isCharacter: boolean = obj_first.objectType === BOARD_OBJECT.CHARACTER || obj_second.objectType === BOARD_OBJECT.CHARACTER

                    if (isGround && isFood) {
                        this.lifes = this.lifes - 1;
                    }
                    else if (isFood && isCharacter) {
                        this.score = this.score + 1
                    }

                    if (!obj_first.onCollide(obj_second)) {
                        this.removeObjectFromStage(this.boardObjectList[i])
                        this.boardObjectList[i] = null;
                        break;
                    }

                    if (!obj_second.onCollide(obj_first)) {
                        this.removeObjectFromStage(this.boardObjectList[j])
                        this.boardObjectList[j] = null;
                    }
                }
            }
        }

        this.boardObjectList = this.boardObjectList.filter(el => el !== null)
    }

}