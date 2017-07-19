// NOTE object below must be a valid JSON
window.LBB = $.extend(true, window.LBB, {
    "config": {
        "layoutSet": "navbar",
        "navigation": [
            //{
            //    title: "Inicio", // titulo da tela no navigaton
            //    onExecute: "#home", //página direciona
            //    icon: "fa fa-home" // icone d navigaton
            //},
            //{
            //    title: "Quem somos",
            //    onExecute: "#phone_screen",
            //    icon: "fa fa-info"
            //},
            //{
            //    title: "Sobre",
            //    onExecute: "#about_screen",
            //    icon: "info"
            //}

        ],
        commandMapping: {
            "ios-header-toolbar": {
                commands: [
                    {
                        id: "logout",
                        location: "after",
                        icon: "runner"
                    }
                ]
            },
            "android-simple-toolbar": {
                commands: [
                    {
                        id: "logout",
                        location: "after",
                        icon: "runner"
                    }
                ]
            },
            "win8-phone-appbar": {
                defaults: {
                    "showText": false,
                    "showIcon": true
                },
                commands: [
                    {
                        id: "logout",
                        icon: "runner"
                    }
                ]
            },
            "tizen-simple-toolbar": {
                commands: [
                    {
                        id: "logout",
                        location: "after",
                        icon: "runner"
                    }
                ]
            },
            "generic-header-toolbar": {
                commands: [
                    {
                        id: "logout",
                        location: "after",
                        icon: "runner"
                    }
                ]
            }
        }
    }
});