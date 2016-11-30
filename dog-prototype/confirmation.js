import Pins from "pins";

let confirmationTexture = new Texture("assets/confirmation.png");

let confirmationSkin = new Skin({
      width: 340, height: 570,
      texture: confirmationTexture,
});
let textStyle = new Style({ font: "bold 50px", color: "white" });
export let ConfirmationContainer = Container.template($ => ({
    top: 0, bottom: 0, left: 0, right: 0,
    active: true, skin: confirmationSkin, state: 0,
    contents: [
    ],
    Behavior: class extends Behavior {
        onTouchBegan(container) {
            application.distribute("onToggleLight", 1);
        }
    }
}));