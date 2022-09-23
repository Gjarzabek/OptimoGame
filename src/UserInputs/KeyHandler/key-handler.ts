import { KEY_INPUT_TYPE } from "UserInputs/user-inputs.types";
import { IKeyHandler } from "./key-handler.types";

export class KeyHandler implements IKeyHandler {

    private _key: KEY_INPUT_TYPE;
    private isActive: boolean;
    private isStateChanged: boolean;
    
    constructor(keyValue: KEY_INPUT_TYPE) {
        this.isActive = false;
        this.isStateChanged = false;
        this._key = keyValue;
    }

    public callbackDown() {
        this.isStateChanged = !this.isActive;
        this.isActive = true;
    }

    public callbackUp() {
        this.isStateChanged = this.isActive;
        this.isActive = false;
    }

    get activated() {
        return this.isActive;
    }

    get recentlyChanged() {
        return this.isStateChanged
    }

    get key() {
        return this._key
    }
}