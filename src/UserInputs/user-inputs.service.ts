import { KeyHandler } from "./KeyHandler/key-handler";
import { KEY_INPUT_TYPE } from "./user-inputs.types";

export class UserInputsService {
        
    private static registeredInputs: KeyHandler[] = [
        new KeyHandler(KEY_INPUT_TYPE.ARROW_LEFT),
        new KeyHandler(KEY_INPUT_TYPE.ARROW_RIGHT)
    ]

    public static getKeyHandlerByType(key_type: KEY_INPUT_TYPE): KeyHandler {
        return this.registeredInputs.find(el => el.key === key_type)
    }

    public static activatedInputs(): KeyHandler[] {
        return this.registeredInputs.filter(el => el.activated)
    }

    public static recentlyChangedInputs(): KeyHandler[] {
        return this.registeredInputs.filter(el => el.recentlyChanged)
    }

    public static update(): void {
        for (const handler of UserInputsService.registeredInputs)
            handler.update();
    }

    public onUpEvent(ev: KeyboardEvent): void {
        const keyHandler = UserInputsService.getKeyHandlerByType(ev.key as KEY_INPUT_TYPE);
        keyHandler.callbackUp();
    }

    public onDownEvent(ev: KeyboardEvent): void {
        const keyHandler = UserInputsService.getKeyHandlerByType(ev.key as KEY_INPUT_TYPE);
        keyHandler.callbackDown();       
    }
}