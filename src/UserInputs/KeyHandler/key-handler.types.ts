import { KEY_INPUT_TYPE } from "UserInputs/user-inputs.types";

export interface IKeyHandler {
    get key(): KEY_INPUT_TYPE
    get activated(): boolean,
    get recentlyChanged(): boolean

    callbackDown(): void,
    callbackUp(): void,
}