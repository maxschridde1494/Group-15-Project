let headlineStyle = new Style({font: 'bold 25px', color: 'white'});
let smallHeadlineStyle = new Style({font: 'bold 15px', color: 'white'});

import { currentScreen, loadEric, MainContainerTemplate, ButtonColumnTemplate, 
            MyButtonTemplate, orangeSkin, yellowSkin, whiteSkin } from "main";

var navBarButton = Container.template($ => ({
    height: 20, width: 20, left: 5, active: true, exclusiveTouch: true,
    skin: $.skin,
    contents: [    ],
    behavior: Behavior ({
        onTouchBegan: function(container, data){
            // container.label.skin = whiteSkin;
        },
        onTouchEnded: function(container, data){
            // container.label.skin = $.skin;
            loadEric();
        }

    }) 
}));

export var dashboardScreen = Container.template($ => ({
    name: "dashboard",
    top: 0, bottom: 0, left: 0, right: 0,
    active: true, skin: orangeSkin,
    contents: [
    	new Column({
    		name: 'main', top: 0, bottom: 0, right: 0, left: 0,
    		contents: [
    			new Column({
    				name: 'navBar',
    				skin: orangeSkin, height: 25, right: 0, left: 0, top: 5,
    				contents:[
                        new navBarButton({skin: yellowSkin})
    				]
    			}),
    			new Column({
    				name: 'dash', skin: yellowSkin,
    				top: 0, bottom: 5, left: 0, right: 0,
    				contents:[
                        new Label({top: 5, height: 20, style: headlineStyle, string: "Dashboard"}),
                        new Label({height: 20, style: smallHeadlineStyle, string: "Home - South Park"}),
                        new Line({
                            name: 'views', skin: yellowSkin,
                            top: 0, left: 0, right: 0, height: 120,
                            contents:[
                                new Container({
                                    name: 'left', left: 27, right: 5,
                                    contents:[]
                                }),
                                new Container({
                                    name: 'right', left: 5, right: 27,
                                    contents:[]
                                })
                            ]
                        }),
                        new Container({
                            name: 'livefeed', top: 5, bottom: 0, left: 0, right: 0, width: 320, height: 160,
                            skin: yellowSkin, 
                            contents:[]
                        }),
                        new Container({})
    				]
    			}),
                new Column({
                    name: 'bottomNav',
                    skin: orangeSkin, height: 25,
                    contents:[
                        new navBarButton({skin: yellowSkin})
                    ]
                })

    		]
    	})
    ]
}));