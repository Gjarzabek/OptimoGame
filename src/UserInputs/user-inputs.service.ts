import { KeyHandler } from "./KeyHandler/key-handler";
import { KEY_INPUT_TYPE } from "./user-inputs.types";

export class UserInputsService {
        
    private static registeredInputs: KeyHandler[] = [
        new KeyHandler(KEY_INPUT_TYPE.ARROW_LEFT),
        new KeyHandler(KEY_INPUT_TYPE.ARROW_RIGHT)
    ]

    public static getKeyHandlerByType(key_type: KEY_INPUT_TYPE): KeyHandler | undefined {
        return this.registeredInputs.find(el => el.key === key_type)
    }

    public static activatedInputs(): KEY_INPUT_TYPE[] {
        return this.registeredInputs.filter(el => el.activated).map(el => el.key);
    }

    public static recentlyChangedInputs(): KEY_INPUT_TYPE[] {
        return this.registeredInputs.filter(el => el.recentlyChanged).map(el => el.key);
    }

    public static onKeyUpCallback(ev: KeyboardEvent): void {
        const keyHandler = UserInputsService.getKeyHandlerByType(ev.key as KEY_INPUT_TYPE);
        if (keyHandler !== undefined)
            keyHandler.callbackUp();
    }

    public static onKeyDownCallback(ev: KeyboardEvent): void {
        const keyHandler = UserInputsService.getKeyHandlerByType(ev.key as KEY_INPUT_TYPE);
        if (keyHandler !== undefined)
            keyHandler.callbackDown();
    }
}