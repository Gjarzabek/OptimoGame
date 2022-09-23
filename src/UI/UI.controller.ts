import { UserInputsService } from "../UserInputs/user-inputs.service";

export class UiController {
    public static addEventListeaners() {
        window.addEventListener("keydown", UserInputsService.onKeyDownCallback, false);
        window.addEventListener("keyup", UserInputsService.onKeyUpCallback, false);
    }

    public static detachEventListeaners() {
        window.removeEventListener("keydown", UserInputsService.onKeyDownCallback);
        window.removeEventListener("keyup", UserInputsService.onKeyUpCallback);
    }
}