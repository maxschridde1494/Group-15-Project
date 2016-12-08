import { currentScreen, loadErikConfirmationPage, orangeSkin, yellowSkin, 
    whiteSkin, loadGabe, selectedDogs } from "main";

export var ScheduledWalksContainer = Column.template($ => ({
    name: "scheduledWalksContainer", left: 0, right: 0, top: 0, bottom: 0, skin: yellowSkin,
    contents: [
        new Column({
            name: "col", left: 20, right: 20, top: 40, bottom: 20, height: 300, skin: whiteSkin,
            contents: [
                
            ]
        })
    ]
}));