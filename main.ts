import { Gameplay } from "Gameplay/gameplay";
import { UiController } from "UI/UI.controller";

function main(): void {
    UiController.addEventListeaners();
    const game = new Gameplay();
    // UiController.detachEventListeaners();
}

main();
